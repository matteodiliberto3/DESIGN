type Props = {
    title: string;
    subtitle: string;
    componentName?: string;
};

export default function PageHeader({ title, subtitle, componentName }: Props) {
    return (
        <div className="mb-8">
            {componentName && (
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                    In prova · <span className="text-zinc-300">{componentName}</span>
                </p>
            )}
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">{title}</h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">{subtitle}</p>
        </div>
    );
}
