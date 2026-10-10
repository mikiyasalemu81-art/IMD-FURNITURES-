'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, ChevronLeft, MessageCircle, Check, Phone } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { buildWhatsAppLink, buildTelLink } from '@/lib/business';

interface CustomOrderModalProps {
  whatsapp?: string;
  phoneCall?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showFloatingButton?: boolean;
}

export function CustomOrderModal({
  whatsapp = '+251 93 032 9010',
  phoneCall = '+251 98 479 5010',
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  showFloatingButton = true,
}: CustomOrderModalProps) {
  const { language, t } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form State (transient only, no database storage per rules)
  const [pieceType, setPieceType] = useState('Sofa / Sectional');
  const [sizeNotes, setSizeNotes] = useState('');
  const [materialNotes, setMaterialNotes] = useState('');
  const [extraDetails, setExtraDetails] = useState('');

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    // reset step after closing animation
    setTimeout(() => setCurrentStep(1), 300);
  };

  const handleOpen = () => {
    setInternalIsOpen(true);
  };

  const pieceOptions = [
    { label: t.categories.sofas, value: 'Sofa / Sectional' },
    { label: t.categories.living, value: 'Living Set' },
    { label: t.categories.beds, value: 'Bed Set & Suite' },
    { label: t.categories.dining, value: 'Dining Set & Table' },
  ];

  // Build clean prefilled WhatsApp message in the active language
  const handleFinalSubmit = () => {
    let msg = '';
    if (language === 'am') {
      msg = `ሰላም አይኤምዲ ፈርኒቸር (IMD Furniture & Design)!\nየሚከተለውን ልዩ የቤት እቃ ለማሰራት እፈልጋለሁ፡\n\n• የዕቃው ዓይነት፡ ${pieceType}\n• ግምታዊ መጠን፡ ${sizeNotes || 'በምክክር ወቅት የሚወሰን'}\n• የተመረጠ እንጨትና ጨርቅ፡ ${materialNotes || 'የባለሙያ ምክር እፈልጋለሁ'}\n• ተጨማሪ መረጃ፡ ${extraDetails || 'ምንም'}\n\nእባክዎን የዋጋና የምክክር ቀጠሮ ይስጡኝ። አመሰግናለሁ!`;
    } else if (language === 'om') {
      msg = `Nagaa, IMD Faarnichar & Diizaayinii!\nMeeshaa addaa armaan gadii hojjechiisuun barbaada:\n\n• Gosa meeshaa: ${pieceType}\n• Safartuu: ${sizeNotes || 'Marii irratti kan murtaa’u'}\n• Mukaa fi uffata: ${materialNotes || 'Gorsa ogeessaa barbaada'}\n• Yaada dabalataa: ${extraDetails || 'Hin jiru'}\n\nMarii shoo-ruumii Siincharii Mool nuuf qopheessaa. Galatoomaa!`;
    } else {
      msg = `Hello IMD Furniture & Design!\nI would like to commission a bespoke piece:\n\n• Piece Type: ${pieceType}\n• Approximate Dimensions / Space: ${sizeNotes || 'To be determined during consultation'}\n• Preferred Materials / Finishes: ${materialNotes || 'Open to craftsman recommendations'}\n• Additional Notes: ${extraDetails || 'None'}\n\nPlease let me know your availability for a private consultation at Century Mall. Thank you!`;
    }

    const url = buildWhatsAppLink(whatsapp, msg);
    window.open(url, '_blank');
    handleClose();
  };

  return (
    <>
      {/* Floating Action Buttons pinned at bottom-right */}
      {showFloatingButton && (
        <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
          {/* Pinned Call Now Phone Icon Button (Pinned directly over the custom order button) */}
          <motion.a
            href={buildTelLink(phoneCall)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#C9A24B] text-[#0B0B0B] shadow-[0_4px_20px_rgba(201,162,75,0.55)] hover:bg-[#E0BB63] hover:shadow-[0_4px_30px_rgba(201,162,75,0.75)] transition-all duration-300 border-2 border-[#0B0B0B] group"
            aria-label="Call IMD Furniture Now"
            title={`Call Now (${phoneCall})`}
          >
            <Phone className="w-5 h-5 fill-current text-[#0B0B0B] group-hover:rotate-12 transition-transform" />
          </motion.a>

          {/* Custom Order Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#141414] text-[#F5F1E8] border border-[#C9A24B]/60 hover:border-[#C9A24B] hover:text-[#C9A24B] font-serif font-bold text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:shadow-gold-glow transition-all duration-300 group"
            aria-label="Open Custom Order Consultation"
          >
            <Sparkles className="w-4 h-4 text-[#C9A24B] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">{t.customOrderModal.triggerButton}</span>
            <span className="sm:hidden">Custom Order</span>
          </motion.button>
        </div>
      )}

      {/* Full Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-[#0B0B0B]/85 backdrop-blur-md"
            />

            {/* Stepper Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#141414] border border-[#C9A24B]/40 shadow-2xl p-6 sm:p-8 z-10 my-auto text-[#F5F1E8]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full text-[#9A9588] hover:text-[#C9A24B] hover:bg-[#1C1C1C] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <span className="text-[11px] uppercase tracking-widest text-[#C9A24B] font-serif font-bold">
                  Century Mall Atelier Consultation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1E8] mt-1">
                  {t.customOrderModal.modalTitle}
                </h3>
                <p className="text-xs text-[#9A9588] mt-1.5 font-light">
                  {t.customOrderModal.modalSubtitle}
                </p>
              </div>

              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-4 gap-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col gap-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStep >= step ? 'bg-[#C9A24B]' : 'bg-[#1C1C1C]'
                      }`}
                    />
                    <span
                      className={`text-[10px] tracking-wider uppercase font-medium ${
                        currentStep === step ? 'text-[#C9A24B]' : 'text-[#68645C]'
                      }`}
                    >
                      Step 0{step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Piece Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <label className="block font-serif text-sm font-semibold text-[#F5F1E8]">
                    {t.customOrderModal.pieceTypeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {pieceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPieceType(opt.value)}
                        className={`p-4 text-left border rounded-none transition-all ${
                          pieceType === opt.value
                            ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#C9A24B] font-semibold shadow-gold-glow'
                            : 'bg-[#0B0B0B] border-[#1C1C1C] text-[#F5F1E8] hover:border-[#C9A24B]/40'
                        }`}
                      >
                        <span className="block text-sm">{opt.label}</span>
                        <span className="text-[11px] text-[#9A9588] font-light mt-0.5 block">
                          {opt.value}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Approximate Size */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <label className="block font-serif text-sm font-semibold text-[#F5F1E8]">
                    {t.customOrderModal.sizeLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={sizeNotes}
                    onChange={(e) => setSizeNotes(e.target.value)}
                    placeholder="e.g. 2.8m long x 1.1m wide dining table, or 8-seater living room layout, or King size headboard..."
                    className="w-full p-4 bg-[#0B0B0B] border border-[#C9A24B]/30 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] outline-none text-sm text-[#F5F1E8] placeholder-[#68645C]"
                  />
                  <p className="text-xs text-[#9A9588] font-light">
                    Tip: If unsure, our master carpenter will conduct an in-person site measurement across Addis Ababa.
                  </p>
                </div>
              )}

              {/* Step 3: Materials & Fabrics */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <label className="block font-serif text-sm font-semibold text-[#F5F1E8]">
                    {t.customOrderModal.materialsLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={materialNotes}
                    onChange={(e) => setMaterialNotes(e.target.value)}
                    placeholder="e.g. Solid Ethiopian Wanza hardwood, espresso matte oil finish, emerald green velvet or full-grain cognac leather..."
                    className="w-full p-4 bg-[#0B0B0B] border border-[#C9A24B]/30 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] outline-none text-sm text-[#F5F1E8] placeholder-[#68645C]"
                  />
                  <p className="text-xs text-[#9A9588] font-light">
                    Physical material and fabric swatches are available to touch at Century Mall.
                  </p>
                </div>
              )}

              {/* Step 4: Review & Inquire */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="p-4 bg-[#0B0B0B] border border-[#C9A24B]/30 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-[#1C1C1C] pb-2">
                      <span className="text-[#9A9588]">Selected Piece:</span>
                      <span className="font-serif font-bold text-[#C9A24B]">{pieceType}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1C1C1C] pb-2">
                      <span className="text-[#9A9588]">Dimensions / Size:</span>
                      <span className="text-right text-[#F5F1E8]">
                        {sizeNotes || 'To be determined'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1C1C1C] pb-2">
                      <span className="text-[#9A9588]">Materials & Finish:</span>
                      <span className="text-right text-[#F5F1E8]">
                        {materialNotes || 'Craftsman recommendation'}
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="text-xs text-[#9A9588] block mb-1">
                        {t.customOrderModal.additionalNotes}
                      </span>
                      <input
                        type="text"
                        value={extraDetails}
                        onChange={(e) => setExtraDetails(e.target.value)}
                        placeholder="Any additional architectural requests..."
                        className="w-full p-2.5 bg-[#141414] border border-[#1C1C1C] focus:border-[#C9A24B] text-xs text-[#F5F1E8] outline-none"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-[#9A9588] font-light">
                    Clicking below will format your preferences and open WhatsApp directly with IMD Furniture & Design.
                  </p>
                </div>
              )}

              {/* Stepper Navigation Buttons */}
              <div className="mt-8 pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-5 py-2.5 bg-[#1C1C1C] text-[#F5F1E8] text-xs font-serif uppercase tracking-wider hover:text-[#C9A24B] flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.customOrderModal.back}</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="px-6 py-2.5 bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] text-xs font-serif font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t.customOrderModal.next}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-6 py-3 bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] text-xs font-serif font-bold uppercase tracking-widest flex items-center gap-2 shadow-gold-glow transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.customOrderModal.finishWhatsApp}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
