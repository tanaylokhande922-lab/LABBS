import { PathCard } from '@/components/path-card';
import { useAuth } from '@/components/providers/auth-provider';
import { BookOpen, BookOpenCheck, Landmark, Target } from 'lucide-react';

export default function ChoosePathPage() {
  const { user } = useAuth();
  
  const paths = [
    { title: '1st Year', slug: '1st-year', icon: <BookOpen className="h-6 w-6" /> },
    { title: '2nd Year', slug: '2nd-year', icon: <BookOpenCheck className="h-6 w-6" /> },
    { title: 'GATE', slug: 'gate', icon: <Target className="h-6 w-6" /> },
    { title: 'UPSC', slug: 'upsc', icon: <Landmark className="h-6 w-6" /> },
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
          <PathCard key={path.slug} {...path} />
        ))}
      </div>
    </div>
  );
}
