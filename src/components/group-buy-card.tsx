import Image from 'next/image';
import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Tag, Folder } from 'lucide-react'; // Add Folder icon
import { Badge } from '@/components/ui/badge'; // Import Badge

interface GroupBuyCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  currentParticipants: number;
  requiredParticipants: number;
  originalPrice: number;
  groupPrice: number;
  onJoin: () => void;
  aiHint?: string;
  category?: string; // Add category prop
}

// Helper to get category display name (adjust as needed)
const getCategoryName = (slug?: string) => {
  switch (slug) {
    case 'digital': return 'کالای دیجیتال';
    case 'food': return 'مواد غذایی';
    case 'home-appliances': return 'لوازم خانگی';
    case 'fashion': return 'مد و پوشاک';
    case 'beauty-health': return 'زیبایی و سلامت';
    case 'tools': return 'ابزار و تجهیزات';
    default: return 'متفرقه';
  }
}

const GroupBuyCard: FC<GroupBuyCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  currentParticipants,
  requiredParticipants,
  originalPrice,
  groupPrice,
  onJoin,
  aiHint,
  category,
}) => {
  const progress = Math.min((currentParticipants / requiredParticipants) * 100, 100);
  const remainingParticipants = Math.max(0, requiredParticipants - currentParticipants);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fa-IR')} تومان`;
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg border bg-card">
      <CardHeader className="p-0 relative aspect-video"> {/* Use aspect ratio for consistent image height */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill // Use fill to cover the aspect ratio container
          className="object-cover" // Ensure image covers the area
          data-ai-hint={aiHint || 'product'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Optimize image loading based on viewport
        />
        {category && (
           <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 text-foreground">
             <Folder className="ml-1 h-3 w-3" />
             {getCategoryName(category)}
           </Badge>
         )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-1">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</CardDescription> {/* Limit description lines */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-2 space-y-1 sm:space-y-0">
          <div className="flex items-center text-muted-foreground">
            <Tag className="ml-1 h-4 w-4" />
            <span className="whitespace-nowrap">قیمت اصلی:</span>
            <span className="line-through mr-1">{formatPrice(originalPrice)}</span>
          </div>
           <div className="flex items-center font-semibold text-primary">
            <Tag className="ml-1 h-4 w-4" />
            <span className="whitespace-nowrap">قیمت گروهی:</span>
            <span className="mr-1">{formatPrice(groupPrice)}</span>
          </div>
        </div>

        <div className="space-y-1 mt-3">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center">
                <Users className="ml-1 h-3 w-3" />
                <span>{currentParticipants.toLocaleString('fa-IR')} / {requiredParticipants.toLocaleString('fa-IR')} نفر</span>
            </div>
             {remainingParticipants > 0 ? (
                 <span>{remainingParticipants.toLocaleString('fa-IR')} نفر باقی مانده</span>
             ) : (
                 <span className="text-primary font-semibold">تکمیل شد!</span>
             )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="accent"
          className="w-full transition-transform transform hover:scale-105"
          onClick={onJoin}
          disabled={remainingParticipants <= 0}
        >
          {remainingParticipants > 0 ? 'همین حالا عضو شو!' : 'ظرفیت تکمیل'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupBuyCard;
