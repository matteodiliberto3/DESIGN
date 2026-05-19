export type LabView =
    | 'dashboard'
    | 'onboarding'
    | 'workspace'
    | 'features'
    | 'playbook'
    | 'flows'
    | 'speedwave';

export type LabNavItem = {
    id: LabView;
    label: string;
    description: string;
    componentTag: string | null;
};
