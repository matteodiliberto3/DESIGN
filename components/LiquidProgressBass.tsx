import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LiquidProgressBar() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const progressWidth = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

    return (
        <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col items-center">
            {/* Stepper Container */}
            <div className="relative flex justify-between w-full items-center mb-10">

                {/* Background Track */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />

                {/* Active Progress Track */}
                <motion.div
                    className="absolute top-1/2 left-0 h-[2px] bg-white -translate-y-1/2 z-0 origin-left"
                    animate={{ width: progressWidth }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />

                {/* Step Circles */}
                {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNumber = i + 1;
                    const isCompleted = currentStep >= stepNumber;

                    return (
                        <div key={stepNumber} className="relative z-10">
                            <motion.div
                                animate={{
                                    scale: isCompleted ? [1, 1.15, 1] : 1,
                                    backgroundColor: isCompleted ? '#ffffff' : '#18181b',
                                    borderColor: isCompleted ? '#ffffff' : '#27272a',
                                    color: isCompleted ? '#09090b' : '#a1a1aa'
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
                            >
                                {stepNumber}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Controls for demonstration */}
            <div className="flex gap-4">
                <button
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-sm disabled:opacity-40"
                >
                    Indietro
                </button>
                <button
                    disabled={currentStep === totalSteps}
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-4 py-2 bg-white text-zinc-950 rounded-lg text-sm font-medium disabled:opacity-40"
                >
                    Avanti
                </button>
            </div>
        </div>
    );
}