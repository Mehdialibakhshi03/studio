'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: Date;
  size?: 'default' | 'sm' | 'xs'; // Optional size prop
  className?: string; // Optional additional class names
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, size = 'default', className }) => {
  const calculateTimeLeft = () => {
    const difference = +endDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasMounted, setHasMounted] = useState(false); // State to track mount status

  useEffect(() => {
    setHasMounted(true); // Set mounted status on client side
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]); // Only re-run if endDate changes

  if (!hasMounted) {
    // Render nothing or a placeholder on the server/before hydration
    return null;
  }

  const timerComponents: React.ReactNode[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    // @ts-ignore TODO fix index signature error
    if (timeLeft[interval] === undefined || timeLeft[interval] < 0) {
      return; // Should not happen with current logic, but safe check
    }

     // Format time parts to always have two digits if needed (except days)
     const value = interval !== 'days'
     // @ts-ignore TODO fix index signature error
      ? String(timeLeft[interval]).padStart(2, '0')
      // @ts-ignore TODO fix index signature error
      : timeLeft[interval];

    // Only display days if > 0
    if (interval === 'days' && value === 0) return;

    // Add separator except for the first element
    if (timerComponents.length > 0) {
      timerComponents.push(<span key={interval + "-sep"} className={cn("mx-0.5", size === 'xs' ? 'text-xs' : 'text-sm')}>:</span>);
    }

    timerComponents.push(
      <span key={interval} className={cn("font-semibold tabular-nums", size === 'xs' ? 'text-xs' : 'text-sm')}>
        {value}
      </span>
    );
  });

  // Base classes
  const baseClasses = "flex items-center gap-1 text-destructive font-medium";

  // Size specific classes
  const sizeClasses = {
    default: "text-sm",
    sm: "text-sm",
    xs: "text-xs",
  };

   // Icon size specific classes
   const iconSizeClasses = {
    default: "h-4 w-4",
    sm: "h-4 w-4",
    xs: "h-3 w-3",
   };


  return (
    <div className={cn(baseClasses, sizeClasses[size], className)}>
      <Clock className={cn(iconSizeClasses[size], "ml-1 rtl:mr-1")} />
      {timerComponents.length ? timerComponents : <span className={sizeClasses[size]}>پایان یافته</span>}
    </div>
  );
};

export default CountdownTimer;
