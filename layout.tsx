import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'THA SOUNDS — Where the sound lives',
  description: 'A home for independent music, artists and new sounds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
