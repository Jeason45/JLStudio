'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays,
  addMonths, subMonths, isSameDay, isSameMonth, isToday,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, X, Trash2, MapPin, User, Clock } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

// ─── Types ───────────────────────────────────────────────────────────

type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed';

interface Contact {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  companyName: string | null;
}

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  location: string | null;
  contact: { id: string; name: string; email: string | null; companyName: string | null } | null;
}

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; color: string }> = {
  scheduled: { label: 'Planifié', color: '#3B82F6' },
  confirmed: { label: 'Confirmé', color: '#22c55e' },
  cancelled: { label: 'Annulé', color: '#ef4444' },
  completed: { label: 'Terminé', color: '#94a3b8' },
};

const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// ─── Page ────────────────────────────────────────────────────────────

export default function AdminCalendarPage() {
  const { isMobile } = useAgencySidebar();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', description: '', date: '', startTime: '09:00', endTime: '10:00',
    contactId: '', location: '', status: 'scheduled' as AppointmentStatus,
  });

  // Calendar grid days
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days: Date[] = [];
    let d = calStart;
    while (d <= calEnd) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [currentMonth]);

  const fetchAppointments = useCallback(async () => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }).toISOString();
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }).toISOString();
    try {
      const res = await fetch(`/api/admin/appointments?startDate=${start}&endDate=${end}`);
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setAppointments([]);
    }
  }, [currentMonth]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);
  useEffect(() => {
    fetch('/api/admin/contacts')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setContacts(Array.isArray(d) ? d : []));
  }, []);

  const getApptsForDay = (day: Date) =>
    appointments.filter((a) => isSameDay(new Date(a.startTime), day));

  const selectedDayAppts = selectedDate ? getApptsForDay(selectedDate) : [];

  const handleCreate = async () => {
    if (!form.title.trim() || !form.date) {
      setError('Titre et date requis');
      return;
    }
    setCreating(true);
    setError('');
    try {
      const startTime = `${form.date}T${form.startTime}:00`;
      const endTime = `${form.date}T${form.endTime}:00`;
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description || undefined,
          startTime,
          endTime,
          contactId: form.contactId || undefined,
          location: form.location || undefined,
          status: form.status,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${res.status}`);
      }
      setShowCreate(false);
      setForm({ title: '', description: '', date: '', startTime: '09:00', endTime: '10:00', contactId: '', location: '', status: 'scheduled' });
      fetchAppointments();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer "${title}" ?`)) return;
    await fetch(`/api/admin/appointments?id=${id}`, { method: 'DELETE' });
    fetchAppointments();
  };

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    await fetch('/api/admin/appointments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  };

  const openCreateForDate = (date: Date) => {
    setForm({ ...form, date: format(date, 'yyyy-MM-dd') });
    setShowCreate(true);
  };

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Calendrier
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                style={iconBtn()}
                aria-label="Mois précédent"
              >
                <ChevronLeft size={14} />
              </button>
              <span style={{
                fontSize: 13, fontWeight: 500, color: 'var(--agency-ink-1)',
                minWidth: 140, textAlign: 'center', textTransform: 'capitalize',
              }}>
                {format(currentMonth, 'MMMM yyyy', { locale: fr })}
              </span>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                style={iconBtn()}
                aria-label="Mois suivant"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setCurrentMonth(new Date())} style={secondaryBtn()}>
              Aujourd&apos;hui
            </button>
            <button
              onClick={() => {
                setForm({ ...form, date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd') });
                setShowCreate(true);
              }}
              style={primaryBtn()}
            >
              <Plus size={14} />
              Nouveau RDV
            </button>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: selectedDate && !isMobile ? '1fr 320px' : '1fr', gap: 16 }}>
        {/* Calendar grid */}
        <div style={{ ...cardStyle(), padding: 0, overflow: 'hidden' }}>
          {/* Day names */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            borderBottom: '1px solid var(--agency-border)',
          }}>
            {DAY_NAMES.map((d) => (
              <div key={d} style={{
                padding: '10px 8px', textAlign: 'center',
                fontSize: 10, fontWeight: 700, color: 'var(--agency-ink-3)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {calendarDays.map((day, i) => {
              const dayAppts = getApptsForDay(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const inMonth = isSameMonth(day, currentMonth);
              const today = isToday(day);
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  onDoubleClick={() => openCreateForDate(day)}
                  style={{
                    minHeight: isMobile ? 60 : 90,
                    padding: 6,
                    borderRight: (i + 1) % 7 !== 0 ? '1px solid var(--agency-border-soft)' : 'none',
                    borderBottom: i < calendarDays.length - 7 ? '1px solid var(--agency-border-soft)' : 'none',
                    background: isSelected ? 'var(--agency-accent-soft)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    opacity: inMonth ? 1 : 0.4,
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'var(--agency-surface-2)';
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{
                    fontSize: 11, fontWeight: today ? 700 : 500,
                    color: today ? 'var(--agency-accent)' : 'var(--agency-ink-2)',
                    marginBottom: 4,
                  }}>
                    {format(day, 'd')}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {dayAppts.slice(0, isMobile ? 1 : 2).map((a) => (
                      <div key={a.id} style={{
                        fontSize: 9, padding: '2px 6px', borderRadius: 4,
                        background: `${STATUS_CONFIG[a.status].color}25`,
                        color: STATUS_CONFIG[a.status].color,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        fontWeight: 500,
                      }}>
                        {format(new Date(a.startTime), 'HH:mm')} {a.title}
                      </div>
                    ))}
                    {dayAppts.length > (isMobile ? 1 : 2) && (
                      <div style={{ fontSize: 9, color: 'var(--agency-ink-4)' }}>
                        +{dayAppts.length - (isMobile ? 1 : 2)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day panel (desktop) */}
        {selectedDate && !isMobile && (
          <div style={{ ...cardStyle(), padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, textTransform: 'capitalize' }}>
                {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
              </h3>
              <button onClick={() => setSelectedDate(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--agency-ink-3)', padding: 2 }}>
                <X size={14} />
              </button>
            </div>

            {selectedDayAppts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 12, color: 'var(--agency-ink-4)' }}>
                Aucun rendez-vous
                <div style={{ marginTop: 12 }}>
                  <button onClick={() => openCreateForDate(selectedDate)} style={primaryBtn()}>
                    <Plus size={13} />
                    Ajouter un RDV
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedDayAppts.map((a) => (
                  <AppointmentCard
                    key={a.id}
                    appt={a}
                    onDelete={() => handleDelete(a.id, a.title)}
                    onStatusChange={(s) => handleStatusChange(a.id, s)}
                  />
                ))}
                <button onClick={() => openCreateForDate(selectedDate)} style={{ ...secondaryBtn(), justifyContent: 'center', marginTop: 4 }}>
                  <Plus size={12} /> Ajouter un RDV
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile selected day */}
      {selectedDate && isMobile && selectedDayAppts.length > 0 && (
        <div style={{ ...cardStyle(), padding: 16, marginTop: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, marginBottom: 12, textTransform: 'capitalize' }}>
            {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedDayAppts.map((a) => (
              <AppointmentCard
                key={a.id}
                appt={a}
                onDelete={() => handleDelete(a.id, a.title)}
                onStatusChange={(s) => handleStatusChange(a.id, s)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <Modal title="Nouveau rendez-vous" onClose={() => setShowCreate(false)}>
          <Field label="Titre *">
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex: Réunion kickoff" style={inputStyle()} />
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} style={{ ...inputStyle(), resize: 'vertical', minHeight: 60 }} />
          </Field>
          <Field label="Date *">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={{ ...inputStyle(), colorScheme: 'dark' }} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Heure début">
              <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} style={{ ...inputStyle(), colorScheme: 'dark' }} />
            </Field>
            <Field label="Heure fin">
              <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} style={{ ...inputStyle(), colorScheme: 'dark' }} />
            </Field>
          </div>
          <Field label="Client">
            <select value={form.contactId} onChange={(e) => setForm({ ...form, contactId: e.target.value })} style={{ ...inputStyle(), cursor: 'pointer' }}>
              <option value="">— Aucun (RDV interne) —</option>
              {contacts.map((c) => {
                const display = c.companyName || `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name;
                return <option key={c.id} value={c.id}>{display}{c.email ? ` — ${c.email}` : ''}</option>;
              })}
            </select>
          </Field>
          <Field label="Lieu">
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Adresse, salle, lien visio…" style={inputStyle()} />
          </Field>
          <Field label="Statut">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AppointmentStatus })} style={{ ...inputStyle(), cursor: 'pointer' }}>
              <option value="scheduled">Planifié</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
              <option value="completed">Terminé</option>
            </select>
          </Field>
          {error && (
            <p style={{ fontSize: 12, color: 'var(--agency-danger)', margin: 0, marginBottom: 12 }}>{error}</p>
          )}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
            <button onClick={() => setShowCreate(false)} style={secondaryBtn()}>Annuler</button>
            <button
              onClick={handleCreate}
              disabled={creating || !form.title.trim() || !form.date}
              style={{ ...primaryBtn(), opacity: creating || !form.title.trim() || !form.date ? 0.5 : 1 }}
            >
              {creating ? 'Création…' : 'Créer'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── AppointmentCard ─────────────────────────────────────────────────

function AppointmentCard({
  appt, onDelete, onStatusChange,
}: {
  appt: Appointment;
  onDelete: () => void;
  onStatusChange: (s: AppointmentStatus) => void;
}) {
  const cfg = STATUS_CONFIG[appt.status];
  return (
    <div style={{
      background: 'var(--agency-surface-2)',
      border: '1px solid var(--agency-border)',
      borderRadius: 8, padding: 10,
      borderLeft: `3px solid ${cfg.color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 6 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--agency-ink-1)', marginBottom: 2 }}>
            {appt.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={10} />
            {format(new Date(appt.startTime), 'HH:mm')} → {format(new Date(appt.endTime), 'HH:mm')}
          </div>
        </div>
        <button onClick={onDelete} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--agency-ink-3)', padding: 2, display: 'flex' }}>
          <Trash2 size={11} />
        </button>
      </div>
      {appt.description && (
        <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: '4px 0', lineHeight: 1.4 }}>
          {appt.description}
        </p>
      )}
      {appt.contact && (
        <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <User size={10} /> {appt.contact.companyName || appt.contact.name}
        </div>
      )}
      {appt.location && (
        <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <MapPin size={10} /> {appt.location}
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <select
          value={appt.status}
          onChange={(e) => onStatusChange(e.target.value as AppointmentStatus)}
          style={{
            padding: '3px 8px', borderRadius: 12, fontSize: 10, fontWeight: 600,
            color: cfg.color,
            background: `${cfg.color}20`,
            border: `1px solid ${cfg.color}40`,
            cursor: 'pointer', outline: 'none', fontFamily: 'inherit',
          }}
        >
          {(Object.entries(STATUS_CONFIG) as [AppointmentStatus, typeof STATUS_CONFIG[AppointmentStatus]][]).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function inputStyle(): React.CSSProperties {
  return {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--agency-border)', borderRadius: 8,
    fontSize: 13, outline: 'none',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontFamily: 'inherit',
  };
}
function cardStyle(): React.CSSProperties {
  return {
    background: 'var(--agency-surface-1)',
    border: '1px solid var(--agency-border)',
    borderRadius: 12,
  };
}
function primaryBtn(): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 8,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: 'var(--agency-accent)', color: 'white', border: 'none',
  };
}
function secondaryBtn(): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 8,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: 'var(--agency-surface-2)', color: 'var(--agency-ink-2)',
    border: '1px solid var(--agency-border)',
  };
}
function iconBtn(): React.CSSProperties {
  return {
    width: 28, height: 28, borderRadius: 6,
    background: 'var(--agency-surface-2)',
    border: '1px solid var(--agency-border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'var(--agency-ink-2)',
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 600,
        color: 'var(--agency-ink-3)', marginBottom: 6,
        textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({
  title, onClose, children,
}: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 16,
      }}
    >
      <div style={{
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 12, padding: 24, width: '100%', maxWidth: 480,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--agency-ink-3)', padding: 4, display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
