import { defineRule } from "@oxlint/plugins";

import type { ESTree, Scope, SourceCode, Variable } from "@oxlint/plugins";

const moduleMockMethods = new Set(["doMock", "mock", "unstable_mockModule"]);
const testFrameworkSources = new Map([
  ["vitest", "vi"],
  ["vite-plus/test", "vi"],
  ["@jest/globals", "jest"],
]);

function resolveVariable(
  sourceCode: SourceCode,
  identifier: ESTree.IdentifierReference,
): Variable | null {
  let scope: Scope | null = sourceCode.getScope(identifier);
  while (scope !== null) {
    const variable = scope.set.get(identifier.name);
    if (variable !== undefined) return variable;
    scope = scope.upper;
  }
  return null;
}

function importedName(node: ESTree.Node): string | null {
  if (node.type !== "ImportSpecifier") return null;
  return node.imported.type === "Identifier" ? node.imported.name : node.imported.value;
}

function isTestFrameworkObject(
  sourceCode: SourceCode,
  expression: ESTree.Expression,
): expression is ESTree.IdentifierReference {
  if (expression.type !== "Identifier") return false;
  if (
    (expression.name === "vi" || expression.name === "jest") &&
    sourceCode.isGlobalReference(expression)
  ) {
    return true;
  }

  const variable = resolveVariable(sourceCode, expression);
  if (variable === null || variable.defs.length === 0) {
    return expression.name === "vi" || expression.name === "jest";
  }
  return variable.defs.some((definition) => {
    if (definition.type !== "ImportBinding") return false;
    const declaration = definition.parent ?? definition.node.parent;
    if (declaration?.type !== "ImportDeclaration") return false;
    const expected = testFrameworkSources.get(declaration.source.value);
    return expected !== undefined && importedName(definition.node) === expected;
  });
}

function moduleMockCall(sourceCode: SourceCode, callee: ESTree.Expression): boolean {
  if (!("property" in callee) || !("object" in callee) || !("computed" in callee)) return false;
  if (!isTestFrameworkObject(sourceCode, callee.object)) return false;
  const property = callee.property;
  const method = callee.computed
    ? property.type === "Literal" && typeof property.value === "string"
      ? property.value
      : null
    : property.type === "Identifier"
      ? property.name
      : null;
  return method !== null && moduleMockMethods.has(method);
}

function mockedSpecifier(argument: ESTree.Node | undefined): string | null {
  if (argument === undefined) return null;
  if (argument.type === "Literal" && typeof argument.value === "string") return argument.value;
  if (
    argument.type === "ImportExpression" &&
    argument.source.type === "Literal" &&
    typeof argument.source.value === "string"
  ) {
    return argument.source.value;
  }
  return null;
}

function stringList(option: unknown, key: string, fallback: ReadonlyArray<string>) {
  if (typeof option !== "object" || option === null || !(key in option)) return fallback;
  const value: unknown = Object.getOwnPropertyDescriptor(option, key)?.value;
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : fallback;
}

/**
 * Ban module mocks inside a package: a test may replace a dependency only where
 * it crosses a package boundary, never a sibling module of the code under test.
 */
export const noModuleMockingRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow Vitest and Jest mocks of internal modules; tests replace only package boundaries.",
    },
    messages: {
      moduleMock:
        "Do not mock internal module `{{specifier}}`. Exercise it through its real collaborators, or replace a dependency only where it crosses a package boundary.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allow: { type: "array", items: { type: "string" } },
          internalPrefixes: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allow: [], internalPrefixes: ["."] }],
  },
  createOnce(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "Super" || node.callee.type === "V8IntrinsicExpression") return;
        if (!moduleMockCall(context.sourceCode, node.callee)) return;
        const option: unknown = context.options?.[0];
        const allow = stringList(option, "allow", []);
        const internalPrefixes = stringList(option, "internalPrefixes", ["."]);
        const specifier = mockedSpecifier(node.arguments[0]);
        if (specifier !== null) {
          if (allow.includes(specifier)) return;
          if (!internalPrefixes.some((prefix) => specifier.startsWith(prefix))) return;
        }
        context.report({
          node,
          messageId: "moduleMock",
          data: { specifier: specifier ?? "(dynamic)" },
        });
      },
    };
  },
});
