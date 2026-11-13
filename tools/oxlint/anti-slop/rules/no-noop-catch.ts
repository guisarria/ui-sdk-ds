import { defineRule, type ESTree, type Scope, type SourceCode } from "@oxlint/plugins";

type Argument = ESTree.CallExpression["arguments"][number];

function isUndefinedValue(expression: ESTree.Expression): boolean {
  if (expression.type === "Identifier") return expression.name === "undefined";
  if (expression.type === "UnaryExpression") return expression.operator === "void";
  return expression.type === "Literal" && expression.value === null;
}

function isNoopBlock(body: ESTree.FunctionBody): boolean {
  if (body.body.length === 0) return true;
  if (body.body.length !== 1) return false;
  const [statement] = body.body;
  if (statement?.type !== "ReturnStatement") return false;
  return statement.argument === null || isUndefinedValue(statement.argument);
}

function isNoopFunction(node: Argument | ESTree.Node): boolean {
  if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
    return node.body !== null && isNoopBlock(node.body);
  }
  if (node.type !== "ArrowFunctionExpression") return false;
  return node.body.type === "BlockStatement"
    ? isNoopBlock(node.body)
    : isUndefinedValue(node.body);
}

/** Follows a local binding, so `const ignore = () => {}` reads like the literal handler. */
function bindsNoopFunction(sourceCode: SourceCode, identifier: ESTree.IdentifierReference): boolean {
  let scope: Scope | null = sourceCode.getScope(identifier);
  while (scope !== null) {
    const variable = scope.set.get(identifier.name);
    if (variable !== undefined) {
      return variable.defs.some((definition) => {
        const node = definition.node;
        if (node.type === "VariableDeclarator") return node.init !== null && isNoopFunction(node.init);
        return isNoopFunction(node);
      });
    }
    scope = scope.upper;
  }
  return false;
}

/** Reports whether a rejection handler discards the error without doing anything. */
function isNoopHandler(sourceCode: SourceCode, argument: Argument | undefined): boolean {
  if (argument === undefined) return false;
  if (argument.type === "Identifier") {
    return argument.name === "noop" || bindsNoopFunction(sourceCode, argument);
  }
  return isNoopFunction(argument);
}

function calledMethod(callee: ESTree.CallExpression["callee"]): string | null {
  if (callee.type !== "MemberExpression" || callee.computed) return null;
  return callee.property.type === "Identifier" ? callee.property.name : null;
}

/** Ban rejection handlers that discard the error, which leave a failure without a visible owner. */
export const noNoopCatchRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow `.catch(noop)`, empty `.catch(() => {})`, and empty `.then(_, onRejected)` handlers.",
    },
    messages: {
      noopCatch:
        "This handler discards the error, so nobody will ever see it. Let the error reach the code that shows it: " +
        "record it in state, or use `mutation.mutate`, whose `error` the screen renders. If a later real load " +
        "shows the failure again, as with a prefetch or preload, use `warmUp` from `@/lib/owned-failures`. " +
        "To wait for a promise to settle, use `Promise.allSettled`.",
    },
  },
  createOnce(context) {
    return {
      CallExpression(node) {
        const method = calledMethod(node.callee);
        const handler =
          method === "catch" ? node.arguments[0] : method === "then" ? node.arguments[1] : undefined;
        if (isNoopHandler(context.sourceCode, handler)) {
          context.report({ node, messageId: "noopCatch" });
        }
      },
    };
  },
});
