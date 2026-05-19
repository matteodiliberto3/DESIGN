import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, tag: '01 / DASHBOARD', title: "Tieni d'occhio i tuoi ricavi", imgBg: 'bg-indigo-600' },
  { id: 2, tag: '02 / INTEGRATION', title: 'Sincronizzazione in tempo reale', imgBg: 'bg-emerald-600' },
  { id: 3, tag: '03 / ANALYTICS', title: 'Report intelligenti predittivi', imgBg: 'bg-amber-600' },
];

export default function ScrollDrivenMotionStickyVersion() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      layout
      className="w-full max-w-4xl mx-auto p-6 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col md:flex-row gap-8 min-h-[400px]"
    >
      <motion.div layout className="w-full md:w-1/2 flex flex-col justify-between py-4">
        <motion.div layout className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <motion.div
              layout
              key={step.id}
              onMouseEnter={() => setActive(index)}
              className="cursor-pointer group select-none"
            >
              <span
                className={`text-xs font-mono tracking-wider transition-colors ${
                  active === index ? 'text-white' : 'text-zinc-600'
                }`}
              >
                {step.tag}
              </span>
              <h3
                className={`text-lg font-medium mt-1 transition-all ${
                  active === index
                    ? 'text-zinc-100 translate-x-2'
                    : 'text-zinc-500 group-hover:text-zinc-400'
                }`}
              >
                {step.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-xs text-zinc-500 font-mono mt-6 md:mt-0">
          Pensa a questo effetto mentre l&apos;utente fa lo scroll verticale della pagina.
        </p>
      </motion.div>

      <motion.div
        layout
        className="w-full md:w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[240px] md:min-h-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className={`w-4/5 h-3/5 rounded-lg border border-white/10 p-4 shadow-2xl flex flex-col justify-between ${steps[active].imgBg}`}
          >
            <motion.div className="flex gap-1.5">
              <motion.div className="w-2 h-2 rounded-full bg-white/20" />
              <motion.div className="w-2 h-2 rounded-full bg-white/20" />
              <motion.div className="w-2 h-2 rounded-full bg-white/20" />
            </motion.div>
            <motion.div className="h-full mt-4 rounded bg-white/10 animate-pulse" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
