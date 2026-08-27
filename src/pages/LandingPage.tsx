import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Users, Leaf, ArrowRight, ScanLine, Compass, MapPin, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from '../components/Logo';
import Lenis from 'lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const LandingPage = () => {
  const { t, lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Parallax calculations for the tracks section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans text-text overflow-x-hidden">
      
      {/* 1. Kervan Gida Style Overlay Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-start pointer-events-none">
        
        {/* Left: Logo (White, for contrast against dark hero) */}
        <div className="flex items-center gap-4 text-white font-bold text-2xl drop-shadow-md pointer-events-auto mix-blend-difference">
          <Logo className="w-16 h-16" />
          <span className="hidden md:block tracking-widest uppercase">Murbayaksa</span>
        </div>

        {/* Right: Hamburger Menu & Controls */}
        <div className="flex flex-col items-end gap-6 pointer-events-auto">
          {/* Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="group flex items-center justify-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-full border border-white/20 transition-all duration-300"
          >
            <span className="text-white uppercase tracking-[0.2em] font-bold text-sm">Menu</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
               {/* 4 dots arranged in a diamond/square, like Kervan Gida */}
               <div className="grid grid-cols-2 gap-1 group-hover:scale-110 transition-transform duration-300">
                 <div className="w-2 h-2 rounded-full border border-white group-hover:bg-white transition-colors" />
                 <div className="w-2 h-2 rounded-full border border-white group-hover:bg-white transition-colors" />
                 <div className="w-2 h-2 rounded-full border border-white group-hover:bg-white transition-colors" />
                 <div className="w-2 h-2 rounded-full border border-white group-hover:bg-white transition-colors" />
               </div>
            </div>
          </button>
        </div>
      </header>

      {/* Language Switcher Fixed Bottom Right */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex gap-2 pointer-events-auto">
         <button 
            onClick={() => setLang('id')}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${lang === 'id' ? 'bg-[#D95F43] text-white shadow-lg' : 'bg-[#EDEBEB] text-[#22252b] hover:bg-gray-300'}`}
          >
            ID
         </button>
         <button 
            onClick={() => setLang('en')}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${lang === 'en' ? 'bg-[#D95F43] text-white shadow-lg' : 'bg-[#EDEBEB] text-[#22252b] hover:bg-gray-300'}`}
          >
            EN
         </button>
      </div>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 md:right-12 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-50 group"
            >
              <X className="w-8 h-8 text-black group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Menu Left/Main Content */}
            <div className="w-full md:w-2/3 h-full pt-24 md:pt-32 px-6 md:px-24 flex flex-col justify-center pb-24">
               <nav className="flex flex-col gap-6 md:gap-10">
                 {[
                   { label: t('nav.home'), href: '#home' },
                   { label: t('nav.tracks'), href: '#tracks' },
                   { label: t('nav.challenge'), href: '#challenge' },
                   { label: t('nav.institutional'), href: '#institutional' },
                   { label: t('nav.planHike'), href: '/app/setup', isRoute: true }
                 ].map((item, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                     className="group flex items-center gap-6"
                   >
                     <div className="w-4 h-4 rounded-full border-2 border-[#D95F43] group-hover:bg-[#D95F43] transition-colors duration-300" />
                     {item.isRoute ? (
                       <Link 
                         to={item.href} 
                         className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#22252b] hover:opacity-70 transition-opacity tracking-tight"
                         onClick={() => setMenuOpen(false)}
                       >
                         {item.label}
                       </Link>
                     ) : (
                       <a 
                         href={item.href} 
                         className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#22252b] hover:opacity-70 transition-opacity tracking-tight"
                         onClick={() => setMenuOpen(false)}
                       >
                         {item.label}
                       </a>
                     )}
                   </motion.div>
                 ))}
               </nav>

               <div className="mt-auto pt-16 flex items-center gap-8 text-[#22252b]/60 font-bold">
                 <a href="#social" className="hover:text-[#22252b] transition-colors">IG</a>
                 <a href="#social" className="hover:text-[#22252b] transition-colors">IN</a>
                 <a href="#social" className="hover:text-[#22252b] transition-colors">FB</a>
               </div>
            </div>

            {/* Menu Right/Secondary Content */}
            <div className="hidden md:flex w-1/3 bg-gray-50 h-full flex-col justify-center p-16 border-l border-gray-200">
               <h3 className="text-xl font-bold text-[#22252b] mb-8">{t('footer.gates')}</h3>
               <ul className="space-y-6 text-lg text-gray-500">
                 <li><strong className="text-gray-900">{t('footer.eastGate')}</strong> Gowok</li>
                 <li><strong className="text-gray-900">{t('footer.westGate')}</strong> Joglo</li>
               </ul>

               <div className="w-full h-px bg-gray-200 my-12" />
               
               <h3 className="text-xl font-bold text-[#22252b] mb-8">{t('footer.links')}</h3>
               <ul className="space-y-4 text-lg text-gray-500">
                 <li><a href="#contact" className="hover:text-gray-900 transition-colors" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</a></li>
               </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section Slider (Full Screen) */}
      <section id="home" className="relative h-screen w-full bg-black">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true, renderBullet: (index, className) => `<span class="${className} custom-bullet">0${index + 1}</span>` }}
          className="h-full w-full"
          loop={true}
          speed={1500}
        >
          {/* Slide 1 */}
          <SwiperSlide>
             <div className="absolute inset-0 bg-cover bg-center transform scale-105 animate-[slowZoom_20s_ease-out_infinite]" style={{ backgroundImage: 'url(/hero.png)' }} />
             <div className="absolute inset-0 bg-black/40" />
             <div className="absolute bottom-24 left-6 md:left-24 z-10 w-full max-w-4xl pr-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
                  className="text-5xl md:text-[5rem] font-bold text-white leading-[1.1] tracking-tight mb-8"
                >
                  {t('hero.title1')} <span className="text-[#C86A51]">{t('hero.title2')}</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
                  className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed mb-10"
                >
                  {t('hero.desc')}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
                  <Link to="/app/setup" className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-6 py-3 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-white hover:text-black transition-all duration-300">
                    {t('hero.btnExplore')}
                  </Link>
                </motion.div>
             </div>
          </SwiperSlide>

          {/* Additional Slides can be added here mimicking Kervan Gida's multiple banners */}
          <SwiperSlide>
             <div className="absolute inset-0 bg-cover bg-center transform scale-105" style={{ backgroundImage: 'url(/barcode_tree.jpg)' }} />
             <div className="absolute inset-0 bg-black/50" />
             <div className="absolute bottom-24 left-6 md:left-24 z-10 w-full max-w-4xl pr-6">
                <h1 className="text-5xl md:text-[5rem] font-bold text-white leading-[1.1] tracking-tight mb-8">
                  {t('challenge.title')}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed mb-10">
                  {t('challenge.desc')}
                </p>
                <Link to="/app/setup" className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-6 py-3 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-white hover:text-black transition-all duration-300">
                  {t('challenge.btnTry')}
                </Link>
             </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* 3. The Tracks (Parallax Layout) */}
      <section id="tracks" className="relative py-32 px-6 bg-[#FCFAF8] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 justify-between items-start mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-[#2C4C3B] max-w-xl leading-tight tracking-tight"
            >
              {t('tracks.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-gray-600 max-w-md font-light leading-relaxed md:mt-6"
            >
              {t('tracks.subtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { dist: '6km', key: 't6', icon: <Leaf className="text-white" size={32} />, color: 'bg-[#4A7059]' },
              { dist: '12km', key: 't12', icon: <MapPin className="text-white" size={32} />, color: 'bg-[#2C4C3B]' },
              { dist: '24km', key: 't24', icon: <Compass className="text-white" size={32} />, color: 'bg-[#C86A51]' },
              { dist: '112km', key: 't112', icon: <Shield className="text-white" size={32} />, color: 'bg-[#1E3025]' },
            ].map((track, i) => (
              <motion.div 
                key={track.dist} 
                initial={{ opacity: 0, y: 100 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }} 
                transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                style={{ y: i % 2 === 0 ? yParallax : 0 }} // Staggered parallax effect on odds/evens
                className="group bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col h-full relative overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full ${track.color} opacity-5 group-hover:scale-150 transition-transform duration-700`} />
                
                <div className={`${track.color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-8 transform group-hover:-translate-y-2 transition-transform duration-500`}>
                  {track.icon}
                </div>
                <h3 className="text-5xl font-black text-[#2C4C3B] mb-4 tracking-tighter">{track.dist}</h3>
                <h4 className="font-bold text-2xl text-gray-900 mb-4">{t(`tracks.${track.key}.title`)}</h4>
                <p className="text-gray-500 text-lg leading-relaxed flex-1">{t(`tracks.${track.key}.desc`)}</p>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-bold text-[#C86A51]">Explore</span>
                  <ArrowRight className="text-[#C86A51]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Digital Challenge (Minimal / Editorial Layout) */}
      <section id="challenge" className="relative py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            {/* Background Blob/Shape */}
            <div className="absolute inset-0 bg-[#E8EFE8] rounded-full blur-3xl opacity-50 transform -scale-x-100" />
            
            {/* Highly Polished Mobile Mockup */}
            <div className="w-[300px] h-[620px] sm:w-[340px] sm:h-[700px] bg-white rounded-[3.5rem] border-[12px] border-[#22252b] shadow-2xl relative overflow-hidden flex flex-col group z-10">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-2 inset-x-0 h-6 bg-[#22252b] rounded-full w-24 sm:w-32 mx-auto z-30" />

              {/* App Content */}
              <div className="flex-1 flex flex-col relative z-10 pt-14 sm:pt-16 pb-6 sm:pb-8 px-5 sm:px-6 bg-[#FCFAF8]">
                
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Checkpoint</h4>
                    <h3 className="text-lg sm:text-xl font-bold text-[#2C4C3B] leading-tight">Pos 1: Geger Sabuk</h3>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 text-[#C86A51]">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* Scanner Viewfinder */}
                <div className="w-full h-[260px] sm:h-[320px] bg-[#22252b] rounded-[1.5rem] sm:rounded-[2rem] mb-4 sm:mb-6 relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity scale-110" style={{ backgroundImage: 'url(/barcode_tree.jpg)' }}></div>
                  <div className="absolute inset-6 border-[3px] border-dashed border-white/30 rounded-[1.5rem]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/40 p-5 rounded-full backdrop-blur-md">
                    <ScanLine size={48} className="animate-pulse" />
                  </div>
                  <div className="absolute left-0 right-0 h-1 bg-[#C86A51] shadow-[0_0_20px_rgba(200,106,81,1)] animate-[mockupScan_3s_ease-in-out_infinite]" />
                </div>

                <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 mt-auto relative">
                  <div className="absolute -top-4 -right-3 bg-[#C86A51] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                    +50 XP
                  </div>
                  <h4 className="font-bold text-[#2C4C3B] mb-2 text-base">Discovered: Jati Tree</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">A towering hardwood native to the Tangkuban Perahu buffer zone.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full lg:w-1/2">
            <span className="text-[#C86A51] font-bold tracking-[0.2em] uppercase text-sm mb-6 block">{t('challenge.badge')}</span>
            <h2 className="text-5xl md:text-7xl font-bold text-[#22252b] mb-8 leading-[1.1] tracking-tight">{t('challenge.title')}</h2>
            <p className="text-2xl text-gray-500 mb-12 font-light leading-relaxed">
              {t('challenge.desc')}
            </p>
            <ul className="space-y-8">
              {['f1', 'f2', 'f3', 'f4'].map((key, idx) => (
                <motion.li 
                  key={key} 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex gap-6 items-start"
                >
                  <div className="mt-1 w-12 h-12 rounded-full bg-[#E8EFE8] flex items-center justify-center shrink-0">
                    <span className="font-bold text-[#2C4C3B]">0{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#22252b] text-xl mb-2">{t(`challenge.${key}.title`)}</h4>
                    <p className="text-gray-500 leading-relaxed">{t(`challenge.${key}.desc`)}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 5. Institutional (Giant Typography & Clean Lines) */}
      <section id="institutional" className="py-40 px-6 bg-[#2C4C3B] text-white overflow-hidden relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b634e] rounded-full blur-[100px] opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1a2d23] rounded-full blur-[100px] opacity-50" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <Users size={64} className="mx-auto text-[#C86A51] mb-10" />
            <h2 className="text-5xl md:text-[6rem] font-black mb-8 leading-none tracking-tighter drop-shadow-2xl">{t('institutional.title')}</h2>
            <h3 className="text-3xl md:text-4xl text-[#E8EFE8] mb-12 font-light tracking-tight">{t('institutional.subtitle')}</h3>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-16 font-light" dangerouslySetInnerHTML={{ __html: t('institutional.desc').replace('International Schools', '<strong class="text-white">International Schools</strong>').replace('State Institutions / Academies', '<strong class="text-white">State Institutions / Academies</strong>') }} />
            
            <button className="bg-transparent border-2 border-[#C86A51] text-[#C86A51] hover:bg-[#C86A51] hover:text-white font-bold px-8 py-4 md:px-12 md:py-6 rounded-full text-lg md:text-xl transition-all duration-300">
              {t('institutional.btnRequest')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="contact" className="bg-[#121212] pt-24 pb-12 px-6 text-white/80">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div>
            <div className="flex items-center gap-4 text-white font-bold text-3xl mb-8">
              <Logo className="w-16 h-16" withBackground={false} />
              Murbayaksa
            </div>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {t('footer.desc')}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-xl mb-8">{t('footer.gates')}</h4>
            <ul className="space-y-4 text-lg text-white/60">
              <li><strong className="text-white">East Gate:</strong> Gowok</li>
              <li><strong className="text-white">West Gate:</strong> Joglo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-xl mb-8">{t('footer.links')}</h4>
            <ul className="space-y-4 text-lg text-white/60">
              <li><a href="#tracks" className="hover:text-white transition-colors">{t('nav.tracks')}</a></li>
              <li><a href="#challenge" className="hover:text-white transition-colors">{t('nav.challenge')}</a></li>
              <li><a href="#institutional" className="hover:text-white transition-colors">{t('nav.institutional')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-xl mb-8">{t('footer.legal')}</h4>
            <p className="text-sm text-white/60 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: t('footer.legalText').replace('Lintas Alam Murbayaksa Kencana Nusantara', '<strong class="text-white">Lintas Alam Murbayaksa Kencana Nusantara</strong>') }} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/40">© 2026 Lintas Alam Murbayaksa Kencana Nusantara. {t('footer.rights')} | {t('footer.developedBy')}</p>
          <div className="flex gap-6 font-bold">
            <a href="#" className="text-white/40 hover:text-white transition-colors">IG</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">FB</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">IN</a>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes mockupScan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .custom-bullet {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          font-weight: bold;
          opacity: 1;
          margin: 0 8px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #C86A51;
          color: white;
          transform: scale(1.2);
        }
        .swiper-pagination {
          bottom: 40px !important;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
