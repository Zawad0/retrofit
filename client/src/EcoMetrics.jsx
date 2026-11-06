import { useEffect, useState } from 'react';
import { API_BASE } from './api.js';

export default function EcoMetrics({ scope = 'global' }) {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const personal = scope === 'me';
    const token = localStorage.getItem('token');
    if (personal && !token) return;
    fetch(`${API_BASE}/eco-impact${personal ? '/me' : ''}`, { headers: personal ? { Authorization: `Bearer ${token}` } : {} })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Unable to load impact.'); return data.metrics; })
      .then(setMetrics).catch((err) => setError(err.message));
  }, [scope]);

  return <section className={`eco-metrics ${scope === 'me' ? 'eco-metrics-personal' : ''}`} aria-label="RetroFit environmental impact">
    <div className="eco-copy"><span className="eco-eyebrow">FASHION THAT GOES FURTHER</span><h2>{scope === 'me' ? 'Your rewear impact' : 'Good finds. Lighter footprint.'}</h2><p>{scope === 'me' ? 'Every listed or purchased pre-loved piece helps keep clothing in use.' : 'Every pre-loved piece listed or purchased helps keep clothing in use.'}</p></div>
    {error ? <p className="eco-note">Impact totals are temporarily unavailable.</p> : <div className="eco-stats"><div><strong>{metrics ? Number(metrics.waterLiters).toLocaleString() : '—'}</strong><span>liters of water saved</span></div><div><strong>{metrics ? Number(metrics.co2Kg).toLocaleString() : '—'} kg</strong><span>CO2 emissions avoided</span></div><small>Estimated at {metrics?.formula.waterLitersPerItem ?? 2700} L water and {metrics?.formula.co2KgPerItem ?? 3} kg CO2 per rewear.</small></div>}
  </section>;
}
