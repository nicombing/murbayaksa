import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTrailData } from '../hooks/useTrailData';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';

const PosDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { checkpoints } = useTrailData();

  const checkpoint = checkpoints.find(c => c.id === id);

  if (!checkpoint) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <p>Checkpoint not found.</p>
        <button onClick={() => navigate('/app/dashboard')} className="mt-4 text-accent font-bold">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-background relative pb-24">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #234B34 100%), repeating-radial-gradient(circle at center, #234B34, #234B34 1px, transparent 2px, transparent 40px)' }} />

      <header className="pt-6 pb-6 px-6 bg-white shadow-sm z-10 relative rounded-b-3xl flex items-center gap-4">
        <button onClick={() => navigate('/app/dashboard')} className="w-10 h-10 bg-card rounded-full flex items-center justify-center text-text hover:bg-card-hover transition">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-text">{t(`pwa.waypoints.${id}.name`)}</h1>
          <p className="text-sm font-semibold text-accent flex items-center gap-1">
            <CheckCircle2 size={14} /> {t('pwa.scanner.unlocked')}
          </p>
        </div>
      </header>

      <div className="p-6 z-10 relative flex-1 flex flex-col gap-6">
        <div className="bg-card p-6 rounded-3xl shadow-sm border border-white flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary mb-4 shadow-sm border-2 border-background">
            <BookOpen size={32} />
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">{t('pwa.pos.didYouKnow')}</h2>
          <p className="text-text-muted leading-relaxed">
            {t(`pwa.waypoints.${id}.content`)}
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <button onClick={() => navigate('/app/dashboard')} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-text pointer-events-auto transition-colors">
          {t('pwa.pos.continue')}
        </button>
      </div>
    </div>
  );
};

export default PosDetail;
