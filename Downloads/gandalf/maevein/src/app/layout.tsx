import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/lib/game-context';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maevein - Educational AI Game',
  description: 'Master AI, Science, and Coding through immersive gamified challenges.',
  keywords: 'education, AI, chemistry, biology, physics, python, gamified learning, prompt injection',
  authors: [{ name: 'Maevein' }],
  openGraph: {
    title: 'Maevein - The AI Won\'t Give You Answers. Prove You Already Know Them.',
    description: 'Gamified educational AI platform with 6 modules and 42 levels.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0a] text-white min-h-screen`}
      >
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
