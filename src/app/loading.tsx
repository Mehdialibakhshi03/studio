
'use client';

import { Handshake } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center text-center p-8 bg-card rounded-xl shadow-2xl border border-border max-w-md mx-auto">
        <div className="mb-6">
          <Handshake className="h-20 w-20 text-primary animate-pulse" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">
          خرید گروهی، سود همگانی!
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          کمی صبر کنید، در حال آماده‌سازی بهترین‌ها برای شما هستیم...
        </p>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full animate-loading-progress"
            style={{ width: '75%' }} // Placeholder width, actual progress is indeterminate
          ></div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes loading-progress-animation {
          0% {
            transform: translateX(-100%) scaleX(0.5);
            opacity: 0.8;
          }
          50% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(0.5);
            opacity: 0.8;
          }
        }
        .animate-loading-progress {
          animation: loading-progress-animation 2s infinite ease-in-out;
          transform-origin: left center;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
