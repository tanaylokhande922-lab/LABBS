'use client';

import { PathCard } from '@/components/path-card';
import { useAuthContext } from '@/components/providers/auth-provider';
import { Book, GraduationCap, Trophy, Building2 } from 'lucide-react';

export default function ChoosePathPage() {
  const { user } = useAuthContext();

  const paths = [
    {
      title: '1st Year',
      slug: '1st-year',
      href: '/year/1st-year',
      icon: <Book className="h-6 w-6" />,
    },
    {
      title: '2nd Year',
      slug: '2nd-year',
      href: '/year/2nd-year/select-branch',
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      title: 'GATE',
      slug: 'gate',
      href: '/year/gate',
      icon: <Trophy className="h-6 w-6" />,
    },
    {
      title: 'UPSC',
      slug: 'upsc',
      href: '/year/upsc',
      icon: <Building2 className="h-6 w-6" />,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.displayName?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose your path and start exploring resources tailored for you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => (
          <PathCard
            key={path.slug}
            title={path.title}
            href={path.href}
            icon={path.icon}
          />
        ))}
      </div>
    </div>
  );
}
