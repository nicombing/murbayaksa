import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom';
import { Map, Scan, Library as LibraryIcon } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTrailData } from '../hooks/useTrailData';
import { useLanguage } from '../contexts/LanguageContext';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Layout = () => {
  const location = useLocation();
  const isScannerRoute = location.pathname.includes('/scan');
  const { config, loading } = useTrailData();
  const { t } = useLanguage();

  if (!loading && !config) {
    return <Navigate to="/app/setup" replace />;
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center w-full">
      <div className="w-full max-w-[480px] bg-background min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Main Content Area */}
        <main className={cn("flex-1 overflow-y-auto no-scrollbar pb-24 transition-all duration-300", isScannerRoute ? "bg-black" : "bg-background")}>
          <Outlet />
        </main>

        {/* Floating Bottom Navigation */}
        <nav className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 flex items-center justify-around p-3 z-50">
          <NavLink 
            to="/app/dashboard" 
            className={({isActive}) => cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors duration-200 cursor-pointer",
              isActive ? "text-accent" : "text-text-muted hover:bg-card-hover/30"
            )}
          >
            <Map size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('pwa.nav.trail')}</span>
          </NavLink>
          
          <NavLink 
            to="/app/scan" 
            className={({isActive}) => cn(
              "flex flex-col items-center gap-1 p-4 rounded-full -mt-8 shadow-md transition-transform hover:scale-105 duration-200 cursor-pointer",
              isActive ? "bg-accent text-white" : "bg-primary text-white"
            )}
          >
            <Scan size={28} strokeWidth={2.5} />
          </NavLink>
          
          <NavLink 
            to="/app/library" 
            className={({isActive}) => cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors duration-200 cursor-pointer",
              isActive ? "text-accent" : "text-text-muted hover:bg-card-hover/30"
            )}
          >
            <LibraryIcon size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('pwa.nav.library')}</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
