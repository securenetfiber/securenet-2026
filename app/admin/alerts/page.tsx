'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface AlertState {
  enabled: boolean;
  variant: 'info' | 'warning' | 'critical';
  message: string;
  linkText: string;
  linkHref: string;
  updatedAt: string;
  updatedBy: string;
}

interface StormState {
  enabled: boolean;
  phase: 'monitoring' | 'active' | 'restoring' | 'clear';
  message: string;
  updatedAt: string;
  updatedBy: string;
}

const phaseLabels: Record<string, string> = {
  monitoring: 'Monitoring',
  active: 'Active Storm',
  restoring: 'Restoring',
  clear: 'All Clear',
};

export default function AdminAlerts() {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [storm, setStorm] = useState<StormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingStorm, setSavingStorm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [stormFeedback, setStormFeedback] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/alerts')
      .then((r) => r.json())
      .then(setAlert)
      .catch(() => setError('Failed to load alert state'));
    fetch('/api/storm')
      .then((r) => r.json())
      .then(setStorm)
      .catch(() => {});
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!alert) return;

    setSaving(true);
    setFeedback('');
    setError('');

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: alert.enabled,
          variant: alert.variant,
          message: alert.message,
          linkText: alert.linkText,
          linkHref: alert.linkHref,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setAlert(updated);
        setFeedback(
          `Alert updated at ${new Date(updated.updatedAt).toLocaleString()}`,
        );
      } else if (res.status === 401) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  async function handleStormSave(e: FormEvent) {
    e.preventDefault();
    if (!storm) return;

    setSavingStorm(true);
    setStormFeedback('');

    try {
      const res = await fetch('/api/storm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: storm.enabled,
          phase: storm.phase,
          message: storm.message,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setStorm(updated);
        setStormFeedback(
          `Storm status updated at ${new Date(updated.updatedAt).toLocaleString()}`,
        );
      } else if (res.status === 401) {
        router.push('/admin/login');
      }
    } catch {
      setStormFeedback('Something went wrong');
    } finally {
      setSavingStorm(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (!alert) {
    return (
      <div className="admin-page">
        <p>{error || 'Loading…'}</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-top-bar">
        <h1>Outage Alerts</h1>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm">
          Logout
        </button>
      </div>

      <form onSubmit={handleSave} className="admin-form">
        <div className="admin-toggle-row">
          <span className="admin-toggle-label">Alert active</span>
          <button
            type="button"
            role="switch"
            aria-checked={alert.enabled}
            className={`admin-toggle ${alert.enabled ? 'admin-toggle--on' : ''}`}
            onClick={() => setAlert({ ...alert, enabled: !alert.enabled })}
          >
            <span className="admin-toggle-knob" />
          </button>
          <span
            className={`admin-status ${alert.enabled ? 'admin-status--on' : 'admin-status--off'}`}
          >
            {alert.enabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <fieldset className="admin-fieldset">
          <legend>Severity</legend>
          <div className="admin-severity-options">
            {(['info', 'warning', 'critical'] as const).map((v) => (
              <label
                key={v}
                className={`admin-severity-option ${alert.variant === v ? 'admin-severity-option--selected' : ''}`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={v}
                  checked={alert.variant === v}
                  onChange={() => setAlert({ ...alert, variant: v })}
                />
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="admin-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={alert.message}
            onChange={(e) => setAlert({ ...alert, message: e.target.value })}
            maxLength={500}
            rows={3}
            placeholder="We are currently experiencing service interruptions..."
          />
          <small className="admin-char-count">{alert.message.length}/500</small>
        </div>

        <div className="admin-field">
          <label htmlFor="linkText">Link text (optional)</label>
          <input
            id="linkText"
            type="text"
            value={alert.linkText}
            onChange={(e) => setAlert({ ...alert, linkText: e.target.value })}
            placeholder="View status"
          />
        </div>

        <div className="admin-field">
          <label htmlFor="linkHref">Link URL (optional)</label>
          <input
            id="linkHref"
            type="text"
            value={alert.linkHref}
            onChange={(e) => setAlert({ ...alert, linkHref: e.target.value })}
            placeholder="/status"
          />
        </div>

        {feedback && <p className="admin-feedback">{feedback}</p>}
        {error && <p className="admin-error">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary admin-save-btn"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      {alert.updatedAt && (
        <p className="admin-last-updated">
          Last updated: {new Date(alert.updatedAt).toLocaleString()} by{' '}
          {alert.updatedBy}
        </p>
      )}

      {/* Storm Status */}
      {storm && (
        <>
          <hr className="admin-divider" />
          <h2 className="admin-section-heading">Storm Status</h2>
          <p className="admin-section-sub">
            Controls the status banner on the <a href="/storm" target="_blank">/storm</a> page.
          </p>

          <form onSubmit={handleStormSave} className="admin-form">
            <div className="admin-toggle-row">
              <span className="admin-toggle-label">Storm banner active</span>
              <button
                type="button"
                role="switch"
                aria-checked={storm.enabled}
                className={`admin-toggle ${storm.enabled ? 'admin-toggle--on' : ''}`}
                onClick={() => setStorm({ ...storm, enabled: !storm.enabled })}
              >
                <span className="admin-toggle-knob" />
              </button>
              <span
                className={`admin-status ${storm.enabled ? 'admin-status--on' : 'admin-status--off'}`}
              >
                {storm.enabled ? 'ON' : 'OFF'}
              </span>
            </div>

            <fieldset className="admin-fieldset">
              <legend>Phase</legend>
              <div className="admin-severity-options">
                {(['monitoring', 'active', 'restoring', 'clear'] as const).map((p) => (
                  <label
                    key={p}
                    className={`admin-severity-option ${storm.phase === p ? 'admin-severity-option--selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="phase"
                      value={p}
                      checked={storm.phase === p}
                      onChange={() => setStorm({ ...storm, phase: p })}
                    />
                    {phaseLabels[p]}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="admin-field">
              <label htmlFor="stormMessage">Custom message (optional)</label>
              <textarea
                id="stormMessage"
                value={storm.message}
                onChange={(e) => setStorm({ ...storm, message: e.target.value })}
                maxLength={500}
                rows={3}
                placeholder="Leave blank to use the default message for the selected phase"
              />
              <small className="admin-char-count">{storm.message.length}/500</small>
            </div>

            {stormFeedback && <p className="admin-feedback">{stormFeedback}</p>}

            <button
              type="submit"
              disabled={savingStorm}
              className="btn btn-primary admin-save-btn"
            >
              {savingStorm ? 'Saving...' : 'Save storm status'}
            </button>
          </form>

          {storm.updatedAt && (
            <p className="admin-last-updated">
              Last updated: {new Date(storm.updatedAt).toLocaleString()} by{' '}
              {storm.updatedBy}
            </p>
          )}
        </>
      )}
    </div>
  );
}
