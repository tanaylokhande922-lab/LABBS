import Image from 'next/image';
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
      <Image
        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5fGVufDB8fHx8MTc2MjI5MDU0M3ww&ixlib=rb-4.1.0&q=80&w=400"
        alt="SVKM's E-Library Logo"
        width={40}
        height={40}
        className="rounded-full"
        data-ai-hint="library books"
      />
      <span>SVKM's E-Library</span>
    </Link>
  );
}
