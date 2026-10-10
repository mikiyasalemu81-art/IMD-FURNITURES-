import { BusinessHours, Language } from './types';

export interface OpenClosedStatus {
  isOpen: boolean;
  statusText: {
    en: string;
    am: string;
    om: string;
  };
  details: {
    currentTimeString: string;
    closesOrOpensAt: string;
  };
}

/**
 * Computes live Open / Closed status strictly against Africa/Addis_Ababa timezone (UTC+3)
 */
export function getAddisAbabaOpenStatus(hours?: BusinessHours): OpenClosedStatus {
  // Addis Ababa is East Africa Time (EAT), which is UTC+3 permanently (no DST).
  const now = new Date();
  
  // Calculate Addis Ababa local time using Intl
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Addis_Ababa',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    partMap[part.type] = part.value;
  }

  const weekday = partMap['weekday'] || 'Mon'; // Mon, Tue, etc.
  const hour = parseInt(partMap['hour'] || '12', 10);
  const minute = parseInt(partMap['minute'] || '0', 10);
  const currentMinutes = hour * 60 + minute;

  const isSunday = weekday === 'Sun';

  // Fallbacks if hours not passed
  const regOpen = hours?.regularOpen || '08:30';
  const regClose = hours?.regularClose || '20:00';
  const sunOpen = hours?.sundayOpen || '10:00';
  const sunClose = hours?.sundayClose || '18:00';

  const [openH, openM] = (isSunday ? sunOpen : regOpen).split(':').map(Number);
  const [closeH, closeM] = (isSunday ? sunClose : regClose).split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  const format12Hour = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? `${displayH} ${period}` : `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const closeFormatted = format12Hour(closeH, closeM);
  const openFormatted = format12Hour(openH, openM);

  const statusText = isOpen
    ? {
        en: `Open now · closes ${closeFormatted}`,
        am: `አሁን ክፍት ነው · ${closeFormatted} ይዘጋል`,
        om: `Banaadha · ${closeFormatted} cufama`,
      }
    : {
        en: `Closed · opens ${openFormatted}`,
        am: `አሁን ዝግ ነው · ${openFormatted} ይከፈታል`,
        om: `Cufaadha · ${openFormatted} banama`,
      };

  return {
    isOpen,
    statusText,
    details: {
      currentTimeString: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      closesOrOpensAt: isOpen ? closeFormatted : openFormatted,
    },
  };
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(phone: string): string {
  const cleanPhone = phone.replace(/\s+/g, '');
  return `tel:${cleanPhone}`;
}
