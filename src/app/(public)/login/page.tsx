
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'login-background'
  );

  const handleLogin = () => {
    login({
      displayName: 'Guest User',
      email: 'guest@example.com',
      photoURL: `https://i.pravatar.cc/150?u=guest`,
    });
    router.push('/choose-path');
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="object-cover opacity-20"
          priority
          data-ai-hint={backgroundImage.imageHint}
        />
      )}
      <div className="relative z-10 w-full max-w-sm">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Welcome!</CardTitle>
            <CardDescription>
              Your central hub for college resources. Sign in to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full">
              Sign In as Guest
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
