import { redirect } from 'next/navigation';
import { routing } from '@/routing';

export default function RootNotFound() {
  redirect(`/${routing.defaultLocale}`);
}

