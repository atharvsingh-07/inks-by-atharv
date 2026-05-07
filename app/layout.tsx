import "./globals.css";

export const metadata = {
  title: "Inks by Atharv",
  description: "Digital universe of stories and articles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}