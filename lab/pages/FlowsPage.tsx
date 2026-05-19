import LinearFlowNodes from '../../components/LinearFlowNodes';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';

export default function FlowsPage() {
    return (
        <div className="max-w-5xl">
            <PageHeader
                componentName="LinearFlowNodes"
                title="Orchestrazione agenti"
                subtitle="Vista pipeline per moduli collegati: linee SVG animate, nodi con spring fisico e bordo shimmer continuo su sfondo nero profondo."
            />

            <Panel title="Grafo di esecuzione">
                <LinearFlowNodes />
            </Panel>

            <p className="text-xs text-zinc-600 font-mono mt-4 text-center">
                Pattern ispirato ai flussi della homepage Linear · Framer Motion only
            </p>
        </div>
    );
}
