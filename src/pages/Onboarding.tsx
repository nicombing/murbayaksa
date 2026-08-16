import { useState } from 'react';
import { useTrailData } from '../hooks/useTrailData';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mountain } from 'lucide-react';
import { cn } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const Onboarding = () => {
  const { configureTrail } = useTrailData();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [startGate, setStartGate] = useState<'west' | 'east' | null>(null);
  const [distance, setDistance] = useState<6 | 12 | 24 | 112 | null>(null);

  const handleStart = async () => {
    if (!startGate || !distance) return;
    await configureTrail({ startGate, distance });
    navigate('/app/dashboard');
  };

  return (
    <div className="flex flex-col min-h-full bg-background p-6">
      <div className="pt-12 pb-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center text-primary mb-6 shadow-md border border-white">
          <Mountain size={40} />
        </div>
        <h1 className="text-3xl font-bold text-text mb-2">{t('pwa.setup.title')}</h1>
        <p className="text-text-muted">{t('pwa.setup.subtitle')}</p>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <section>
          <h2 className="font-bold text-text mb-4 px-2">{t('pwa.setup.step1')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setStartGate('west')} className={cn("p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all", startGate === 'west' ? "border-accent bg-accent/10" : "border-transparent bg-white shadow-sm hover:bg-card/50")}>
              <span className="font-bold text-text">{t('pwa.setup.westGate')}</span>
              <span className="text-xs text-text-muted">Joglo</span>
            </button>
            <button onClick={() => setStartGate('east')} className={cn("p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all", startGate === 'east' ? "border-accent bg-accent/10" : "border-transparent bg-white shadow-sm hover:bg-card/50")}>
              <span className="font-bold text-text">{t('pwa.setup.eastGate')}</span>
              <span className="text-xs text-text-muted">Gowok</span>
            </button>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-text mb-4 px-2">{t('pwa.setup.step2')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: 6, label: '6 km', waypoints: `4 ${t('pwa.setup.waypoints')}` },
              { val: 12, label: '12 km', waypoints: `6 ${t('pwa.setup.waypoints')}` },
              { val: 24, label: '24 km', waypoints: t('pwa.setup.allWaypoints') },
              { val: 112, label: '112 km', waypoints: t('pwa.setup.comingSoon'), disabled: true },
            ].map((opt) => (
              <button key={opt.val} disabled={opt.disabled} onClick={() => setDistance(opt.val as any)} className={cn("p-4 rounded-2xl flex flex-col items-start gap-1 border-2 transition-all", distance === opt.val ? "border-accent bg-accent/10" : "border-transparent bg-white shadow-sm hover:bg-card/50", opt.disabled && "opacity-50 cursor-not-allowed bg-gray-100")}>
                <span className="font-bold text-lg text-text">{opt.label}</span>
                <span className="text-xs text-text-muted">{opt.waypoints}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="pt-8 pb-4">
        <button disabled={!startGate || !distance} onClick={handleStart} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-text disabled:opacity-50 disabled:cursor-not-allowed">
          {t('pwa.setup.btnStart')} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
