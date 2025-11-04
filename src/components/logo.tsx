'use client';

import { Library } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-3 text-xl font-bold text-primary transition-colors hover:text-primary/80',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Library className="h-6 w-6" />
      </div>
      <span>SVKM's E-Library</span>
    </Link>
  );
}
