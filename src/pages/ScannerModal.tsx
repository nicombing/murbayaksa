import { useState, useEffect } from 'react';
import { useTrailData } from '../hooks/useTrailData';
import { useNavigate } from 'react-router-dom';
import { X, ScanLine, CheckCircle2 } from 'lucide-react';
import { cn } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const ScannerModal = () => {
  const { checkpoints, unlockCheckpoint } = useTrailData();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(true);
  const [success, setSuccess] = useState(false);
  
  const nextCheckpoint = checkpoints.find(c => !c.unlockedAt);

  useEffect(() => {
    if (scanning && nextCheckpoint) {
      const timer = setTimeout(() => handleUnlock(), 3000);
      return () => clearTimeout(timer);
    }
  }, [scanning, nextCheckpoint]);

  const handleUnlock = async () => {
    if (!nextCheckpoint) return;
    setScanning(false);
    setSuccess(true);
    await unlockCheckpoint(nextCheckpoint.id);
    setTimeout(() => navigate('/app/dashboard'), 2500);
  };

  if (!nextCheckpoint) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-background text-center">
        <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center text-accent mb-6 shadow-md">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">{t('pwa.scanner.completedTitle')}</h2>
        <p className="text-text-muted mb-8">{t('pwa.scanner.completedDesc')}</p>
        <button onClick={() => navigate('/app/sync')} className="bg-accent text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-accent-hover transition-colors w-full max-w-xs">
          {t('pwa.scanner.btnSync')}
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-black relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-white font-bold text-lg">{t('pwa.scanner.title')}</h2>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/30 transition">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {scanning && (
          <div className="absolute inset-x-12 h-64 border-2 border-white/30 rounded-2xl overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent shadow-[0_0_15px_rgba(200,106,81,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanLine size={48} className="text-white/50" />
            </div>
          </div>
        )}

        <div className={cn("absolute inset-0 flex flex-col items-center justify-center bg-primary/90 backdrop-blur-md transition-opacity duration-500 z-30 px-6 text-center", success ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-accent mb-6 animate-[bounce_1s_ease-in-out]">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{t('pwa.scanner.unlocked')}</h2>
          <p className="text-white/80 text-lg">{t(`pwa.waypoints.${nextCheckpoint.id}.name`)}</p>
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 p-6 z-20 text-center">
        <p className="text-white/80 bg-black/50 backdrop-blur-md py-3 px-6 rounded-xl inline-block">
          {scanning ? t('pwa.scanner.instructionScan') : t('pwa.scanner.instructionSaved')}
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(256px); }
        }
      `}</style>
    </div>
  );
};

export default ScannerModal;
