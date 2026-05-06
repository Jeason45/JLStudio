'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, User } from 'lucide-react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { AppointmentData } from '@/types/portal';
import { Button, Card } from '@/components/ui';

interface ContactOption {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export default function CalendrierPage() {
  const { isMobile } = useSidebar();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [contacts, setContacts] = useState<ContactOption[]>([]);
  const [form, setForm] = useState({ title: '', description: '', startTime: '', endTime: '', contactId: '', location: '' });
  const [saving, setSaving] = useState(false);

  const fetchAppointments = useCallback(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    fetch(`/api/portal/appointments?startDate=${start.toISOString()}&endDate=${end.toISOString()}`)
      .then((r) => r.json())
      .then(setAppointments)
      .catch(() => {});
  }, [currentMonth]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);
  useEffect(() => { fetch('/api/portal/contacts').then((r) => r.json()).then((res) => setContacts(res.data ?? res)); }, []);

  const handleCreate = async () => {
    if (!form.title || !form.startTime || !form.endTime) return;
    setSaving(true);
    const res = await fetch('/api/portal/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        contactId: form.contactId || undefined,
      }),
    });
    if (res.ok) {
      setShowCreate(false);
      setForm({ title: '', description: '', startTime: '', endTime: '', contactId: '', location: '' });
      fetchAppointments();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce rendez-vous ?')) return;
    await fetch(`/api/portal/appointments/${id}`, { method: 'DELETE' });
    fetchAppointments();
  };

  // Calendar grid
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

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const getAppointmentsForDay = (day: Date) =>
    appointments.filter((a) => isSameDay(new Date(a.startTime), day));

  const selectedDayAppointments = selectedDate ? getAppointmentsForDay(selectedDate) : [];

  const formatTime = (iso: string) => format(new Date(iso), 'HH:mm');

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Calendrier</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', minWidth: '140px', textAlign: 'center', textTransform: 'capitalize' }}>
              {format(currentMonth, 'MMMM yyyy', { locale: fr })}
            </span>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <Button onClick={() => { setShowCreate(true); if (selectedDate) { const dateStr = format(selectedDate, "yyyy-MM-dd'T'09:00"); setForm({ ...form, startTime: dateStr, endTime: format(selectedDate, "yyyy-MM-dd'T'10:00") }); } }} iconLeft={<Plus size={16} />}>
          Nouveau RDV
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedDate && !isMobile ? '1fr 320px' : '1fr', gap: '20px' }}>
        {/* Calendar grid */}
        <Card padding={0} style={{ overflow: 'hidden' }}>
          {/* Day names */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
            {dayNames.map((name) => (
              <div key={name} style={{ padding: '10px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {name}
              </div>
            ))}
          </div>

          {/* Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {days.map((day, i) => {
              const dayAppts = getAppointmentsForDay(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const today = isToday(day);

              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    minHeight: isMobile ? '52px' : '80px', padding: '6px',
                    borderRight: (i + 1) % 7 !== 0 ? '1px solid var(--bg-badge)' : 'none',
                    borderBottom: '1px solid var(--bg-badge)',
                    background: isSelected ? 'var(--accent-light)' : 'transparent',
                    cursor: 'pointer', transition: 'background 0.1s',
                    opacity: isCurrentMonth ? 1 : 0.35,
                  }}
                >
                  <div style={{
                    fontSize: '12px', fontWeight: today ? 600 : 400,
                    color: today ? 'var(--accent)' : 'var(--text-secondary)',
                    marginBottom: '3px',
                  }}>
                    {format(day, 'd')}
                  </div>
                  {dayAppts.slice(0, 2).map((a) => (
                    <div key={a.id} style={{
                      fontSize: '10px', padding: '1px 4px', borderRadius: '4px',
                      background: 'var(--accent-light)', color: 'var(--accent)',
                      marginBottom: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {formatTime(a.startTime)} {a.title}
                    </div>
                  ))}
                  {dayAppts.length > 2 && (
                    <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>+{dayAppts.length - 2}</div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Day detail panel */}
        {selectedDate && !isMobile && (
          <Card padding="16px">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
              </h3>
              <button onClick={() => setSelectedDate(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <X size={14} />
              </button>
            </div>

            {selectedDayAppointments.length === 0 ? (
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Aucun rendez-vous</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedDayAppointments.map((a) => (
                  <div key={a.id} style={{
                    padding: '10px', borderRadius: '8px', background: 'var(--bg-hover)',
                    border: '1px solid var(--border)',
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{a.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
                      <Clock size={11} /> {formatTime(a.startTime)} - {formatTime(a.endTime)}
                    </div>
                    {a.location && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '3px' }}><MapPin size={11} /> {a.location}</div>}
                    {a.contact && <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '3px' }}><User size={11} /> {a.contact.firstName || ''} {a.contact.lastName || ''}</div>}
                    {a.description && <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{a.description}</p>}
                    <button onClick={() => handleDelete(a.id)} style={{
                      marginTop: '6px', padding: '3px 8px', borderRadius: '6px', fontSize: '10px',
                      background: 'var(--bg-secondary)', color: 'var(--danger)', border: 'none', cursor: 'pointer',
                    }}>Supprimer</button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Create modal */}
      {showCreate && (
        <>
          <div onClick={() => setShowCreate(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 2000 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '440px', maxWidth: '95vw', background: 'var(--bg-card)',
            borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
            padding: '24px', zIndex: 2001,
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Nouveau rendez-vous</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder="Titre *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '3px', display: 'block', fontWeight: 500 }}>Debut</label>
                  <input type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '3px', display: 'block', fontWeight: 500 }}>Fin</label>
                  <input type="datetime-local" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <select value={form.contactId} onChange={(e) => setForm({ ...form, contactId: e.target.value })} style={inputStyle}>
                <option value="">-- Contact (optionnel) --</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.firstName || ''} {c.lastName || ''} ({c.email})</option>
                ))}
              </select>
              <input placeholder="Lieu (optionnel)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} />
              <textarea placeholder="Description (optionnel)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={handleCreate} disabled={saving} style={{
                  padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                  border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', opacity: saving ? 0.5 : 1,
                }}>
                  {saving ? 'Creation...' : 'Creer'}
                </button>
                <button onClick={() => setShowCreate(false)} style={{
                  padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                }}>Annuler</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
