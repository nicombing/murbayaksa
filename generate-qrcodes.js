import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const waypoints = [
  { id: 'wg', name: 'West Gate - Joglo' },
  { id: 'eg', name: 'East Gate - Gowok' },
  { id: 'p1', name: 'Pos 1 - Geger Sabuk' },
  { id: 'p2', name: 'Pos 2 - Karto' },
  { id: 'p3', name: 'Pos 3 - Pasir Buntu' },
  { id: 'p4', name: 'Pos 4 - Geger Muria' },
  { id: 'p5', name: 'Pos 5 - Geger Baturenges' },
  { id: 'p6', name: 'Pos 6 - Campaka Cibedok' },
  { id: 'p7', name: 'Pos 7 - Kakatelan Kawah Purba' },
  { id: 'p8', name: 'Pos 8 - Salikur' },
  { id: 'p9', name: 'Pos 9 - Cece Logo' }
];

const outDir = path.join(process.cwd(), 'public', 'qrcodes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Generating QR Codes for Murbayaksa checkpoints...');

const promises = waypoints.map(wp => {
  const filename = path.join(outDir, `${wp.id}.png`);
  // Using the raw ID as the QR code content.
  // The scanner will read 'wg', 'p1', etc.
  return QRCode.toFile(filename, wp.id, {
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    width: 300,
    margin: 2
  }).then(() => {
    console.log(`Generated ${wp.id}.png - ${wp.name}`);
  });
});

Promise.all(promises)
  .then(() => console.log('All QR codes generated successfully!'))
  .catch(err => console.error('Error generating QR codes:', err));
