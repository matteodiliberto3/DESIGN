import { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, title: 'Integrazione', desc: 'Connetti i tuoi servizi in un click.' },
    { id: 2, title: 'Configurazione', desc: 'Personalizza i flussi e le automazioni.' },
    { id: 3, title: 'Monitoraggio', desc: 'Analizza i dati in tempo reale dalla dashboard.' },
];

export default function FloatingTabStepper() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div
            className="flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-2xl max-w-xl mx-auto border border-zinc-800">
            {/* Tab Header */}
            <div className="flex space-x-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 w-full">
                {steps.map((step, index) => (
                    <button key={step.id} onClick={() => setActiveStep(index)}
                        className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 z-10 ${activeStep === index ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                    >
                        {activeStep === index && (
                            <motion.div layoutId="active-pill" className="absolute inset-0 bg-white rounded-lg -z-10" transition={{
                                type: 'spring', stiffness: 380, damping: 30
                            }} />
                        )}
                        Step {step.id}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-8 h-32 text-center flex flex-col justify-center">
                <motion.h3 key={`title-${activeStep}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-semibold text-zinc-100">
                    {steps[activeStep].title}
                </motion.h3>
                <motion.p key={`desc-${activeStep}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }} className="mt-2 text-zinc-400 text-sm max-w-sm">
                    {steps[activeStep].desc}
                </motion.p>
            </div>
        </div>
    );
}