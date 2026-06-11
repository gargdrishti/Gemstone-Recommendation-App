import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import GemCard from '../components/GemCard';

const ZODIAC_SIGNS = [
  'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces',
];

const NEEDS = [
  { value: 'love', label: 'Love & Relationships' },
  { value: 'confidence', label: 'Confidence' },
  { value: 'career', label: 'Career & Ambition' },
  { value: 'calm', label: 'Calm & Stress Relief' },
  { value: 'spiritual', label: 'Spiritual Growth' },
  { value: 'healing', label: 'Healing & Wellness' },
  { value: 'prosperity', label: 'Wealth & Prosperity' },
  { value: 'protection', label: 'Protection' },
  { value: 'clarity', label: 'Mental Clarity' },
  { value: 'creativity', label: 'Creativity' },
  { value: 'communication', label: 'Communication' },
  { value: 'wisdom', label: 'Wisdom & Intuition' },
  { value: 'energy', label: 'Energy & Vitality' },
  { value: 'sleep', label: 'Better Sleep' },
  { value: 'new beginnings', label: 'New Beginnings' },
];

export default function Recommend() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    zodiacSign: user?.zodiacSign || '',
    needs: [],
    budget: '',
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);

  const toggleNeed = (val) => {
    setForm((p) => ({
      ...p,
      needs: p.needs.includes(val)
        ? p.needs.filter((n) => n !== val)
        : [...p.needs, val],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.zodiacSign) return toast.error('Please select your zodiac sign.');
    if (form.needs.length === 0) return toast.error('Please select at least one need.');
    if (!form.budget || Number(form.budget) <= 0) return toast.error('Please enter a valid budget.');

    setLoading(true);
    setResults(null);
    try {
      const { data } = await api.post('/recommendations/generate', {
        ...form,
        budget: Number(form.budget),
      });
      setResults(data.data);
      toast.success(`Found ${data.data.recommendations.length} perfect matches! 💎`);
      // Scroll to results
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!results) return;
    setSaving(true);
    try {
      await api.patch(`/recommendations/${results._id}/save`);
      toast.success('Recommendation saved! ✨');
    } catch {
      toast.error('Could not save recommendation.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <h2>Get Your Gemstone Recommendation</h2>
          <p>Tell us about yourself and we'll find your perfect gemstone match</p>
        </div>

        <div className="card" style={{ maxWidth: 700, margin: '0 auto 3rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Zodiac Sign */}
            <div className="form-group">
              <label className="form-label">Your Zodiac Sign</label>
              {user?.zodiacSign && (
                <p style={{ fontSize: '0.82rem', color: 'var(--success)', marginBottom: '0.4rem' }}>
                  ✓ Auto-detected from your birth date: <strong>{user.zodiacSign}</strong>
                </p>
              )}
              <select
                className="form-input"
                value={form.zodiacSign}
                onChange={(e) => setForm((p) => ({ ...p, zodiacSign: e.target.value }))}
              >
                <option value="">-- Select your sign --</option>
                {ZODIAC_SIGNS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Needs */}
            <div className="form-group">
              <label className="form-label">
                What Do You Need? <span style={{ color: 'var(--text3)', fontWeight: 400, textTransform: 'none' }}>(select all that apply)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                {NEEDS.map((n) => (
                  <span
                    key={n.value}
                    className={`need-pill${form.needs.includes(n.value) ? ' selected' : ''}`}
                    onClick={() => toggleNeed(n.value)}
                  >
                    {n.label}
                  </span>
                ))}
              </div>
              {form.needs.length > 0 && (
                <p style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.4rem' }}>
                  ✓ {form.needs.length} need{form.needs.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            {/* Budget */}
            <div className="form-group">
              <label className="form-label">Budget (₹)</label>
              <input
                className="form-input" type="number" min="1"
                placeholder="e.g. 5000"
                value={form.budget}
                onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
                Enter your maximum budget in Indian Rupees
              </p>
            </div>

            <button className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
                  Finding your gems…
                </span>
              ) : '🔮 Find My Gemstones'}
            </button>
          </form>
        </div>

        {/* Results */}
        {results && (
          <div id="results">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ marginBottom: '0.25rem' }}>Your Matches</h2>
                <p style={{ fontSize: '0.875rem' }}>
                  For <strong>{results.zodiacSign}</strong> · Budget ₹{Number(results.budget).toLocaleString()} · {results.recommendations.length} gems found
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-outline btn-sm" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : '🔖 Save Results'}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/history')}>
                  View History →
                </button>
              </div>
            </div>

            <div className="grid-2">
              {results.recommendations.map((gem, i) => (
                <GemCard key={gem.gemstoneId} gem={gem} rank={i + 1} showScore />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
