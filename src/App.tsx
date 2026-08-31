import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ScannerModal from './pages/ScannerModal';
import Library from './pages/Library';
import SyncScreen from './pages/SyncScreen';
import Onboarding from './pages/Onboarding';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <Routes>
        {/* Redirect root to App */}
        <Route path="/" element={<Navigate to="/app" replace />} />

        {/* PWA Trail Tracker */}
        <Route path="/app/setup" element={
          <div className="min-h-screen bg-gray-100 flex justify-center w-full">
            <div className="w-full max-w-[480px] bg-background min-h-screen shadow-2xl relative overflow-y-auto no-scrollbar">
              <Onboarding />
            </div>
          </div>
        } />
        
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scan" element={<ScannerModal />} />
          <Route path="library" element={<Library />} />
          <Route path="sync" element={<SyncScreen />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
