import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground mt-12 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} خرید گروهی. تمام حقوق محفوظ است.</p>
        <nav className="mt-4 space-x-4 rtl:space-x-reverse">
          <Link href="/about" className="hover:text-primary">درباره ما</Link>
          <Link href="/contact" className="hover:text-primary">تماس با ما</Link>
          <Link href="/terms" className="hover:text-primary">شرایط استفاده</Link>
          <Link href="/privacy" className="hover:text-primary">حریم خصوصی</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
