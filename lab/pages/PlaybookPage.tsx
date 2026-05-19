import AccordionDynamicLayoutShared from '../../components/AccordionDynamicLayoutShared';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';

function MetaRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4 border-b border-zinc-800/80 pb-2">
            <dt className="text-zinc-500">{label}</dt>
            <dd className="text-zinc-300 font-mono">{value}</dd>
        </div>
    );
}

export default function PlaybookPage() {
    return (
        <div className="max-w-3xl">
            <PageHeader
                componentName="AccordionDynamicLayoutShared"
                title="Playbook interno"
                subtitle="Procedure operative per il team revenue. L'accordion usa layoutId conmotione sul badge attivo per transizioni fluide tra le fasi."
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <Panel title="Contesto" className="md:col-span-2">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Usa questo pannello come guida rapida durante l'onboarding di nuovi account manager.
                        Ogni step espandibile mantiene l'allineamento del layout grazie a Framer Motion.
                    </p>
                    <dl className="mt-6 space-y-3 text-xs">
                        <MetaRow label="Owner" value="Revenue Ops" />
                        <MetaRow label="Ultimo aggiornamento" value="18 mag 2026" />
                        <MetaRow label="Versione" value="v2.4 lab" />
                    </dl>
                </Panel>

                <div className="md:col-span-3">
                    <AccordionDynamicLayoutShared />
                </div>
            </div>
        </div>
    );
}
