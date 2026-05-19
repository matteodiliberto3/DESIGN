import type { ReactNode } from 'react';

type Props = {
    title?: string;
    children: ReactNode;
    className?: string;
};

export default function Panel({ title, children, className = '' }: Props) {
    return (
        <section
            className={`rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden ${className}`}
        >
            {title && (
                <div className="px-5 py-3 border-b border-zinc-800/80">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">{title}</h2>
                </div>
            )}
            <div className="p-5">{children}</div>
        </section>
    );
}
