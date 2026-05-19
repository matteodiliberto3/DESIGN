import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const steps = [
  { id: '01', title: 'Crea un Account', desc: 'Inserisci le tue credenziali e configura il tuo profilo aziendale in meno di due minuti.' },
  { id: '02', title: 'Definisci la Strategia', desc: 'Imposta i tuoi obiettivi finanziari, i margini di profitto e le regole di sconti automatizzati.' },
  { id: '03', title: 'Lancia e Ottimizza', desc: 'Metti online la tua piattaforma e lascia che i nostri algoritmi ottimizzino le prenotazioni.' },
];

type BadgeRect = { top: number; left: number; width: number; height: number };

const badgeSpring = { type: 'spring' as const, stiffness: 400, damping: 32 };

const badgeBaseClass =
  'text-xs font-mono px-2 py-1 rounded border shrink-0 w-[2.25rem] text-center inline-flex items-center justify-center';

export default function AccordionDynamicLayoutShared() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const badgeSlotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [badgeRect, setBadgeRect] = useState<BadgeRect>({ top: 0, left: 0, width: 0, height: 0 });

  const measureBadge = useCallback(() => {
    if (expanded === null) return;

    const list = listRef.current;
    const slot = badgeSlotRefs.current[expanded];
    if (!list || !slot) return;

    const listBox = list.getBoundingClientRect();
    const slotBox = slot.getBoundingClientRect();
    setBadgeRect({
      top: slotBox.top - listBox.top,
      left: slotBox.left - listBox.left,
      width: slotBox.width,
      height: slotBox.height,
    });
  }, [expanded]);

  useLayoutEffect(() => {
    measureBadge();
    window.addEventListener('resize', measureBadge);
    return () => window.removeEventListener('resize', measureBadge);
  }, [measureBadge]);

  return (
    <LayoutGroup id="playbook-accordion">
      <div
        ref={listRef}
        className="relative w-full max-w-md mx-auto p-6 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col gap-3"
      >
        {expanded !== null && (
          <motion.span
            layoutId="accordion-step-badge"
            className={`absolute z-10 ${badgeBaseClass} bg-zinc-100 text-zinc-950 border-white`}
            initial={false}
            animate={{
              top: badgeRect.top,
              left: badgeRect.left,
              width: badgeRect.width,
              height: badgeRect.height,
            }}
            transition={badgeSpring}
            aria-hidden
          >
            {steps[expanded].id}
          </motion.span>
        )}

        {steps.map((step, index) => {
          const isOpen = expanded === index;

          return (
            <motion.div
              layout
              key={step.id}
              onClick={() => setExpanded(isOpen ? null : index)}
              className={`p-4 border rounded-xl cursor-pointer overflow-hidden select-none transition-colors ${
                isOpen ? 'bg-zinc-800/80 border-zinc-600' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.div layout="position" className="flex items-center gap-4">
                <span
                  ref={(el) => {
                    badgeSlotRefs.current[index] = el;
                  }}
                  className={`${badgeBaseClass} ${
                    isOpen ? 'invisible' : 'text-zinc-500 border-zinc-800'
                  }`}
                  aria-hidden={isOpen}
                >
                  {step.id}
                </span>
                <motion.h3 layout="position" className="text-zinc-200 font-medium">
                  {step.title}
                </motion.h3>
              </motion.div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-sm text-zinc-400 pl-14 leading-relaxed"
                  >
                    {step.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
