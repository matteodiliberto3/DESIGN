import LinearSpeedWave from '../../components/LinearSpeedWave';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';

export default function SpeedWavePage() {
    return (
        <div className="max-w-5xl">
            <PageHeader
                componentName="LinearSpeedWave"
                title="Designed for speed"
                subtitle="Lamelle isometriche a riposo tutte uguali (FIG 0.4); al passaggio del mouse si deformano in onda."
            />

            <Panel title="Wave field · pointer deformer">
                <LinearSpeedWave />
            </Panel>

            <p className="text-xs text-zinc-600 font-mono mt-4 text-center">
                Passa il mouse sul cluster · altezza per lamella · spring Framer Motion
            </p>
        </div>
    );
}
