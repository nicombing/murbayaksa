import { useState, useEffect } from 'react';
import localforage from 'localforage';

export type Checkpoint = {
  id: string;
  name?: string;
  description?: string;
  unlockedAt?: number;
  type: 'flora' | 'fauna' | 'landmark' | 'gate';
  icon: string;
  color: string;
};

export type TrailConfig = {
  startGate: 'west' | 'east';
  distance: 6 | 12 | 24 | 112;
};

const BASE_WAYPOINTS: Omit<Checkpoint, 'unlockedAt' | 'name' | 'description'>[] = [
  { id: 'wg', type: 'gate', icon: 'Mountain', color: '#C86A51' },
  { id: 'p1', type: 'landmark', icon: 'MapPin', color: '#E8EFE8' },
  { id: 'p2', type: 'landmark', icon: 'TreePine', color: '#D4E0D4' },
  { id: 'p3', type: 'landmark', icon: 'Mountain', color: '#E8EFE8' },
  { id: 'p4', type: 'landmark', icon: 'MapPin', color: '#D4E0D4' },
  { id: 'p5', type: 'landmark', icon: 'MapPin', color: '#FDE4D0' },
  { id: 'p6', type: 'landmark', icon: 'Leaf', color: '#E8EFE8' },
  { id: 'p7', type: 'landmark', icon: 'Mountain', color: '#C86A51' },
  { id: 'p8', type: 'flora', icon: 'Leaf', color: '#D4E0D4' },
  { id: 'p9', type: 'landmark', icon: 'TreePine', color: '#E8EFE8' },
  { id: 'eg', type: 'gate', icon: 'Mountain', color: '#C86A51' },
];

export function useTrailData() {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [config, setConfig] = useState<TrailConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from LocalStorage
  useEffect(() => {
    const initData = async () => {
      try {
        const storedConfig = await localforage.getItem<TrailConfig>('murbayaksa_config');
        const storedCheckpoints = await localforage.getItem<Checkpoint[]>('murbayaksa_checkpoints');
        
        if (storedConfig && storedCheckpoints) {
          setConfig(storedConfig);
          setCheckpoints(storedCheckpoints);
        }
      } catch (err) {
        console.error('Failed to load local data', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const configureTrail = async (newConfig: TrailConfig) => {
    let route = [...BASE_WAYPOINTS];
    
    if (newConfig.startGate === 'east') {
      route = route.reverse();
    }

    let waypointCount = 11;
    if (newConfig.distance === 6) waypointCount = 4;
    if (newConfig.distance === 12) waypointCount = 6;
    if (newConfig.distance === 24) waypointCount = 11;
    if (newConfig.distance === 112) waypointCount = 11; // Placeholder for now

    const selectedCheckpoints: Checkpoint[] = route.slice(0, waypointCount).map(wp => ({
      ...wp,
      unlockedAt: undefined
    }));

    setConfig(newConfig);
    setCheckpoints(selectedCheckpoints);
    await localforage.setItem('murbayaksa_config', newConfig);
    await localforage.setItem('murbayaksa_checkpoints', selectedCheckpoints);
  };

  const unlockCheckpoint = async (id: string) => {
    const updated = checkpoints.map(cp => 
      cp.id === id && !cp.unlockedAt ? { ...cp, unlockedAt: Date.now() } : cp
    );
    setCheckpoints(updated);
    await localforage.setItem('murbayaksa_checkpoints', updated);
    return updated.find(c => c.id === id);
  };

  const getProgress = () => {
    if (!checkpoints.length) return { unlocked: 0, total: 0, percentage: 0 };
    const unlocked = checkpoints.filter(cp => cp.unlockedAt).length;
    return {
      unlocked,
      total: checkpoints.length,
      percentage: Math.round((unlocked / checkpoints.length) * 100)
    };
  };

  const resetProgress = async () => {
    setCheckpoints([]);
    setConfig(null);
    await localforage.removeItem('murbayaksa_config');
    await localforage.removeItem('murbayaksa_checkpoints');
  };

  return { checkpoints, config, loading, unlockCheckpoint, getProgress, resetProgress, configureTrail };
}
