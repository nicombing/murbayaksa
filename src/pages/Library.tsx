import { useTrailData } from '../hooks/useTrailData';
import { BookOpen, Leaf, Bird, Mountain, Droplets, TreePine } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf />,
  Bird: <Bird />,
  Mountain: <Mountain />,
  Droplets: <Droplets />,
  TreePine: <TreePine />
};

const Library = () => {
  const { checkpoints, loading } = useTrailData();
  const { t } = useLanguage();

  if (loading) return null;

  const unlockedItems = checkpoints.filter(c => c.unlockedAt);

  return (
    <div className="flex flex-col min-h-full bg-background">
      <header className="pt-10 pb-6 px-6 bg-card rounded-b-3xl shadow-sm mb-6 border-b border-white">
        <h1 className="text-2xl font-bold text-text mb-2 flex items-center gap-2">
          <BookOpen className="text-primary" />
          {t('pwa.library.title')}
        </h1>
        <p className="text-sm text-text-muted">
          {t('pwa.library.discovered')} {unlockedItems.length} {t('pwa.library.species')}
        </p>
      </header>

      <div className="px-6 pb-24 grid grid-cols-2 gap-4">
        {checkpoints.map(cp => {
          const isUnlocked = !!cp.unlockedAt;
          return (
            <div key={cp.id} className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all shadow-sm border ${isUnlocked ? 'bg-white border-white/60 hover:-translate-y-1 hover:shadow-md' : 'bg-gray-100 border-gray-200 opacity-60 grayscale'}`}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner border border-black/5" style={{ backgroundColor: isUnlocked ? cp.color : '#e5e7eb', color: isUnlocked ? '#234B34' : '#9ca3af' }}>
                {iconMap[cp.icon] || <Leaf />}
              </div>
              <h3 className="font-bold text-sm text-text mb-1 line-clamp-1">
                {isUnlocked ? t(`pwa.waypoints.${cp.id}.name`) : t('pwa.library.unknown')}
              </h3>
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted bg-background px-2 py-1 rounded-md">
                {cp.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
