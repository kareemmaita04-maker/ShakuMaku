import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Toast } from '@/components/ui/Toast';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shaku Maku — Fresh Local Hummus, Dips & Lebneh in Arizona',
  description:
    'Order fresh small-batch hummus, dips & lebneh for farmers market pickup or Phoenix-area delivery. Made fresh weekly for every preorder.',
  keywords: ['hummus', 'lebneh', 'dips', 'Arizona', 'Phoenix', 'fresh', 'local', 'farmers market'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-cream text-ink font-sans overflow-x-hidden">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
