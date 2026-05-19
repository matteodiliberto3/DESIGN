import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Integrazione', desc: 'Connetti i tuoi servizi in un click.' },
  { id: 2, title: 'Configurazione', desc: 'Personalizza i flussi e le automazioni.' },
  { id: 3, title: 'Monitoraggio', desc: 'Analizza i dati in tempo reale dalla dashboard.' },
];

type PillRect = { left: number; width: number };

const pillSpring = { type: 'spring' as const, stiffness: 380, damping: 30 };

export default function FloatinPill() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillRect, setPillRect] = useState<PillRect>({ left: 0, width: 0 });

  const measurePill = useCallback(() => {
    const container = containerRef.current;
    const tab = tabRefs.current[activeStep];
    if (!container || !tab) return;

    const containerBox = container.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    setPillRect({
      left: tabBox.left - containerBox.left,
      width: tabBox.width,
    });
  }, [activeStep]);

  useLayoutEffect(() => {
    measurePill();
    window.addEventListener('resize', measurePill);
    return () => window.removeEventListener('resize', measurePill);
  }, [measurePill]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-2xl max-w-xl mx-auto border border-zinc-800">
      <motion.div
        ref={containerRef}
        layout
        className="relative flex w-full space-x-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800"
      >
        <motion.div
          layoutId="active-pill"
          className="absolute top-1 bottom-1 rounded-lg bg-white pointer-events-none"
          initial={false}
          animate={{ left: pillRect.left, width: pillRect.width }}
          transition={pillSpring}
          aria-hidden
        />

        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveStep(index)}
            className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeStep === index ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Step {step.id}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="mt-8 h-32 text-center flex flex-col justify-center w-full">
        <motion.h3
          key={`title-${activeStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-zinc-100"
        >
          {steps[activeStep].title}
        </motion.h3>
        <motion.p
          key={`desc-${activeStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-zinc-400 text-sm max-w-sm mx-auto"
        >
          {steps[activeStep].desc}
        </motion.p>
      </motion.div>
    </div>
  );
}
