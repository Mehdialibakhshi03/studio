
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
        <div className="relative w-full bg-muted rounded-full h-2.5 overflow-hidden"> {/* Track with relative and overflow-hidden */}
          <div
            className="absolute bg-primary h-full rounded-full animate-loading-progress"
            style={{ width: '40%' }} // The moving segment, e.g., 40% of the track's width
          ></div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes loading-progress-animation {
          0% {
            left: -40%; /* Start completely to the left (off-screen based on its own width) */
          }
          100% {
            left: 100%; /* End completely to the right (off-screen based on track's width) */
          }
        }
        .animate-loading-progress {
          animation: loading-progress-animation 1.8s linear infinite;
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

