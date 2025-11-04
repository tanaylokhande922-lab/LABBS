import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect users to the login page by default.
  // The main app content is in the /choose-path route after authentication.
  redirect('/login');
}
