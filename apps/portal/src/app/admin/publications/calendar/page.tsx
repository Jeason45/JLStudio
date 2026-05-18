'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

type Platform = 'LINKEDIN' | 'INSTAGRAM_FEED' | 'INSTAGRAM_STORY' | 'INSTAGRAM_REEL';
type TargetStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED' | 'CANCELLED';

const PLATFORMS: Record<Platform, { label: string; color: string }> = {
  LINKEDIN:        { label: 'LinkedIn',  color: '#0A66C2' },
  INSTAGRAM_FEED:  { label: 'IG Feed',   color: '#E1306C' },
  INSTAGRAM_STORY: { label: 'IG Story',  color: '#F77737' },
  INSTAGRAM_REEL:  { label: 'IG Reel',   color: '#FE7BAC' },
};

interface CalendarEvent {
  targetId: string;
  campaignId: string;
  campaignTitle: string;
  platform: Platform;
  scheduledAt: string;
  status: TargetStatus;
}

export default function PublicationsCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  useEffect(() => {
    fetch('/api/admin/publications', { headers: { 'x-portal-super-admin': 'true' } })
      .then((r) => r.json())
      .then((campaigns) => {
        const flat: CalendarEvent[] = [];
        campaigns.forEach((c: { id: string; title: string; targets: Array<{ id: string; platform: Platform; status: TargetStatus; scheduledAt: string | null }> }) => {
          c.targets.forEach((t) => {
            if (t.scheduledAt) {
              flat.push({
                targetId: t.id,
                campaignId: c.id,
                campaignTitle: c.title,
                platform: t.platform,
                scheduledAt: t.scheduledAt,
                status: t.status,
              });
            }
          });
        });
        setEvents(flat);
      })
      .catch(() => setEvents([]));
  }, []);

  const days = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((e) => {
      const d = new Date(e.scheduledAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const arr = map.get(key) || [];
      arr.push(e);
      map.set(key, arr);
    });
    return map;
  }, [events]);

  const monthLabel = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <div>
      <PageHeaderRibbon label="Publications · Calendrier" />

      <div style={{ marginBottom: 12 }}>
        <Link
          href="/admin/publications"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none' }}
        >
          <ArrowLeft size={12} /> Retour à la liste
        </Link>
      </div>

      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: 'var(--agency-ink-1)', textTransform: 'capitalize' }}>
          {monthLabel}
        </h2>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => moveMonth(currentMonth, setCurrentMonth, -1)} style={navBtn()}><ChevronLeft size={14} /></button>
          <button onClick={() => setCurrentMonth(() => { const d = new Date(); d.setDate(1); return d; })} style={navBtn()}>Auj.</button>
          <button onClick={() => moveMonth(currentMonth, setCurrentMonth, +1)} style={navBtn()}><ChevronRight size={14} /></button>
        </div>
      </header>

      {/* Header semaine */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
          <div key={d} style={{ fontSize: 10, fontWeight: 600, color: 'var(--agency-ink-3)', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', padding: 6 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid jours */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map((day, i) => {
          const key = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, '0')}-${String(day.date.getDate()).padStart(2, '0')}`;
          const dayEvents = eventsByDate.get(key) || [];
          const isToday = new Date().toDateString() === day.date.toDateString();
          return (
            <div
              key={i}
              style={{
                background: 'var(--agency-surface-1)',
                border: `1px solid ${isToday ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
                borderRadius: 8,
                minHeight: 90,
                padding: 6,
                opacity: day.inMonth ? 1 : 0.4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: isToday ? 'var(--agency-accent)' : 'var(--agency-ink-2)', textAlign: 'right' }}>
                {day.date.getDate()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                {dayEvents.slice(0, 3).map((e) => {
                  const cfg = PLATFORMS[e.platform];
                  return (
                    <Link
                      key={e.targetId}
                      href={`/admin/publications/${e.campaignId}`}
                      style={{
                        fontSize: 9, fontWeight: 500,
                        background: `${cfg.color}20`,
                        color: cfg.color,
                        padding: '2px 5px', borderRadius: 4,
                        textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: 3,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}
                      title={`${e.campaignTitle} · ${cfg.label} · ${new Date(e.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {new Date(e.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} {e.campaignTitle}
                      </span>
                    </Link>
                  );
                })}
                {dayEvents.length > 3 && (
                  <div style={{ fontSize: 9, color: 'var(--agency-ink-3)', textAlign: 'center', marginTop: 2 }}>
                    +{dayEvents.length - 3}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function moveMonth(current: Date, setter: (d: Date) => void, delta: number) {
  const d = new Date(current);
  d.setMonth(d.getMonth() + delta);
  setter(d);
}

function buildMonthGrid(monthStart: Date): { date: Date; inMonth: boolean }[] {
  const result: { date: Date; inMonth: boolean }[] = [];
  const firstDay = new Date(monthStart);
  const firstWeekday = (firstDay.getDay() + 6) % 7; // Lundi = 0
  const start = new Date(firstDay);
  start.setDate(start.getDate() - firstWeekday);

  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    result.push({ date: d, inMonth: d.getMonth() === monthStart.getMonth() });
  }
  return result;
}

function navBtn(): React.CSSProperties {
  return {
    width: 28, height: 28,
    border: '1px solid var(--agency-border)', borderRadius: 6,
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-2)',
    fontSize: 11,
    cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}
