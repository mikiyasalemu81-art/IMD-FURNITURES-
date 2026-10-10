'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Star, Navigation, Compass, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { OpenClosedBadge } from './OpenClosedBadge';
import { BusinessSettings } from '@/lib/types';
import { buildTelLink, buildWhatsAppLink } from '@/lib/business';

interface ContactLocationProps {
  settings?: BusinessSettings;
}

export function ContactLocation({ settings }: ContactLocationProps) {
  const { t, getLocalized } = useLanguage();

  const phone = settings?.phoneCall || '+251 98 479 5010';
  const whatsapp = settings?.whatsapp || '+251 93 032 9010';
  const address = getLocalized(settings?.address) || 'Century Mall, Addis Ababa, Ethiopia';
  const ratingScore = settings?.googleRating?.score || 5.0;
  const ratingReviews = settings?.googleRating?.reviewCount || 23;
  const hoursText =
    getLocalized(settings?.hours?.displayText) ||
    'Mon – Sat: 8:30 AM – 8:00 PM | Sun: 10:00 AM – 6:00 PM';

  const locations = settings?.locations || [];
  const primaryLocation = locations.find((l) => l.isPrimary) || locations[0] || {
    id: 'primary',
    name: {
      en: 'Century Mall Primary Showroom',
      am: 'ሴንቸሪ ሞል ዋና ሾውሩም',
      om: 'Siincharii Mool Shoo-ruumii Guddaa',
    },
    description: {
      en: 'Main luxury showroom & private consultations',
      am: 'ዋናው የቅንጦት ማሳያ',
      om: 'Shoo-ruumii qaalii',
    },
    mapUrl: 'https://maps.app.goo.gl/Snmz6tYAYYVoJNwh6',
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-xs text-[#C9A24B] font-medium tracking-widest uppercase mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-base text-[#9A9588] font-light leading-relaxed">
            {t.contact.subheading}
          </p>
        </motion.div>

        {/* Primary Contact Action Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Direct Call, WhatsApp & Hours Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 bg-[#141414] border border-[#C9A24B]/30 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative"
          >
            <div className="space-y-8">
              {/* Google 5.0 Star Badge */}
              <div className="p-4 bg-[#0B0B0B] border border-[#C9A24B]/30 rounded-none flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex text-[#C9A24B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" />
                    ))}
                  </div>
                  <span className="font-serif text-base font-bold text-[#F5F1E8]">
                    {ratingScore.toFixed(1)} / 5.0
                  </span>
                </div>
                <span className="text-xs text-[#9A9588] font-light">
                  {ratingReviews} verified reviews
                </span>
              </div>

              {/* Status and Address info */}
              <div className="space-y-4">
                <OpenClosedBadge hours={settings?.hours} />

                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm uppercase tracking-wider text-[#F5F1E8] font-semibold">
                      Showroom Address
                    </h4>
                    <p className="text-sm text-[#9A9588] mt-1">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm uppercase tracking-wider text-[#F5F1E8] font-semibold">
                      {t.contact.operatingHours}
                    </h4>
                    <p className="text-sm text-[#9A9588] mt-1">{hoursText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Large Call & WhatsApp Buttons */}
            <div className="pt-8 space-y-4">
              <a
                href={buildTelLink(phone)}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#1C1C1C] border border-[#C9A24B]/40 hover:border-[#E0BB63] text-[#F5F1E8] hover:text-[#C9A24B] font-serif text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-md group text-center flex-wrap"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A24B] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>{t.contact.callNow}: {phone}</span>
              </a>

              <a
                href={buildWhatsAppLink(
                  whatsapp,
                  'Hello IMD Furniture & Design! I would like to schedule a showroom consultation at Century Mall.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] font-serif text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 group text-center flex-wrap"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>{t.contact.chatWhatsApp}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Embedded Map & Directions CTA (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 bg-[#141414] border border-[#C9A24B]/30 overflow-hidden flex flex-col justify-between shadow-2xl relative min-h-[420px]"
          >
            {/* Embedded interactive Google Map focused on Century Mall, Addis Ababa */}
            <div className="relative w-full h-[360px] sm:h-[400px] bg-[#0B0B0B]">
              <iframe
                title="IMD Furniture Century Mall Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.543501170997!2d38.799786475854774!3d9.013589991047124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850936f3fa49%3A0xe5aa678dcf414e25!2sCentury%20Mall!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90"
              />

              {/* Map floating banner */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-sm p-4 bg-[#0B0B0B]/95 border border-[#C9A24B]/40 shadow-xl backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] font-serif font-bold block mb-1">
                  Primary Showroom
                </span>
                <p className="font-serif text-sm text-[#F5F1E8] font-bold">
                  IMD Furniture & Design — Century Mall
                </p>
                <p className="text-xs text-[#9A9588] mt-1">
                  Gurd Shola / Megenagna Corridor, Addis Ababa
                </p>
              </div>
            </div>

            {/* Bottom Primary Location Bar with "Get Directions" */}
            <div className="p-6 bg-[#141414] border-t border-[#C9A24B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-serif text-sm font-semibold text-[#F5F1E8] block">
                  {getLocalized(primaryLocation.name)}
                </span>
                <span className="text-xs text-[#9A9588]">
                  {getLocalized(primaryLocation.description)}
                </span>
              </div>

              <a
                href={primaryLocation.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-none bg-[#C9A24B]/15 border border-[#C9A24B]/50 hover:bg-[#C9A24B] hover:text-[#0B0B0B] text-[#C9A24B] text-xs font-serif tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.contact.getDirections}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Our Locations List (All 6 Google Maps locations) */}
        {locations.length > 1 && (
          <div className="pt-10 border-t border-[#1C1C1C]">
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#F5F1E8]">
                {t.contact.ourLocations}
              </h3>
              <p className="text-sm text-[#9A9588] mt-1 font-light">
                Visit our showrooms, material ateliers, and joinery workshops across Addis Ababa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, index) => {
                const name = getLocalized(loc.name);
                const desc = getLocalized(loc.description);

                return (
                  <div
                    key={loc.id || index}
                    className="p-6 bg-[#141414] border border-[#C9A24B]/20 hover:border-[#C9A24B]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-xs text-[#C9A24B] tracking-widest">
                          0{index + 1}
                        </span>
                        {loc.isPrimary && (
                          <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/30">
                            {t.contact.primaryShowroom}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#F5F1E8] mb-1">
                        {name}
                      </h4>
                      <p className="text-xs text-[#9A9588] font-light leading-relaxed mb-6">
                        {desc}
                      </p>
                    </div>

                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-[#C9A24B] hover:text-[#E0BB63] pt-3 border-t border-[#1C1C1C] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t.contact.getDirections}</span>
                      <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
