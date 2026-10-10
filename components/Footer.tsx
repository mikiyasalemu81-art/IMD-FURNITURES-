'use client';

import React from 'react';
import { Logo } from './Logo';
import { useLanguage } from './LanguageContext';
import { Instagram, Facebook, Phone, MapPin, MessageCircle, Mail } from 'lucide-react';
import { buildTelLink, buildWhatsAppLink } from '@/lib/business';
import { BusinessSettings } from '@/lib/types';

interface FooterProps {
  settings?: BusinessSettings;
}

export function Footer({ settings }: FooterProps) {
  const { t, getLocalized } = useLanguage();

  const phone = settings?.phoneCall || '+251 98 479 5010';
  const whatsapp = settings?.whatsapp || '+251 93 032 9010';
  const email = settings?.email || 'info@imdfurniture.com';
  const address = getLocalized(settings?.address) || 'Century Mall, Addis Ababa, Ethiopia';

  return (
    <footer className="w-full bg-[#070707] border-t border-[#C9A24B]/20 text-[#F5F1E8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Atelier Philosophy */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-[#9A9588] leading-relaxed font-light pr-4">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={settings?.social?.instagram || 'https://instagram.com/imdfurnitures'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:text-[#0B0B0B] hover:bg-[#C9A24B] transition-all duration-300"
                aria-label="IMD Furniture Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.social?.facebook || 'https://facebook.com/imdfurnitures'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:text-[#0B0B0B] hover:bg-[#C9A24B] transition-all duration-300"
                aria-label="IMD Furniture Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppLink(whatsapp, 'Hello IMD Furniture & Design!')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:text-[#0B0B0B] hover:bg-[#C9A24B] transition-all duration-300"
                aria-label="IMD Furniture WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A24B] font-semibold">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9A9588]">
              <li>
                <a href="#home" className="hover:text-[#E0BB63] transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#E0BB63] transition-colors">
                  {t.nav.story}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E0BB63] transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#E0BB63] transition-colors">
                  {t.nav.process}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E0BB63] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A24B] font-semibold">
              {t.footer.services}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9A9588]">
              <li>
                <a href="#gallery" className="hover:text-[#E0BB63] transition-colors">
                  {t.categories.sofas}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E0BB63] transition-colors">
                  {t.categories.living}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E0BB63] transition-colors">
                  {t.categories.beds}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E0BB63] transition-colors">
                  {t.categories.dining}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Atelier Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A24B] font-semibold">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-sm text-[#9A9588]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A24B] flex-shrink-0" />
                <a href={buildTelLink(phone)} className="hover:text-[#E0BB63] transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A24B] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#E0BB63] transition-colors">
                  {email}
                </a>
              </div>
              <div className="pt-2 text-xs text-[#68645C]">
                {t.footer.disclaimer}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#68645C] gap-4">
          <p>© {new Date().getFullYear()} IMD Furniture & Design. {t.footer.allRightsReserved}</p>
          <p className="font-serif tracking-wider text-[#C9A24B]/70">
            Century Mall · Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
}
