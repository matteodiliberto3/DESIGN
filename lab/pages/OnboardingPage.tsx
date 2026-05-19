import { useState } from 'react';
import { motion } from 'framer-motion';
import LiquidProgressBass from '../../components/LiquidProgressBass';
import PageHeader from '../ui/PageHeader';
import Panel from '../ui/Panel';

const ONBOARDING_STEPS = [
  {
    title: 'Dati account',
    fields: [
      { label: 'Ragione sociale', placeholder: 'Acme Industries S.r.l.', name: 'company' },
      { label: 'Dominio email', placeholder: 'acme.com', name: 'domain' },
    ],
  },
  {
    title: 'Contratto',
    fields: [{ label: 'Piano contrattuale', placeholder: 'Enterprise · annuale', name: 'plan' }],
  },
  {
    title: 'Team',
    fields: [{ label: 'Admin iniziale', placeholder: 'revenue@acme.com', name: 'admin' }],
  },
  {
    title: 'Riepilogo',
    fields: [],
  },
] as const;

type FormValues = Record<string, string>;

const INITIAL_VALUES: FormValues = {
  company: '',
  domain: '',
  plan: '',
  admin: '',
};

function FormField({
  label,
  placeholder,
  name,
  value,
  onChange,
  readOnly,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-zinc-500">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 read-only:opacity-80"
      />
    </label>
  );
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);

  const stepConfig = ONBOARDING_STEPS[currentStep - 1];
  const isSummary = currentStep === ONBOARDING_STEPS.length;

  const updateField = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div layout className="max-w-4xl">
      <PageHeader
        componentName="LiquidProgressBass"
        title="Onboarding cliente"
        subtitle="Flusso di attivazione per un nuovo account enterprise. Lo stepper liquido e il form condividono lo stesso step."
      />

      <motion.div layout className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel title={stepConfig.title} className="lg:col-span-2">
          <motion.form
            layout
            key={currentStep}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isSummary ? (
              <dl className="space-y-3 text-sm">
                <motion.div layout className="flex justify-between gap-4 border-b border-zinc-800/80 pb-2">
                  <dt className="text-zinc-500">Ragione sociale</dt>
                  <dd className="text-zinc-300 text-right">{values.company || '—'}</dd>
                </motion.div>
                <motion.div layout className="flex justify-between gap-4 border-b border-zinc-800/80 pb-2">
                  <dt className="text-zinc-500">Dominio</dt>
                  <dd className="text-zinc-300 text-right">{values.domain || '—'}</dd>
                </motion.div>
                <motion.div layout className="flex justify-between gap-4 border-b border-zinc-800/80 pb-2">
                  <dt className="text-zinc-500">Piano</dt>
                  <dd className="text-zinc-300 text-right">{values.plan || '—'}</dd>
                </motion.div>
                <motion.div layout className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Admin</dt>
                  <dd className="text-zinc-300 text-right">{values.admin || '—'}</dd>
                </motion.div>
                <p className="text-xs text-emerald-400/90 pt-2">Pronto per l’invito al workspace.</p>
              </dl>
            ) : (
              stepConfig.fields.map((field) => (
                <FormField
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={values[field.name] ?? ''}
                  onChange={(v) => updateField(field.name, v)}
                />
              ))
            )}
          </motion.form>
        </Panel>

        <div className="lg:col-span-3">
          <Panel title="Avanzamento setup">
            <LiquidProgressBass
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              totalSteps={ONBOARDING_STEPS.length}
            />
          </Panel>
        </div>
      </motion.div>
    </motion.div>
  );
}
