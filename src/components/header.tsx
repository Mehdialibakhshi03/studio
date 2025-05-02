import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBasket, LogIn, UserPlus, Search, Bell } from 'lucide-react'; // Import necessary icons

const Header = () => {
  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-2xl font-bold text-primary">
               <ShoppingBasket className="h-8 w-8" />
               <span>خرید<span className="text-blue-600">گروهی</span></span>
            </Link>
            <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">صفحه اصلی</Link>
              <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">دسته‌بندی‌ها</Link>
              <Link href="/active-deals" className="text-muted-foreground hover:text-primary transition-colors">خریدهای فعال</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">درباره ما</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
             <div className="relative hidden sm:block">
                <Input
                  type="text"
                  placeholder="جستجو..."
                  className="bg-secondary px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64"
                  dir="rtl"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                ۳
              </span>
               <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline">
              <UserPlus className="ml-2 h-4 w-4" />
              ثبت نام
            </Button>
            <Button>
              <LogIn className="ml-2 h-4 w-4" />
              ورود
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```></content>
  </change>
  <change>
      <file>src/components/footer.tsx</file>
      <description>Update footer based on user provided code, including more links and contact information.</description>
      <content><![CDATA[import Link from 'next/link';

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

export default Footer;
```></content>
  </change>
   <change>
      <file>src/app/globals.css</file>
      <description>Update globals.css to use Vazirmatn font family and adjust background/foreground colors to match the user's provided code style (lighter background).</description>
      <content><![CDATA[@import '@fontsource/vazirmatn/index.css';
@import '@fontsource/vazirmatn/700.css'; /* Bold weight */

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Vazirmatn', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 98%; /* Light Gray (like bg-gray-50) */
    --foreground: 0 0% 9%; /* Dark Gray (like text-gray-800) */
    --card: 0 0% 100%; /* White */
    --card-foreground: 0 0% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 9%;
    --primary: 142 71% 45%; /* Green (like bg-green-600) */
    --primary-foreground: 0 0% 100%; /* White */
    --secondary: 0 0% 94%; /* Lighter Gray (like bg-gray-100) */
    --secondary-foreground: 0 0% 9%; /* Dark Gray */
    --muted: 0 0% 85%; /* Medium Gray (like text-gray-500) */
    --muted-foreground: 0 0% 45%; /* Darker Medium Gray (like text-gray-600) */
    --accent: 217 91% 60%; /* Blue (like bg-blue-600) */
    --accent-foreground: 0 0% 100%; /* White */
    --destructive: 0 72% 51%; /* Red (like bg-red-600) */
    --destructive-foreground: 0 0% 100%; /* White */
    --border: 0 0% 89.8%; /* Slightly darker gray than secondary */
    --input: 0 0% 96%; /* bg-gray-100 equivalent */
    --ring: 142 71% 45%; /* Primary green for rings */
    --chart-1: 142 71% 45%;
    --chart-2: 217 91% 60%;
    --chart-3: 48 96% 53%; /* Yellow */
    --chart-4: 0 0% 60%; /* Example gray */
    --chart-5: 270 90% 65%; /* Purple */
    --radius: 0.5rem;
    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 0 0% 9%;
    --sidebar-primary: 142 71% 40%; /* Slightly darker green */
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 94%;
    --sidebar-accent-foreground: 0 0% 9%;
    --sidebar-border: 0 0% 89.8%;
    --sidebar-ring: 142 71% 45%;
  }
  .dark {
    --background: 240 10% 3.9%; /* Dark Gray */
    --foreground: 0 0% 98%; /* Near White */
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 142 71% 55%; /* Lighter Green */
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4% 16%; /* Darker Gray */
    --secondary-foreground: 0 0% 98%;
    --muted: 240 4% 25%; /* Medium Dark Gray */
    --muted-foreground: 0 0% 63.9%; /* Lighter Gray */
    --accent: 217 91% 65%; /* Lighter Blue */
    --accent-foreground: 0 0% 100%;
    --destructive: 0 63% 45%; /* Darker Red */
    --destructive-foreground: 0 0% 100%;
    --border: 240 4% 16%;
    --input: 240 4% 16%;
    --ring: 142 71% 55%;
    --chart-1: 142 71% 55%;
    --chart-2: 217 91% 65%;
    --chart-3: 48 96% 63%; /* Lighter Yellow */
    --chart-4: 0 0% 60%;
    --chart-5: 270 90% 70%; /* Lighter Purple */
    --sidebar-background: 240 10% 3.9%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 142 71% 55%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 4% 16%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 240 4% 16%;
    --sidebar-ring: 142 71% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground; /* Use background for body */
    /* Ensure smooth scrolling */
    scroll-behavior: smooth;
     /* Improve text rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: hsl(var(--background));
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(var(--muted));
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground));
  }
}
```></content>
   </change>
   <change>
      <file>src/components/group-buy-card.tsx</file>
      <description>Delete group-buy-card.tsx as its functionality is now integrated into the main page component (page.tsx).</description>
      <content><![CDATA[