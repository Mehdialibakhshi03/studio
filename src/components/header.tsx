import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, LogIn, UserPlus } from 'lucide-react'; // Import necessary icons

const Header = () => {
  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
           <ShoppingBasket className="h-8 w-8 text-primary" />
           <span className="text-2xl font-bold text-primary">خرید گروهی</span>
        </Link>
        <nav className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Removed placeholder buttons */}
          <Button variant="outline">
            <UserPlus className="ml-2 h-4 w-4" />
            ثبت نام
          </Button>
          <Button>
            <LogIn className="ml-2 h-4 w-4" />
            ورود
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
