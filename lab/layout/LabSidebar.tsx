import { NAV_ITEMS, PRODUCT_NAME } from '../data';
import type { LabView } from '../types';

type Props = {
    current: LabView;
    onNavigate: (view: LabView) => void;
};

export default function LabSidebar({ current, onNavigate }: Props) {
    return (
        <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
            <div className="px-5 py-5 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                        <span className="text-zinc-950 text-sm font-bold">M</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-zinc-100 tracking-tight">{PRODUCT_NAME}</p>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">Revenue OS</p>
                    </div>
                </div>
                <p className="text-xs text-zinc-500 mt-3">Prototype environment</p>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const active = current === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                                active
                                    ? 'bg-zinc-800 text-zinc-100'
                                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                            }`}
                        >
                            <span className="block text-sm font-medium">{item.label}</span>
                            <span className="block text-xs text-zinc-500 mt-0.5 line-clamp-1">
                                {item.description}
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <div className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2.5">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90">
                        Component Lab
                    </p>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        Progetto fittizio per testare animazioni in contesto reale.
                    </p>
                </div>
            </div>
        </aside>
    );
}
