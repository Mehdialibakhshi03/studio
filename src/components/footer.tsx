import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12"> {/* Use specific gray for dark background */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">خرید<span className="text-blue-400">گروهی</span></h4>
            <p className="text-gray-400">اولین و بزرگترین سایت خرید گروهی ایران با تخفیف‌های ویژه برای شما</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">صفحه اصلی</Link></li>
              <li><Link href="/active-deals" className="hover:text-white transition-colors">خریدهای فعال</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">دسته‌بندی‌ها</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">خدمات مشتریان</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-white transition-colors">سوالات متداول</Link></li>
              <li><Link href="/how-to-buy" className="hover:text-white transition-colors">راهنمای خرید</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">شرایط بازگشت</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">تماس با ما</h4>
            <div className="space-y-2 text-gray-400">
              <p>تهران، خیابان ولیعصر، مرکز خرید</p>
              <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p>ایمیل: info@kharid-groupi.ir</p>
            </div>
            {/* Social Media Icons Placeholder */}
            <div className="flex space-x-4 rtl:space-x-reverse mt-4">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} خرید گروهی - تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default