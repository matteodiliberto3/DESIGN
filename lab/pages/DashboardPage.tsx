import { NAV_ITEMS, PRODUCT_NAME, PRODUCT_TAGLINE, RECENT_ACTIVITY } from '../data';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';
import type { LabView } from '../types';

type Props = {
    onNavigate: (view: LabView) => void;
};

const QUICK_STATS = [
    { label: 'ARR in pipeline', value: '€ 284k', delta: '+12%' },
    { label: 'Account attivi', value: '38', delta: '+3' },
    { label: 'Onboarding in corso', value: '6', delta: '2 in ritardo' },
];

export default function DashboardPage({ onNavigate }: Props) {
    const labSections = NAV_ITEMS.filter((item) => item.componentTag);

    return (
        <div className="max-w-5xl">
            <PageHeader title={`Benvenuta in ${PRODUCT_NAME}`} subtitle={PRODUCT_TAGLINE} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {QUICK_STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-4"
                    >
                        <p className="text-xs text-zinc-500">{stat.label}</p>
                        <p className="text-xl font-semibold text-zinc-100 mt-1">{stat.value}</p>
                        <p className="text-xs text-emerald-400/90 mt-1 font-mono">{stat.delta}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Panel title="Aree del laboratorio">
                    <p className="text-sm text-zinc-400 mb-4">
                        Ogni sezione simula un flusso prodotto reale. Apri una vista per interagire con il
                        componente animato nel suo contesto.
                    </p>
                    <ul className="space-y-2">
                        {labSections.map((section) => (
                            <li key={section.id}>
                                <button
                                    type="button"
                                    onClick={() => onNavigate(section.id)}
                                    className="w-full flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-left hover:border-zinc-600 transition-colors group"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
                                            {section.label}
                                        </p>
                                        <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                                            {section.componentTag}
                                        </p>
                                    </div>
                                    <span className="text-zinc-600 group-hover:text-zinc-300">→</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </Panel>

                <Panel title="Attività recente">
                    <ul className="divide-y divide-zinc-800">
                        {RECENT_ACTIVITY.map((item) => (
                            <li
                                key={item.id}
                                className="py-3 first:pt-0 last:pb-0 flex justify-between gap-4"
                            >
                                <div>
                                    <p className="text-sm text-zinc-300">{item.action}</p>
                                    <p className="text-xs text-zinc-500">{item.target}</p>
                                </div>
                                <span className="text-xs text-zinc-600 shrink-0">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </Panel>
            </div>
        </div>
    );
}
