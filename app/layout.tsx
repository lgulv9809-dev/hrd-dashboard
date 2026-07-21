import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import { ProjectProvider } from "@/context/ProjectContext";
import { ClientProvider } from "@/context/ClientContext";
import { EducationProvider } from "@/context/EducationContext";
import { TodoProvider } from "@/context/TodoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AAAA_TEST_12345",
  description: "TEST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">

  <ProjectProvider>

    <ClientProvider>

      <EducationProvider>

        <TodoProvider>

          <div className="flex min-h-screen">

            <Sidebar />

            <div className="flex-1">

              <Header />

              {children}

            </div>

          </div>

        </TodoProvider>

      </EducationProvider>

    </ClientProvider>

  </ProjectProvider>

</body>
    </html>
  );
}
