import ScrollDrivenMotionStickyVersion from '../../components/ScrollDrivenMotionStickyVersion';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';

export default function FeaturesPage() {
    return (
        <div className="max-w-5xl">
            <PageHeader
                componentName="ScrollDrivenMotionStickyVersion"
                title="Tour prodotto"
                subtitle="Sezione marketing interna per presentare i moduli principali. Passa il mouse sulle voci a sinistra per vedere il morphing del mockup."
            />

            <Panel title="Moduli Meridian">
                <ScrollDrivenMotionStickyVersion />
            </Panel>

            <p className="text-xs text-zinc-600 font-mono mt-4 text-center">
                In produzione questo pattern accompagna lo scroll verticale della landing.
            </p>
        </div>
    );
}
