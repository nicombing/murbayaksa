import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map, Shield, Users, Leaf, ArrowRight, ScanLine, Compass, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from '../components/Logo';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text overflow-x-hidden">
      
      {/* 1. Sticky Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FCFAF8]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Logo className="w-14 h-14" />
            Murbayaksa
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold">
            <a href="#home" className="hover:text-accent transition-colors">{t('nav.home')}</a>
            <a href="#tracks" className="hover:text-accent transition-colors">{t('nav.tracks')}</a>
            <a href="#challenge" className="hover:text-accent transition-colors">{t('nav.challenge')}</a>
            <a href="#institutional" className="hover:text-accent transition-colors">{t('nav.institutional')}</a>
            <a href="#contact" className="hover:text-accent transition-colors">{t('nav.contact')}</a>
            <Link to="/app/setup" className="bg-accent text-white px-6 py-2.5 rounded-full hover:bg-accent-hover transition-colors shadow-sm">
              {t('nav.planHike')}
            </Link>
            
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1 bg-white/50 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-white transition-colors ml-4 shadow-sm"
            >
              <Globe size={16} className="text-primary" />
              <span className="font-bold text-primary">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex items-center justify-center min-h-[90vh]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark gradient overlay to make white text pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-white/90 font-bold tracking-widest uppercase text-sm mb-4 block drop-shadow-md">{t('hero.subtitle')}</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t('hero.title1')} <span className="text-accent drop-shadow-lg">{t('hero.title2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
            {t('hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tracks" className="bg-accent text-white font-bold px-8 py-4 rounded-full shadow-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 border border-white/20">
              {t('hero.btnExplore')} <Compass size={20} />
            </a>
            <Link to="/app/setup" className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm shadow-xl">
              {t('hero.btnDownload')} <Map size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. The Tracks */}
      <section id="tracks" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">{t('tracks.title')}</h2>
            <p className="text-text-muted max-w-2xl mx-auto">{t('tracks.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { dist: '6km', key: 't6', icon: <Leaf className="text-accent" size={32} /> },
              { dist: '12km', key: 't12', icon: <MapPin className="text-accent" size={32} /> },
              { dist: '24km', key: 't24', icon: <Compass className="text-accent" size={32} /> },
              { dist: '112km', key: 't112', icon: <Shield className="text-accent" size={32} /> },
            ].map((track, i) => (
              <motion.div 
                key={track.dist} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-white/50"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6">
                  {track.icon}
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{track.dist}</h3>
                <h4 className="font-bold text-text mb-2">{t(`tracks.${track.key}.title`)}</h4>
                <p className="text-text-muted text-sm">{t(`tracks.${track.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Digital Challenge */}
      <section id="challenge" className="py-24 px-6 bg-[#E8EFE8]/40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            {/* Highly Polished Mobile Mockup */}
            <div className="w-[320px] h-[650px] bg-[#F4F1EA] rounded-[3rem] border-8 border-gray-900 shadow-2xl relative overflow-hidden flex flex-col group">
              
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-3xl w-40 mx-auto z-30 flex items-end justify-center pb-1.5">
                 <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
              </div>

              {/* Status Bar */}
              <div className="absolute top-0 inset-x-0 h-12 z-20 flex justify-between items-center px-6 pt-2 text-xs font-bold text-gray-800">
                <span>9:41</span>
                <div className="flex gap-1.5 items-center opacity-80">
                  <div className="w-3 h-3 rounded-full border-[1.5px] border-gray-800"></div>
                  <div className="w-4 h-2.5 bg-gray-800 rounded-sm"></div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 flex flex-col relative z-10 pt-14 pb-6 px-5">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h4 className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">Checkpoint</h4>
                    <h3 className="text-lg font-bold text-primary leading-tight">Pos 1: Geger Sabuk</h3>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border-2 border-accent text-accent">
                    <Leaf size={18} />
                  </div>
                </div>

                {/* Scanner Viewfinder */}
                <div className="w-full h-[280px] bg-gray-900 rounded-3xl mb-5 relative overflow-hidden shadow-inner border-4 border-white">
                  {/* Simulated Camera Feed */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity scale-110" style={{ backgroundImage: 'url(/barcode_tree.jpg)' }}></div>
                  
                  {/* Scanner UI */}
                  <div className="absolute inset-4 border-2 border-dashed border-white/40 rounded-2xl"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90 bg-black/20 p-4 rounded-full backdrop-blur-sm">
                    <ScanLine size={40} className="animate-pulse" />
                  </div>

                  {/* Scanning Laser */}
                  <div className="absolute left-0 right-0 h-0.5 bg-accent shadow-[0_0_12px_rgba(200,106,81,1)] animate-[mockupScan_3s_ease-in-out_infinite]" />
                </div>

                {/* Info Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-auto relative">
                  <div className="absolute -top-3 -right-2 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                    +50 XP
                  </div>
                  <h4 className="font-bold text-primary mb-1 text-sm">Discovered: Jati Tree</h4>
                  <p className="text-xs text-text-muted leading-relaxed">A towering hardwood native to the Tangkuban Perahu buffer zone.</p>
                </div>

                {/* Bottom Button */}
                <div className="mt-4">
                  <div className="bg-accent text-white text-center py-4 rounded-2xl font-bold shadow-lg transition-transform transform group-hover:scale-[1.02] group-hover:bg-accent-hover cursor-pointer flex justify-center items-center gap-2">
                    {t('pwa.scanner.unlocked')} <ArrowRight size={16} />
                  </div>
                </div>
              </div>
              
              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 inset-x-0 flex justify-center z-20">
                <div className="w-32 h-1 bg-gray-900/20 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">{t('challenge.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">{t('challenge.title')}</h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              {t('challenge.desc')}
            </p>
            <ul className="space-y-6">
              {['f1', 'f2', 'f3', 'f4'].map((key) => (
                <li key={key} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-lg">{t(`challenge.${key}.title`)}</h4>
                    <p className="text-text-muted">{t(`challenge.${key}.desc`)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/app/setup" className="mt-10 inline-flex items-center gap-2 font-bold text-accent hover:text-accent-hover transition-colors">
              {t('challenge.btnTry')} <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. Institutional */}
      <section id="institutional" className="py-24 px-6 bg-[#234B34] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Users size={48} className="mx-auto text-[#C86A51] mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('institutional.title')}</h2>
            <h3 className="text-2xl text-[#E8EFE8] mb-8 font-light">{t('institutional.subtitle')}</h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: t('institutional.desc').replace('International Schools', '<strong>International Schools</strong>').replace('State Institutions / Academies', '<strong>State Institutions / Academies</strong>') }} />
            <button className="bg-[#C86A51] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#B35E47] transition-colors">
              {t('institutional.btnRequest')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="contact" className="bg-white pt-16 pb-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xl mb-4">
              <Logo className="w-12 h-12" />
              Murbayaksa
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-text mb-4">{t('footer.gates')}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><strong>{t('footer.eastGate')}</strong> Gowok</li>
              <li><strong>{t('footer.westGate')}</strong> Joglo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#tracks" className="hover:text-accent">{t('nav.tracks')}</a></li>
              <li><a href="#challenge" className="hover:text-accent">{t('nav.challenge')}</a></li>
              <li><a href="#institutional" className="hover:text-accent">{t('nav.institutional')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text mb-4">{t('footer.legal')}</h4>
            <p className="text-xs text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: t('footer.legalText').replace('Lintas Alam Murbayaksa Kencana Nusantara', '<strong>Lintas Alam Murbayaksa Kencana Nusantara</strong>') }} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">© 2026 Lintas Alam Murbayaksa Kencana Nusantara. {t('footer.rights')} | {t('footer.developedBy')}</p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-primary text-xs font-bold">IG</span>
            <span className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-primary text-xs font-bold">FB</span>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes mockupScan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
