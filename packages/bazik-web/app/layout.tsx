import "./globals.scss";
import { Assistant } from "next/font/google";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata = {
  title: "Bazik",
  description: "Create 3D ads, posts, and banners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={assistant.className}>{children}</body>
    </html>
  );
}
