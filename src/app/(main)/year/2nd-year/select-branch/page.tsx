'use client';

import { BranchCard } from '@/components/branch-card';
import { Code, Bot } from 'lucide-react';

export default function SelectBranchPage() {
  const branches = [
    {
      title: 'Computer Science',
      slug: '2nd-year-cs',
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: 'Mechanical',
      slug: '2nd-year-mech',
      icon: <Bot className="h-6 w-6" />,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Select Your Branch</h1>
        <p className="text-lg text-muted-foreground">
          Choose your branch to access specialized resources.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
