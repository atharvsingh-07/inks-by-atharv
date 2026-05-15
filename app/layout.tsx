import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";

export const metadata = {
  title: "TaxWise — AI Tax Advisor for Indian Startups",
  description: "Instant GST, income tax and TDS guidance for Indian startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
