import { useState, useEffect, useRef } from 'react';
import { useTrailData } from '../hooks/useTrailData';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2 } from 'lucide-react';
import { cn } from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Html5Qrcode } from 'html5-qrcode';

const ScannerModal = () => {
  const { checkpoints, unlockCheckpoint } = useTrailData();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [scannedCheckpoint, setScannedCheckpoint] = useState<any>(null);
  
  const nextCheckpoint = checkpoints.find(c => !c.unlockedAt);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleUnlock = async (scannedId: string) => {
    const cp = checkpoints.find(c => c.id === scannedId);
    if (!cp) return;
    setScannedCheckpoint(cp);
    setScanning(false);
    setSuccess(true);
    await unlockCheckpoint(scannedId);
    setTimeout(() => navigate(`/app/pos/${scannedId}`), 2500);
  };

  useEffect(() => {
    if (scanning && nextCheckpoint) {
      scannerRef.current = new Html5Qrcode("qr-reader");
      
      scannerRef.current.start(
        { facingMode: "environment" }, 
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // Check if the scanned QR code matches the expected next checkpoint
          if (decodedText === nextCheckpoint.id) {
            if (scannerRef.current?.isScanning) {
              scannerRef.current.stop().then(() => {
                handleUnlock(decodedText);
              }).catch(console.error);
            } else {
              handleUnlock(decodedText);
            }
          } else {
            // It's a valid QR code, but not the right one!
            setErrorMsg(`Scanned: ${decodedText}. Expected: ${nextCheckpoint.id}`);
            setTimeout(() => setErrorMsg(null), 3000);
          }
        },
        () => {
          // parse errors are frequent while scanning, just ignore them
        }
      ).catch(err => {
        console.error("Error starting scanner", err);
      });

      return () => {
        if (scannerRef.current?.isScanning) {
          scannerRef.current.stop().catch(console.error);
        }
      };
    }
  }, [scanning, nextCheckpoint]);

  if (!nextCheckpoint && !success) {
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
        {/* Container for the real camera scanner */}
        <div id="qr-reader" className="absolute inset-0 w-full h-full object-cover z-0"></div>

        {/* Custom scanline overlay on top of the camera */}
        {scanning && (
          <div className="absolute inset-x-12 h-64 border-2 border-white/30 rounded-2xl overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] pointer-events-none z-10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent shadow-[0_0_15px_rgba(200,106,81,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
          </div>
        )}

        {/* Success overlay */}
        <div className={cn("absolute inset-0 flex flex-col items-center justify-center bg-primary/90 backdrop-blur-md transition-opacity duration-500 z-30 px-6 text-center", success ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-accent mb-6 animate-[bounce_1s_ease-in-out]">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{t('pwa.scanner.unlocked')}</h2>
          <p className="text-white/80 text-lg">{scannedCheckpoint ? t(`pwa.waypoints.${scannedCheckpoint.id}.name`) : ''}</p>
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 p-6 z-20 text-center flex flex-col items-center gap-4">
        {errorMsg && (
          <div className="bg-red-500/80 text-white py-2 px-4 rounded-lg backdrop-blur-md text-sm font-bold animate-pulse">
            {errorMsg}
          </div>
        )}
        <p className="text-white/80 bg-black/50 backdrop-blur-md py-3 px-6 rounded-xl inline-block">
          {scanning ? t('pwa.scanner.instructionScan') : t('pwa.scanner.instructionSaved')}
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(256px); }
        }
        /* Hide the default html5-qrcode UI elements that we don't want */
        #qr-reader {
          border: none !important;
        }
        #qr-reader__scan_region {
          background: transparent !important;
        }
        #qr-reader video {
          object-fit: cover !important;
        }
      `}</style>
    </div>
  );
};

export default ScannerModal;
