import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chat Assistant",
  description: "AI Chat Assistant Interface",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="header-bar">
            <div className="header-title">AI Chat Assistant</div>
            <div className="auth-buttons">
              <SignedOut>
                <SignInButton mode = 'modal' className="sign-in-button" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="main-content">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
