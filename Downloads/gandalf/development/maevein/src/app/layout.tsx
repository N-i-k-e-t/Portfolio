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
  title: 'Maevein - The Premier AI Gamified Learning Platform',
  description: 'Master DeepSeek R1, Reasoning Models, Agentic AI, Python, and Science through immersive gamified challenges. Prove your knowledge to AI maeveins and unlock the future.',
  keywords: 'Maevein, AI Learning, Gamified Education, DeepSeek R1, Reasoning Models, Agentic AI, Prompt Engineering, Cybersecurity Game, AI Mastery 2026, educational AI',
  authors: [{ name: 'Maevein' }],
  openGraph: {
    title: 'Maevein - AI Gamified Learning platform | Master Knowledge through Play',
    description: 'Master AI, Science, and Coding through immersive gamified challenges with 6+ modules and 42+ levels.',
    url: 'https://maevein.vercel.app',
    siteName: 'Maevein',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maevein - The Premier AI Gamified Learning Platform',
    description: 'Master AI, Science, and Coding through immersive gamified challenges.',
    creator: '@maevein_ai',
  },
  alternates: {
    canonical: 'https://maevein.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
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
