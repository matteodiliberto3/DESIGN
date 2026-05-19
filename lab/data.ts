import type { LabNavItem } from './types';

export const PRODUCT_NAME = 'Meridian';
export const PRODUCT_TAGLINE = 'Revenue operations per team in crescita';

export const NAV_ITEMS: LabNavItem[] = [
    {
        id: 'dashboard',
        label: 'Panoramica',
        description: 'Stato account e attività recenti',
        componentTag: null,
    },
    {
        id: 'onboarding',
        label: 'Onboarding cliente',
        description: 'Wizard multi-step per nuovi account',
        componentTag: 'LiquidProgressBass',
    },
    {
        id: 'workspace',
        label: 'Configurazione workspace',
        description: 'Setup guidato per integrazioni e automazioni',
        componentTag: 'FloatinPill',
    },
    {
        id: 'features',
        label: 'Tour prodotto',
        description: 'Presentazione moduli con morphing visivo',
        componentTag: 'ScrollDrivenMotionStickyVersion',
    },
    {
        id: 'playbook',
        label: 'Playbook interno',
        description: 'Procedure espandibili per il team',
        componentTag: 'AccordionDynamicLayoutShared',
    },
    {
        id: 'flows',
        label: 'Orchestrazione agenti',
        description: 'Grafo di nodi e flussi dati stile Linear',
        componentTag: 'LinearFlowNodes',
    },
    {
        id: 'speedwave',
        label: 'Designed for speed',
        description: 'Onda di lamelle reattiva al cursore (FIG 0.4)',
        componentTag: 'LinearSpeedWave',
    },
];

export const RECENT_ACTIVITY = [
    { id: 1, action: 'Invito inviato', target: 'Acme Corp', time: '12 min fa' },
    { id: 2, action: 'Pipeline aggiornata', target: 'Q2 Enterprise', time: '1 h fa' },
    { id: 3, action: 'Report esportato', target: 'Revenue snapshot', time: 'Ieri' },
];
