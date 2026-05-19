import { motion } from 'framer-motion';

const NODE_SPRING = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: NODE_SPRING,
  },
};

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.35 },
  },
};

const CONNECTIONS = [
  'M 168 148 C 248 148, 288 108, 368 108',
  'M 168 168 C 200 220, 200 248, 168 292',
  'M 368 128 C 400 180, 420 240, 448 292',
  'M 208 312 C 300 312, 360 312, 432 312',
];

const NODES = [
  {
    id: 'ingest',
    title: 'Ingest',
    subtitle: 'Webhook · 12ms',
    className: 'left-[6%] top-[18%]',
  },
  {
    id: 'triage',
    title: 'Triage agent',
    subtitle: 'Classify · route',
    className: 'left-[42%] top-[8%]',
  },
  {
    id: 'enrich',
    title: 'Enrichment',
    subtitle: 'CRM + billing sync',
    className: 'left-[4%] top-[52%]',
  },
  {
    id: 'dispatch',
    title: 'Dispatch',
    subtitle: 'Slack · email · API',
    className: 'left-[48%] top-[48%]',
  },
] as const;

type FlowNodeCardProps = {
  title: string;
  subtitle: string;
  className: string;
};

function FlowNodeCard({ title, subtitle, className }: FlowNodeCardProps) {
  return (
    <motion.div
      variants={nodeVariants}
      className={`absolute w-[min(42%,11.5rem)] ${className}`}
    >
      <motion.div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            padding: 1,
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
            backgroundSize: '260% 100%',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{ backgroundPosition: ['260% 0%', '-40% 0%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        />

        <div className="relative px-4 py-3.5">
          <p className="text-[13px] font-light tracking-tight text-zinc-100">{title}</p>
          <p className="mt-1 text-[11px] font-light text-zinc-500">{subtitle}</p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-600">
            <span className="h-1 w-1 rounded-full bg-emerald-400/80" />
            live
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LinearFlowNodes() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black overflow-hidden">
      <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-600">
            pipeline
          </p>
          <p className="text-sm font-light text-zinc-400 mt-0.5">Agent orchestration</p>
        </div>
        <span className="text-[10px] font-mono text-zinc-600">eu-west · 4 nodes</span>
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-3xl aspect-[16/10] min-h-[280px] sm:min-h-[340px]"
        style={{ perspective: 1200 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', rotateX: 8, rotateY: -6 }}
        >
          <svg
            className="absolute inset-0 h-full w-full text-white/20"
            viewBox="0 0 560 400"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="flow-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
              </linearGradient>
            </defs>
            {CONNECTIONS.map((d) => (
              <motion.path
                key={d}
                d={d}
                stroke="url(#flow-line)"
                strokeWidth="1.25"
                strokeLinecap="round"
                variants={pathVariants}
              />
            ))}
          </svg>

          {NODES.map((node) => (
            <FlowNodeCard
              key={node.id}
              title={node.title}
              subtitle={node.subtitle}
              className={node.className}
            />
          ))}

          <motion.div
            variants={nodeVariants}
            className="absolute left-[58%] top-[72%] flex items-center gap-2 text-[10px] font-mono text-zinc-600"
          >
            <motion.span
              className="inline-block h-px w-8 bg-white/15"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...NODE_SPRING, delay: 0.9 }}
              style={{ originX: 0 }}
            />
            throughput 1.2k evt/s
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

