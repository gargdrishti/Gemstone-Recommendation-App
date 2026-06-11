import { useEffect, useState } from 'react';
import api from '../utils/api';
import GemCard from '../components/GemCard';

const PLANETS = ['All', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Venus & Neptune', 'Sun & Mars'];

export default function Gems() {
  const [gems, setGems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [planet, setPlanet] = useState('All');

  useEffect(() => {
    api.get('/recommendations/gemstones')
      .then(({ data }) => { setGems(data.data); setFiltered(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = gems;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.needs.some((n) => n.includes(q)) ||
          g.zodiacSigns.some((z) => z.toLowerCase().includes(q)) ||
          g.chakra.toLowerCase().includes(q)
      );
    }
    if (planet !== 'All') {
      list = list.filter((g) => g.planet === planet);
    }
    setFiltered(list);
  }, [search, planet, gems]);

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2>Gemstone Catalogue</h2>
          <p>Explore all {gems.length} gemstones in our database</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <input
            className="form-input"
            style={{ maxWidth: 300 }}
            placeholder="Search by name, need, zodiac, chakra…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-input"
            style={{ maxWidth: 200 }}
            value={planet}
            onChange={(e) => setPlanet(e.target.value)}
          >
            {PLANETS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>No gems match your search. Try different keywords.</p>
          </div>
        ) : (
          <div className="grid-2">
            {filtered.map((gem) => (
              <GemCard key={gem.id} gem={gem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
