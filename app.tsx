// 1. Importa il file CSS con Tailwind
import './index.css';

// 2. Importa i tuoi componenti con i loro nomi esatti
import FloatinPill from './components/FloatinPill';
import AccordionDynamicLayoutShared from './components/AccordionDynamicLayoutShared';
import LiquidProgressBass from './components/LiquidProgressBass';
import ScrollDrivenMotionStickyVersion from './components/ScrollDrivenMotionStickyVersion';

export default function App() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 flex flex-col gap-16 items-center justify-center">
            <header className="text-center max-w-md">
                <h1 className="text-2xl font-bold tracking-tight">Test Animazioni Premium</h1>
                <p className="text-sm text-zinc-400 mt-2">Struttura a passaggi interattivi</p>
            </header>

            {/* Sezione 1: I Tab Fluttuanti */}
            <section className="w-full max-w-2xl">
                <h2 className="text-xs font-mono text-zinc-500 mb-4 text-center">01 / FLOATING PILL TIMELINE</h2>
                <FloatinPill />
            </section>

            {/* Sezione 2: L'Accordion */}
            <section className="w-full max-w-2xl">
                <h2 className="text-xs font-mono text-zinc-500 mb-4 text-center">02 / DYNAMIC ACCORDION</h2>
                <AccordionDynamicLayoutShared />
            </section>

            {/* Sezione 3: La barra di progresso */}
            <section className="w-full max-w-2xl">
                <h2 className="text-xs font-mono text-zinc-500 mb-4 text-center">03 / LIQUID PROGRESS BARS</h2>
                <LiquidProgressBass />
            </section>

            {/* Sezione 4: Lo sticky morphing */}
            <section className="w-full max-w-4xl pb-24">
                <h2 className="text-xs font-mono text-zinc-500 mb-4 text-center">04 / SCROLL DRIVEN STICKY</h2>
                <ScrollDrivenMotionStickyVersion />
            </section>
        </div>
    );
}