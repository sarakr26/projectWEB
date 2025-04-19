import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

import "./globals.css"

export const metadata: Metadata = {
  title: "ToolNest - Rent DIY Tools From Your Neighbors",
  description:
    "ToolNest connects DIY enthusiasts with local tool owners. Rent the tools you need for your projects at a fraction of the cost.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
