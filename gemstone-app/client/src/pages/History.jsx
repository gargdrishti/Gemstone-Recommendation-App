import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import GemCard from '../components/GemCard';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/recommendations/history');
      setHistory(data.data);
    } catch {
      toast.error('Could not load history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recommendation?')) return;
    setDeleting(id);
    try {
      await api.delete(`/recommendations/${id}`);
      setHistory((h) => h.filter((r) => r._id !== id));
      toast.success('Deleted.');
    } catch {
      toast.error('Delete failed.');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleSave = async (id) => {
    try {
      const { data } = await api.patch(`/recommendations/${id}/save`);
      setHistory((h) => h.map((r) => (r._id === id ? data.data : r)));
      toast.success(data.data.isSaved ? 'Saved ✨' : 'Unsaved');
    } catch {
      toast.error('Action failed.');
    }
  };

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
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2>Recommendation History</h2>
            <p>{history.length} session{history.length !== 1 ? 's' : ''} found</p>
          </div>
          <Link to="/recommend" className="btn btn-primary">+ New Recommendation</Link>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔮</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text2)' }}>No recommendations yet</h3>
            <p style={{ marginBottom: '1.5rem' }}>Get your first personalised gemstone recommendation</p>
            <Link to="/recommend" className="btn btn-primary">Get Started</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {history.map((rec) => (
              <div key={rec._id} className="card">
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="badge badge-purple">{rec.zodiacSign}</span>
                    <span className="badge badge-amber">₹{Number(rec.budget).toLocaleString()}</span>
                    {rec.isSaved && <span className="badge badge-green">🔖 Saved</span>}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
                      {new Date(rec.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setExpanded(expanded === rec._id ? null : rec._id)}>
                      {expanded === rec._id ? '▲ Collapse' : '▼ View Gems'}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => handleToggleSave(rec._id)}>
                      {rec.isSaved ? '★ Unsave' : '☆ Save'}
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(rec._id)} disabled={deleting === rec._id}>
                      {deleting === rec._id ? '…' : 'Delete'}
                    </button>
                  </div>
                </div>

                {/* Needs tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
                  {rec.needs.map((n) => (
                    <span key={n} className="badge badge-pink">{n}</span>
                  ))}
                </div>

                {/* Top gem preview */}
                <p style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>
                  Top match:{' '}
                  <strong style={{ color: 'var(--text)' }}>
                    {rec.recommendations[0]?.imageEmoji} {rec.recommendations[0]?.name}
                  </strong>
                  {rec.recommendations.length > 1 && ` + ${rec.recommendations.length - 1} more`}
                </p>

                {/* Expanded gems */}
                {expanded === rec._id && (
                  <div className="grid-2" style={{ marginTop: '1.5rem' }}>
                    {rec.recommendations.map((gem, i) => (
                      <GemCard key={gem.gemstoneId} gem={gem} rank={i + 1} showScore />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
