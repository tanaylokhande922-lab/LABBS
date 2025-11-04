'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface BranchCardProps {
  title: string;
  slug: string;
  icon: React.ReactNode;
}

export function BranchCard({ title, slug, icon }: BranchCardProps) {
  return (
    <Link href={`/year/${slug}`}>
      <Card className="group h-full transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-accent/20 p-3 text-accent-foreground">
                {icon}
              </div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
