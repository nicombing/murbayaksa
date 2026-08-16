import { useState } from 'react';
import { RefreshCcw, Wifi, CheckCircle2 } from 'lucide-react';
import { useTrailData } from '../hooks/useTrailData';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SyncScreen = () => {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const { resetProgress } = useTrailData();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
    }, 3000);
  };

  const handleRestart = async () => {
    await resetProgress();
    navigate('/app/setup');
  };

  return (
    <div className="flex flex-col min-h-full bg-background p-6 items-center justify-center text-center">
      {!syncing && !synced && (
        <>
          <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center text-accent mb-8 shadow-lg border border-white">
            <Wifi size={48} />
          </div>
          <h2 className="text-3xl font-bold text-text mb-4">{t('pwa.sync.readyTitle')}</h2>
          <p className="text-text-muted mb-12 max-w-xs">{t('pwa.sync.readyDesc')}</p>
          <button onClick={handleSync} className="w-full max-w-xs bg-accent text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-accent-hover">
            <RefreshCcw size={20} /> {t('pwa.sync.btnStart')}
          </button>
        </>
      )}

      {syncing && (
        <>
          <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center text-accent mb-8 shadow-lg border border-white relative">
            <RefreshCcw size={48} className="animate-spin" />
            <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <h2 className="text-2xl font-bold text-text mb-4 animate-pulse">{t('pwa.sync.syncingTitle')}</h2>
          <p className="text-text-muted max-w-xs">{t('pwa.sync.syncingDesc')}</p>
        </>
      )}

      {synced && (
        <div className="animate-[fade-in_0.5s_ease-out]">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white mb-8 shadow-lg mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-text mb-4">{t('pwa.sync.successTitle')}</h2>
          <p className="text-text-muted mb-12 max-w-xs">{t('pwa.sync.successDesc')}</p>
          <button onClick={handleRestart} className="w-full max-w-xs border-2 border-primary text-primary font-bold py-4 rounded-xl shadow-sm flex items-center justify-center transition-all hover:bg-primary hover:text-white">
            {t('pwa.sync.btnNew')}
          </button>
        </div>
      )}
    </div>
  );
};

export default SyncScreen;
