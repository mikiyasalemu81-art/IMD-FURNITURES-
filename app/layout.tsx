import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Noto_Sans_Ethiopic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { SavedPiecesProvider } from '@/components/SavedPiecesContext';
import { siteSettings } from '@/content/site';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SavedPiecesDrawer } from '@/components/SavedPiecesDrawer';
import { CustomOrderModal } from '@/components/CustomOrderModal';
import { Preloader } from '@/components/Preloader';
import { SmoothScroll } from '@/components/SmoothScroll';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0B0B0B',
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-noto-ethiopic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://imdfurniture.com'),
  title: {
    default: 'IMD Furniture & Design | Bespoke Luxury Furniture Addis Ababa',
    template: '%s | IMD Furniture & Design',
  },
  description:
    'Handcrafted bespoke furniture and architectural joinery at Century Mall, Addis Ababa, Ethiopia. Sofas, dining tables, dining chairs, bed sets, and custom architectural commissions.',
  keywords: [
    'furniture addis ababa',
    'luxury furniture ethiopia',
    'bespoke furniture addis',
    'century mall furniture',
    'handcrafted sofas addis ababa',
    'ethiopian timber dining tables',
    'IMD furniture',
    'IMD furniture and design',
  ],
  authors: [{ name: 'IMD Furniture & Design' }],
  creator: 'IMD Furniture & Design',
  publisher: 'IMD Furniture & Design',
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    url: 'https://imdfurniture.com',
    title: 'IMD Furniture & Design | Bespoke Furniture Addis Ababa',
    description:
      'Handcrafted bespoke furniture and architectural joinery at Century Mall, Addis Ababa, Ethiopia.',
    siteName: 'IMD Furniture & Design',
    images: [
      {
        url: '/hero/hero-1.jpg',
        width: 1200,
        height: 630,
        alt: 'IMD Furniture & Design Atelier Addis Ababa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IMD Furniture & Design | Bespoke Luxury Furniture',
    description: 'Bespoke craftsman furniture at Century Mall, Addis Ababa, Ethiopia.',
    images: ['/hero/hero-1.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.png',
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
  // LocalBusiness schema JSON-LD for Century Mall, Addis Ababa
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: 'IMD Furniture & Design',
    alternateName: 'IMD Furniture',
    image: 'https://imdfurniture.com/logo.png',
    '@id': 'https://imdfurniture.com',
    url: 'https://imdfurniture.com',
    telephone: siteSettings.phoneCall || '+251984795010',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Century Mall, Gurd Shola / Megenagna Corridor',
      addressLocality: 'Addis Ababa',
      addressRegion: 'Addis Ababa',
      addressCountry: 'ET',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.013589,
      longitude: 38.799786,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '23',
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoEthiopic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('imd_preloader_seen')==='true'&&!location.search.includes('preview_preloader=true')){document.documentElement.classList.add('preloader-done')}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-[#0B0B0B] text-[#F5F1E8] antialiased selection:bg-[#C9A24B] selection:text-[#0B0B0B] flex flex-col min-h-screen overflow-x-hidden w-full max-w-[100vw]">
        <LanguageProvider>
          <SmoothScroll>
            <Preloader />
            <SavedPiecesProvider>
              <Navbar
                hours={siteSettings.hours}
                phoneCall={siteSettings.phoneCall}
                whatsapp={siteSettings.whatsapp}
              />

              <main className="flex-1 w-full overflow-x-hidden">{children}</main>

              <Footer settings={siteSettings} />

              {/* Global Floating Elements */}
              <SavedPiecesDrawer whatsapp={siteSettings.whatsapp} />
              <CustomOrderModal whatsapp={siteSettings.whatsapp} phoneCall={siteSettings.phoneCall} />
            </SavedPiecesProvider>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
