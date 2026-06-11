export default function GemCard({ gem, rank, showScore = false }) {
  return (
    <div className="gem-card">
      <div className="gem-card-header">
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <span className="gem-emoji">{gem.imageEmoji}</span>
          {rank && <span className="gem-rank">#{rank}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3 style={{ marginBottom: '0.25rem' }}>{gem.name}</h3>
            {showScore && (
              <div className="score-ring" title="Match score">
                {gem.score}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
            <span className="badge badge-purple">{gem.planet}</span>
            <span className="badge badge-amber">{gem.chakra} Chakra</span>
            <span className="badge badge-green" style={{ color: gem.color ? undefined : undefined }}>
              {gem.color}
            </span>
          </div>
        </div>
      </div>

      <div className="gem-card-body">
        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {gem.description}
        </p>

        {/* Benefits */}
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>
            Benefits
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {gem.benefits?.slice(0, 3).map((b, i) => (
              <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text2)', display: 'flex', gap: '0.4rem' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Match reasons (only in recommendation results) */}
        {showScore && gem.matchReasons?.length > 0 && (
          <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: 8, padding: '0.75rem', marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 600, marginBottom: '0.4rem' }}>
              Why this gem?
            </p>
            {gem.matchReasons.map((r, i) => (
              <p key={i} style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5 }}>{r}</p>
            ))}
          </div>
        )}

        {/* Price range */}
        {gem.priceRange && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>Price range</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
              ₹{gem.priceRange.min?.toLocaleString()} – ₹{gem.priceRange.max?.toLocaleString()}
            </span>
          </div>
        )}

        {/* Care */}
        {gem.careInstructions && (
          <details style={{ marginTop: '0.75rem' }}>
            <summary style={{ fontSize: '0.8rem', color: 'var(--text3)', cursor: 'pointer' }}>
              Care instructions
            </summary>
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: '0.4rem', lineHeight: 1.5 }}>
              {gem.careInstructions}
            </p>
          </details>
        )}
      </div>
    </div>
  );
}
