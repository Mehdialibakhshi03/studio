
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import RandomActivityToast from '@/components/random-activity-toast'; // Import the new component

export const metadata: Metadata = {
  title: 'KharidGroupi - خرید گروهی',
  description: 'خرید گروهی کالا با قیمت کمتر در ایران',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased overflow-x-hidden"> {/* Added overflow-x-hidden */}
        {children}
        <Toaster />
        <RandomActivityToast /> {/* Add the RandomActivityToast component here */}
      </body>
    </html>
  );
}
