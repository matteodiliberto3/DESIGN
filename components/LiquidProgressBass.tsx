import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  totalSteps?: number;
  showControls?: boolean;
};

export default function LiquidProgressBass({
  currentStep: controlledStep,
  onStepChange,
  totalSteps = 4,
  showControls = true,
}: Props) {
  const [internalStep, setInternalStep] = useState(1);
  const currentStep = controlledStep ?? internalStep;

  const setStep = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), totalSteps);
    onStepChange?.(clamped);
    if (controlledStep === undefined) setInternalStep(clamped);
  };

  const progress = (currentStep - 1) / Math.max(totalSteps - 1, 1);

  return (
    <motion.div
      layout
      className="w-full max-w-xl mx-auto p-8 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col items-center"
    >
      <motion.div layout className="relative flex justify-between w-full items-center mb-10">
        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-0 rounded-full bg-zinc-800/80 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-zinc-600 via-zinc-300 to-white opacity-30"
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-0 h-2 -translate-y-1/2 z-[1] origin-left"
          animate={{
            width: `${progress * 100}%`,
            borderRadius: ['9999px', '42% 58% 48% 52%', '9999px'],
            boxShadow: [
              '0 0 0px rgba(255,255,255,0)',
              '0 0 14px rgba(255,255,255,0.35)',
              '0 0 0px rgba(255,255,255,0)',
            ],
          }}
          transition={{
            width: { type: 'spring', stiffness: 100, damping: 20 },
            borderRadius: { duration: 0.55, ease: 'easeInOut' },
            boxShadow: { duration: 0.55, ease: 'easeInOut' },
          }}
        >
          <motion.div className="h-full w-full rounded-[inherit] bg-white" layout />
        </motion.div>

        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isCompleted = currentStep >= stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <motion.button
              layout
              type="button"
              key={stepNumber}
              onClick={() => setStep(stepNumber)}
              className="relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
              aria-label={`Vai allo step ${stepNumber}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <motion.div
                animate={{
                  scale: isCurrent ? 1.12 : isCompleted ? 1 : 0.95,
                  backgroundColor: isCompleted ? '#ffffff' : '#18181b',
                  borderColor: isCompleted ? '#ffffff' : '#27272a',
                  color: isCompleted ? '#09090b' : '#a1a1aa',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
              >
                {stepNumber}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {showControls && (
        <motion.div layout className="flex gap-4">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setStep(currentStep - 1)}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-sm disabled:opacity-40"
          >
            Indietro
          </button>
          <button
            type="button"
            disabled={currentStep === totalSteps}
            onClick={() => setStep(currentStep + 1)}
            className="px-4 py-2 bg-white text-zinc-950 rounded-lg text-sm font-medium disabled:opacity-40"
          >
            Avanti
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
