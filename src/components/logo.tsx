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
        src="https://storage.googleapis.com/project-spark-inst-images/1719589332506-SVKM-Logo.jpg" 
        alt="SVKM Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>SVKM's E-Library</span>
    </Link>
  );
}
