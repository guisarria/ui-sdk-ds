import { Geist, Geist_Mono } from "next/font/google"

import "@ui-sdk-ds/ui/globals.css"
import { Toaster } from "@ui-sdk-ds/ui/components/toast"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@ui-sdk-ds/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Toaster>{children}</Toaster>
        </ThemeProvider>
      </body>
    </html>
  )
}
