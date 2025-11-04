'use client';

import { BranchCard } from '@/components/branch-card';
import {
  CircuitBoard,
  Cpu,
  Database,
  Network,
} from 'lucide-react';

export default function SelectBranchPage() {
  const branches = [
    {
      title: 'Computer Science',
      slug: '2nd-year-cs',
      icon: <Cpu className="h-8 w-8" />,
    },
    {
      title: 'Information Technology',
      slug: '2nd-year-it',
      icon: <Network className="h-8 w-8" />,
    },
    {
      title: 'Electronics and Computer Engineering',
      slug: '2nd-year-ece',
      icon: <CircuitBoard className="h-8 w-8" />,
    },
    {
      title: 'Data Science',
      slug: '2nd-year-ds',
      icon: <Database className="h-8 w-8" />,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Select Your Branch
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose your field of study to access specialized resources.
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {branches.map((branch) => (
          <BranchCard
            key={branch.slug}
            title={branch.title}
            slug={branch.slug}
            icon={branch.icon}
          />
        ))}
      </div>
    </div>
  );
}
