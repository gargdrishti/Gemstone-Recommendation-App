import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon: '🔮', title: 'Zodiac-Based Matching', desc: 'Recommendations aligned with your birth sign and planetary energies.' },
  { icon: '💫', title: 'Need-Specific Guidance', desc: 'Tell us what you need — love, focus, calm, prosperity — and we match accordingly.' },
  { icon: '💰', title: 'Budget-Aware Results', desc: 'Every recommendation fits within your stated budget range.' },
  { icon: '📚', title: 'Save & Review History', desc: 'Review past recommendations and save your favourites for future reference.' },
];

const TESTIMONIALS = [
  { name: 'Priya S.', sign: 'Cancer', quote: 'Found the perfect moonstone after years of searching. The match reasoning was spot on!', gem: '🌙' },
  { name: 'Arjun M.', sign: 'Leo', quote: 'The ruby recommendation for my leadership needs was uncannily accurate.', gem: '🔴' },
  { name: 'Sneha K.', sign: 'Virgo', quote: 'Loved the detailed care instructions. Bought the emerald and I\'m so happy!', gem: '💚' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '5rem 0 4rem',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💎</div>
          <h1 style={{ marginBottom: '1rem' }}>
            Discover Your Perfect{' '}
            <span className="gradient-text">Gemstone</span>
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: 540, margin: '0 auto 2rem', color: 'var(--text2)' }}>
            Personalised gemstone recommendations based on your zodiac sign, personal needs, and budget. Powered by ancient wisdom and modern logic.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/recommend" className="btn btn-primary btn-lg">
                Get My Recommendation →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link to="/gems" className="btn btn-outline btn-lg">
                  Browse All Gems
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2>How It Works</h2>
            <p>Four simple pillars behind every recommendation</p>
          </div>
          <div className="grid-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="card flex gap-2 items-center">
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.875rem' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '3rem 0 5rem', background: 'rgba(139,92,246,0.04)' }}>
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Users Say</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card">
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t.gem}</div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1rem' }}>"{t.quote}"</p>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>{t.name}</p>
                  <span className="badge badge-purple">{t.sign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
