import Link from 'next/link';
import { ShoppingBasket } from 'lucide-react'; // Assuming you use lucide-react

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 border-t border-border/20"> {/* Use appropriate theme colors instead, e.g., bg-primary text-primary-foreground */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-2xl font-bold text-primary">
               <ShoppingBasket className="h-8 w-8 text-primary" />
               <span>خرید<span className="text-accent">گروهی</span></span> {/* Use accent color */}
            </Link>
            <p className="text-sm text-muted-foreground"> {/* Use muted-foreground */}
              اولین و بزرگترین پلتفرم خرید گروهی در ایران، با هدف ارائه بهترین تخفیف‌ها برای شما.
            </p>
             {/* Social Media Icons */}
             <div className="flex space-x-4 rtl:space-x-reverse mt-4">
               {/* Replace # with actual links */}
               <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
               </a>
               <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
               </a>
               <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
               </a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">دسترسی سریع</h4> {/* Use foreground */}
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">صفحه اصلی</Link></li>
              <li><Link href="/active-deals" className="text-sm text-muted-foreground hover:text-primary transition-colors">خریدهای فعال</Link></li>
              <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">دسته‌بندی‌ها</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">درباره ما</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">وبلاگ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">خدمات مشتریان</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">سوالات متداول</Link></li>
              <li><Link href="/how-to-buy" className="text-sm text-muted-foreground hover:text-primary transition-colors">راهنمای خرید</Link></li>
              <li><Link href="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">شرایط بازگشت</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">تماس با ما</Link></li>
               <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">حریم خصوصی</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">تماس با ما</h4>
            <address className="space-y-2 text-sm text-muted-foreground not-italic">
              <p>تهران، خیابان نوآوری، پلاک ۱۴۰۳</p>
              <p>تلفن: <a href="tel:02112345678" className="hover:text-primary">۰۲۱-۱۲۳۴۵۶۷۸</a></p>
              <p>ایمیل: <a href="mailto:info@kharid-groupi.ir" className="hover:text-primary">info@kharid-groupi.ir</a></p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 pt-8 text-center text-muted-foreground text-xs"> {/* Use border/50 for less contrast */}
          <p>&copy; {currentYear} خرید گروهی. تمامی حقوق محفوظ است. طراحی و توسعه با ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
