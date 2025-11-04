import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'login-background'
  );

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
      <div className="relative z-10 w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
