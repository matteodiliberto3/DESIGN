import type { ReactNode } from 'react';
import LabSidebar from './LabSidebar';
import LabTopBar from './LabTopBar';
import type { LabView } from '../types';

type Props = {
    current: LabView;
    onNavigate: (view: LabView) => void;
    children: ReactNode;
};

export default function LabShell({ current, onNavigate, children }: Props) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
            <LabSidebar current={current} onNavigate={onNavigate} />
            <div className="flex-1 flex flex-col min-w-0">
                <LabTopBar current={current} />
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
