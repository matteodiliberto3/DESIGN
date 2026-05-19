import { useCallback, useMemo, useRef, type PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/** Finestra FIG 0.4 — dimensioni fisse */
const SCENE_W = 720;
const SCENE_H = 280;

const CARD_COUNT = 20;
const CARD_WIDTH = 22;
const CARD_HEIGHT = 70;
/** Passo isometrico — diagonal extent ~ stack height per leggere come "stack" */
const STACK_STEP = 10;
const DEPTH_DX = STACK_STEP * Math.cos(Math.PI / 6);
const DEPTH_DY = STACK_STEP * Math.sin(Math.PI / 6);

const CLUSTER_W = (CARD_COUNT - 1) * DEPTH_DX + CARD_WIDTH;
const CLUSTER_BASE_H = (CARD_COUNT - 1) * DEPTH_DY + CARD_HEIGHT;
const BASE_X = (SCENE_W - CLUSTER_W) / 2;
const BASE_Y = (SCENE_H - CLUSTER_BASE_H) / 2 + 4;

const INFLUENCE_RADIUS = 110;
const MAX_STRETCH = 2.1;
const CORNER_R = 3;

const LIFT_SPRING = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 18,
  mass: 0.8,
};

const ENTRANCE_SPRING = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

const SLAT_FILL = '#101010';
const STROKE_EDGE = 'rgba(255,255,255,0.06)';
const STROKE_TOP = 'rgba(255,255,255,0.34)';

const cardCenters = Array.from(
  { length: CARD_COUNT },
  (_, i) => BASE_X + i * DEPTH_DX + CARD_WIDTH / 2,
);

type WaveSlatProps = {
  index: number;
  anchorX: number;
  anchorY: number;
  centerX: number;
  mouseX: MotionValue<number>;
  active: MotionValue<number>;
  reducedMotion: boolean;
};

function WaveSlat({
  index,
  anchorX,
  anchorY,
  centerX,
  mouseX,
  active,
  reducedMotion,
}: WaveSlatProps) {
  const targetHeight = useTransform([mouseX, active], ([x, isActive]) => {
    const on = isActive as number;
    if (reducedMotion || !on) return CARD_HEIGHT;
    const px = x as number;
    const distance = Math.abs(px - centerX);
    const t = Math.max(0, 1 - distance / INFLUENCE_RADIUS);
    const influence = t * t;
    return CARD_HEIGHT * (1 + influence * (MAX_STRETCH - 1));
  });

  const height = useSpring(targetHeight, LIFT_SPRING);
  const topY = useTransform(height, (h) => -h);
  const opacity = Math.max(0.62, 1 - index * 0.012);

  return (
    <motion.g style={{ opacity }} transform={`translate(${anchorX} ${anchorY})`}>
      <motion.rect
        x={0}
        y={topY}
        width={CARD_WIDTH}
        height={height}
        rx={CORNER_R}
        fill={SLAT_FILL}
        stroke={STROKE_EDGE}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.line
        x1={CORNER_R}
        x2={CARD_WIDTH - CORNER_R}
        y1={topY}
        y2={topY}
        stroke={STROKE_TOP}
        strokeWidth={1}
        strokeDasharray="3 2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.g>
  );
}

export default function LinearSpeedWave() {
  const hitRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(SCENE_W / 2);
  const active = useMotionValue(0);
  const reducedMotion = useReducedMotion() ?? false;

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const el = hitRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      mouseX.set(Math.max(0, Math.min(SCENE_W, x)));
      active.set(1);
    },
    [mouseX, active],
  );

  const handlePointerLeave = useCallback(() => {
    active.set(0);
    mouseX.set(SCENE_W / 2);
  }, [active, mouseX]);

  const slats = useMemo(
    () =>
      Array.from({ length: CARD_COUNT }, (_, order) => {
        const index = CARD_COUNT - 1 - order;
        const anchorX = BASE_X + index * DEPTH_DX;
        const anchorY = SCENE_H - BASE_Y - index * DEPTH_DY;
        return (
          <WaveSlat
            key={index}
            index={index}
            anchorX={anchorX}
            anchorY={anchorY}
            centerX={cardCenters[index]}
            mouseX={mouseX}
            active={active}
            reducedMotion={reducedMotion}
          />
        );
      }),
    [mouseX, active, reducedMotion],
  );

  return (
    <motion.div
      className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={ENTRANCE_SPRING}
    >
      <motion.div
        className="relative flex flex-col justify-end min-h-[min(52vh,480px)] px-6 sm:px-10 pt-10 pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ENTRANCE_SPRING}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-600 mb-6">
          FIG 0.4
        </p>

        <motion.div
          className="relative flex-1 mb-10 flex items-center justify-center min-h-[300px] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...ENTRANCE_SPRING, delay: 0.04 }}
        >
          <div
            className="relative overflow-hidden bg-[#0a0a0a]"
            style={{ width: SCENE_W, height: SCENE_H }}
          >
            <svg
              className="absolute inset-0 pointer-events-none"
              width={SCENE_W}
              height={SCENE_H}
              viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
              aria-hidden
            >
              {slats}
            </svg>

            <motion.div
              ref={hitRef}
              className="absolute inset-0 z-20"
              onPointerMove={handlePointerMove}
              onPointerEnter={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              aria-hidden
            />
          </div>
        </motion.div>

        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ENTRANCE_SPRING, delay: 0.08 }}
        >
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-100">
            Designed for speed
          </h2>
          <p className="mt-3 text-sm sm:text-base font-light leading-relaxed text-zinc-500">
            Reduces noise and restores momentum to help teams ship with high velocity and focus.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
