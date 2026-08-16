import { useTrailData } from '../hooks/useTrailData';
import { MapPin, Trophy, ChevronRight } from 'lucide-react';
import { cn } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from '../components/Logo';

const Dashboard = () => {
  const { checkpoints, getProgress, loading, config } = useTrailData();
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) {
    return <div className="p-6 flex items-center justify-center h-full"><div className="animate-pulse text-accent">Loading trail data...</div></div>;
  }

  const progress = getProgress();
  const nextCheckpoint = checkpoints.find(c => !c.unlockedAt);

  return (
    <div className="flex flex-col min-h-full bg-background relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #234B34 100%), repeating-radial-gradient(circle at center, #234B34, #234B34 1px, transparent 2px, transparent 40px)' }} />

      <header className="pt-10 pb-6 px-6 bg-white/50 backdrop-blur-sm rounded-b-3xl shadow-sm z-10 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text mb-1 flex items-center gap-2">
              <Logo className="w-12 h-12" />
              {t('pwa.dashboard.title')}
            </h1>
            <p className="text-sm font-semibold text-text-muted">
              {config?.distance}km {t('pwa.dashboard.route')} • {t('pwa.dashboard.start')} {config?.startGate === 'west' ? 'Joglo' : 'Gowok'}
            </p>
          </div>
          <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center text-primary shadow-sm border border-white">
            <Trophy size={24} />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-white/60 shadow-sm">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-text">{t('pwa.dashboard.progress')}</span>
            <span className="font-bold text-accent">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-white/60 h-3 rounded-full overflow-hidden">
            <div className="bg-accent h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress.percentage}%` }} />
          </div>
          <div className="mt-3 text-xs text-text-muted flex justify-between">
            <span>{progress.unlocked} / {progress.total} {t('pwa.dashboard.checkpoints')}</span>
            {progress.percentage === 100 && (
              <button onClick={() => navigate('/app/sync')} className="text-accent font-bold underline">
                {t('pwa.dashboard.syncData')}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 pb-12 z-10 relative">
        <h2 className="font-bold text-lg text-text mb-6">{t('pwa.dashboard.yourPath')}</h2>
        
        <div className="flex flex-col gap-0 relative">
          <div className="absolute left-6 top-6 bottom-12 w-[2px] bg-card-hover -z-10" />

          {checkpoints.map((cp, index) => {
            const isUnlocked = !!cp.unlockedAt;
            const isNext = nextCheckpoint?.id === cp.id;

            return (
              <div key={cp.id} className={cn("flex gap-4 relative pb-8", isUnlocked ? "opacity-100" : "opacity-60")}>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border-4 border-background shrink-0 shadow-sm transition-colors duration-300", isUnlocked ? "bg-accent text-white" : isNext ? "bg-white border-accent text-accent animate-pulse" : "bg-card text-text-muted")}>
                  {isUnlocked ? <MapPin size={20} /> : <span className="font-bold">{index + 1}</span>}
                </div>

                <div className={cn("bg-white p-4 rounded-2xl flex-1 shadow-sm border transition-all duration-200", isNext ? "border-accent shadow-md cursor-pointer hover:bg-card/30" : "border-gray-100", isUnlocked ? "" : "grayscale")} onClick={() => isNext && navigate('/app/scan')}>
                  <h3 className="font-bold text-text mb-1">{t(`pwa.waypoints.${cp.id}.name`)}</h3>
                  <p className="text-xs text-text-muted line-clamp-2">{isUnlocked ? t(`pwa.waypoints.${cp.id}.desc`) : t('pwa.dashboard.unknown')}</p>
                  
                  {isNext && (
                    <div className="mt-3 flex items-center text-xs font-bold text-accent">
                      {t('pwa.dashboard.scanToUnlock')} <ChevronRight size={14} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
