import type { LabView } from '../types';
import { NAV_ITEMS } from '../data';

type Props = {
    current: LabView;
};

export default function LabTopBar({ current }: Props) {
    const page = NAV_ITEMS.find((item) => item.id === current);

    return (
        <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
            <div>
                <p className="text-sm font-medium text-zinc-200">{page?.label ?? 'Meridian'}</p>
                <p className="text-xs text-zinc-500">{page?.description}</p>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-xs text-zinc-500 font-mono">
                    workspace / eu-west · live
                </span>
                <div className="flex items-center gap-2.5 pl-4 border-l border-zinc-800">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-medium text-zinc-300">Elena Marchetti</p>
                        <p className="text-[10px] text-zinc-500">Revenue Lead</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-200">
                        EM
                    </div>
                </div>
            </div>
        </header>
    );
}
