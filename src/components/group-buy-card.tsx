import Image from 'next/image';
import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Tag } from 'lucide-react';

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
  aiHint?: string; // Add aiHint prop
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
}) => {
  const progress = Math.min((currentParticipants / requiredParticipants) * 100, 100);
  const remainingParticipants = Math.max(0, requiredParticipants - currentParticipants);

  // Format price with commas and currency symbol (Toman)
   const formatPrice = (price: number) => {
     return `${price.toLocaleString('fa-IR')} تومان`;
   }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg border">
      <CardHeader className="p-0 relative">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
          data-ai-hint={aiHint || 'product'} // Use aiHint or default 'product'
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-1">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3">{description}</CardDescription>

        <div className="flex justify-between items-center text-sm mb-2">
          <div className="flex items-center text-muted-foreground">
            <Tag className="ml-1 h-4 w-4" />
            <span>قیمت اصلی:</span>
            <span className="line-through mr-1">{formatPrice(originalPrice)}</span>
          </div>
           <div className="flex items-center font-semibold text-primary">
            <Tag className="ml-1 h-4 w-4" />
             <span>قیمت گروهی:</span>
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
