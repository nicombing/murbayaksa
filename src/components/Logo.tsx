import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  withText?: boolean;
  withBackground?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  withText = false, 
  withBackground = false,
  ...props 
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" {...props}>
      {/* Background: Soft Cream */}
      {withBackground && <rect width="400" height="400" fill="#F4F1EA" />}

      {/* Garis Topografi 4 (Paling bawah/terluar) */}
      <path d="M 10 295 C 65 295 85 230 130 230 L 160 230 C 175 230 180 255 190 255 L 210 255 C 220 255 225 230 240 230 L 270 230 C 315 230 335 295 390 295" 
            fill="none" stroke="#4A7059" strokeWidth="2" strokeLinecap="round" />

      {/* Garis Topografi 3 */}
      <path d="M 20 280 C 70 280 90 215 130 215 L 160 215 C 175 215 180 240 190 240 L 210 240 C 220 240 225 215 240 215 L 270 215 C 310 215 330 280 380 280" 
            fill="none" stroke="#2C4C3B" strokeWidth="4" strokeLinecap="round" />

      {/* Garis Topografi 2 */}
      <path d="M 30 265 C 75 265 95 200 130 200 L 160 200 C 175 200 180 225 190 225 L 210 225 C 220 225 225 200 240 200 L 270 200 C 305 200 325 265 370 265" 
            fill="none" stroke="#4A7059" strokeWidth="2" strokeLinecap="round" />

      {/* Garis Topografi 1 (Paling atas/tebal) */}
      <path d="M 40 250 C 80 250 100 185 130 185 L 160 185 C 175 185 180 210 190 210 L 210 210 C 220 210 225 185 240 185 L 270 185 C 300 185 320 250 360 250" 
            fill="none" stroke="#2C4C3B" strokeWidth="5" strokeLinecap="round" />

      {/* GPS Pin */}
      <path d="M 200 145 A 15 15 0 0 0 185 160 C 185 180 200 205 200 205 C 200 205 215 180 215 160 A 15 15 0 0 0 200 145 Z" 
            fill="#D95F43" />
      <circle cx="200" cy="160" r="5" fill="#F4F1EA" />

      {/* Tipografi / Teks */}
      {withText && (
        <>
          <text x="200" y="335" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="28" fontWeight="900" fill="#2C4C3B" textAnchor="middle" letterSpacing="3">
              MURBAYAKSA
          </text>
          <text x="200" y="360" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="13" fontWeight="bold" fill="#D95F43" textAnchor="middle" letterSpacing="8">
              TRACK
          </text>
        </>
      )}
    </svg>
  );
};
