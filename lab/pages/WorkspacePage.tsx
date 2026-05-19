import FloatinPill from '../../components/FloatinPill';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';

const INTEGRATIONS = [
    { name: 'Stripe Billing', status: 'sync · 2m fa' },
    { name: 'HubSpot CRM', status: 'sync · 14m fa' },
    { name: 'Slack Alerts', status: 'in attesa OAuth' },
];

export default function WorkspacePage() {
    return (
        <div className="max-w-4xl">
            <PageHeader
                componentName="FloatinPill"
                title="Configurazione workspace"
                subtitle="Pannello impostazioni per collegare servizi e definire automazioni. I tab con pillola animata cambiano sezione senza ricaricare la pagina."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <Panel title="Stato integrazioni">
                    <ul className="space-y-3">
                        {INTEGRATIONS.map((row) => (
                            <li
                                key={row.name}
                                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span className="text-sm text-zinc-300">{row.name}</span>
                                </div>
                                <span className="text-xs font-mono text-zinc-500">{row.status}</span>
                            </li>
                        ))}
                    </ul>
                </Panel>

                <FloatinPill />
            </div>
        </div>
    );
}
