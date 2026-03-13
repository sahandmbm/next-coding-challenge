import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
