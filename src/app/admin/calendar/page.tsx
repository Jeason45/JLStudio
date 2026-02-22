'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isSameMonth,
  isToday as isDateToday,
  addMonths,
  subMonths,
  parseISO,
  isBefore,
  isAfter,
  startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  type: string;
}

interface Appointment {
  id: string;
  contactId: string | null;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  status: string;
  location: string | null;
  createdAt: string;
  contact: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
  } | null;
}

// ─── Status helpers ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  scheduled: '#6366f1',
  confirmed: '#10b981',
  cancelled: '#ef4444',
  completed: '#638BFF',
};

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Planifie',
  confirmed: 'Confirme',
  cancelled: 'Annule',
  completed: 'Termine',
};

const STATUS_OPTIONS = [
  { value: 'scheduled', label: 'Planifie' },
  { value: 'confirmed', label: 'Confirme' },
  { value: 'cancelled', label: 'Annule' },
  { value: 'completed', label: 'Termine' },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Create form
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    contactId: '',
    location: '',
    status: 'scheduled',
  });
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  // Edit form (reuses viewingAppointment with local overrides)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    contactId: '',
    location: '',
    status: '',
  });

  // ─── Data fetching ──────────────────────────────────────────────────────

  const fetchAppointments = useCallback(async () => {
    try {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const response = await fetch(
        `/api/appointments?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
      );
      const data = response.ok ? await response.json() : [];
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = response.ok ? await response.json() : [];
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchContacts();
  }, [fetchAppointments]);

  // ─── Calendar grid ──────────────────────────────────────────────────────

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Pad start (Monday = 0 with ISO week; use getDay which gives Sunday=0)
    const startDayOfWeek = getDay(monthStart); // 0=Sun
    const paddingBefore: (Date | null)[] = Array(startDayOfWeek).fill(null);

    // Pad end to fill the last row
    const totalCells = paddingBefore.length + daysInMonth.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    const paddingAfter: (Date | null)[] = Array(remainingCells).fill(null);

    return [...paddingBefore, ...daysInMonth, ...paddingAfter];
  }, [currentDate]);

  const getAppointmentsForDate = useCallback(
    (date: Date) => {
      return appointments
        .filter((apt) => {
          const aptDate = parseISO(apt.startTime);
          return isSameDay(aptDate, date);
        })
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    },
    [appointments]
  );

  // ─── Upcoming appointments ────────────────────────────────────────────

  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((apt) => isAfter(parseISO(apt.startTime), now) && apt.status !== 'cancelled')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 5);
  }, [appointments]);

  // ─── Stats ────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const now = new Date();
    const total = appointments.length;
    const upcoming = appointments.filter(
      (a) => isAfter(parseISO(a.startTime), now) && a.status !== 'cancelled'
    ).length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    const todayCount = appointments.filter((a) =>
      isSameDay(parseISO(a.startTime), now)
    ).length;
    return { total, upcoming, completed, todayCount };
  }, [appointments]);

  // ─── Navigation ───────────────────────────────────────────────────────

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // ─── Create appointment ───────────────────────────────────────────────

  const openCreateModal = (date?: Date) => {
    const dateStr = date ? format(date, 'yyyy-MM-dd') : '';
    setNewAppointment({
      title: '',
      description: '',
      date: dateStr,
      startTime: '',
      endTime: '',
      contactId: '',
      location: '',
      status: 'scheduled',
    });
    setCreateErrors({});
    setShowCreateModal(true);
  };

  const validateCreate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!newAppointment.title.trim()) errs.title = 'Le titre est requis';
    if (!newAppointment.date) errs.date = 'La date est requise';
    if (!newAppointment.startTime) errs.startTime = "L'heure de debut est requise";
    if (!newAppointment.endTime) errs.endTime = "L'heure de fin est requise";
    if (newAppointment.startTime && newAppointment.endTime && newAppointment.startTime >= newAppointment.endTime) {
      errs.endTime = "L'heure de fin doit etre apres l'heure de debut";
    }
    setCreateErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCreate()) return;
    setCreating(true);
    try {
      const startDateTime = new Date(`${newAppointment.date}T${newAppointment.startTime}`);
      const endDateTime = new Date(`${newAppointment.date}T${newAppointment.endTime}`);
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newAppointment.title,
          description: newAppointment.description || undefined,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          contactId: newAppointment.contactId || undefined,
          location: newAppointment.location || undefined,
          status: newAppointment.status,
        }),
      });
      if (response.ok) {
        setShowCreateModal(false);
        fetchAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la creation');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Erreur lors de la creation du rendez-vous');
    } finally {
      setCreating(false);
    }
  };

  // ─── View / Edit / Delete appointment ─────────────────────────────────

  const openViewModal = (apt: Appointment) => {
    setViewingAppointment(apt);
    setEditMode(false);
    setShowViewModal(true);
  };

  const startEditing = () => {
    if (!viewingAppointment) return;
    setEditForm({
      title: viewingAppointment.title,
      description: viewingAppointment.description || '',
      startTime: format(parseISO(viewingAppointment.startTime), "yyyy-MM-dd'T'HH:mm"),
      endTime: format(parseISO(viewingAppointment.endTime), "yyyy-MM-dd'T'HH:mm"),
      contactId: viewingAppointment.contactId || '',
      location: viewingAppointment.location || '',
      status: viewingAppointment.status,
    });
    setEditErrors({});
    setEditMode(true);
  };

  const validateEdit = (): boolean => {
    const errs: Record<string, string> = {};
    if (!editForm.title.trim()) errs.title = 'Le titre est requis';
    if (!editForm.startTime) errs.startTime = "L'heure de debut est requise";
    if (!editForm.endTime) errs.endTime = "L'heure de fin est requise";
    if (editForm.startTime && editForm.endTime && editForm.startTime >= editForm.endTime) {
      errs.endTime = "L'heure de fin doit etre apres l'heure de debut";
    }
    setEditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingAppointment) return;
    if (!validateEdit()) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/appointments/${viewingAppointment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          description: editForm.description || null,
          startTime: new Date(editForm.startTime).toISOString(),
          endTime: new Date(editForm.endTime).toISOString(),
          contactId: editForm.contactId || null,
          location: editForm.location || null,
          status: editForm.status,
        }),
      });
      if (response.ok) {
        setShowViewModal(false);
        setViewingAppointment(null);
        setEditMode(false);
        fetchAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Erreur lors de la modification du rendez-vous');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!viewingAppointment) return;
    if (!confirm('Etes-vous sur de vouloir supprimer ce rendez-vous ?')) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/appointments/${viewingAppointment.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setShowViewModal(false);
        setViewingAppointment(null);
        fetchAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Erreur lors de la suppression du rendez-vous');
    } finally {
      setDeleting(false);
    }
  };

  // ─── Day names ────────────────────────────────────────────────────────

  const dayNames = isMobile ? ['D', 'L', 'M', 'M', 'J', 'V', 'S'] : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // ─── Reusable style helpers ───────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'white',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const errorStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block',
  };

  const inputErrorBorder = '1px solid rgba(239,68,68,0.5)';

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1b2e 100%)' }}>
      <AdminSidebar />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
      }}>
        {/* ─── Header ────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(to right, #0a0e1a, #101d30)',
          padding: isMobile ? '80px 16px 32px 16px' : '40px 40px 32px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* Breadcrumb line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Calendrier
            </span>
          </div>

          {/* Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'Total ce mois', value: stats.total, color: '#638BFF', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#638BFF" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              )},
              { label: "Aujourd'hui", value: stats.todayCount, color: '#fbbf24', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              )},
              { label: 'A venir', value: stats.upcoming, color: '#6366f1', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              )},
              { label: 'Termines', value: stats.completed, color: '#10b981', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              )},
            ].map((s) => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: isMobile ? '40px' : '48px', height: isMobile ? '40px' : '48px', borderRadius: '12px',
                  background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, color: 'white' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Controls bar ──────────────────────────────────────────── */}
        <div style={{
          padding: isMobile ? '16px' : '20px 40px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.05)',
              padding: '6px 12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <button
                onClick={goToPrevMonth}
                style={{
                  padding: '6px', background: 'transparent', border: 'none',
                  borderRadius: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                  display: 'flex', transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>

              <span style={{
                fontSize: '15px', fontWeight: 600, minWidth: isMobile ? '140px' : '180px',
                textAlign: 'center', color: 'white', textTransform: 'capitalize',
              }}>
                {format(currentDate, 'MMMM yyyy', { locale: fr })}
              </span>

              <button
                onClick={goToNextMonth}
                style={{
                  padding: '6px', background: 'transparent', border: 'none',
                  borderRadius: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                  display: 'flex', transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            {/* Today button */}
            <button
              onClick={goToToday}
              style={{
                padding: '8px 16px', background: 'rgba(99,139,255,0.15)',
                border: '1px solid rgba(99,139,255,0.3)', borderRadius: '8px',
                cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                color: '#638BFF', transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99,139,255,0.25)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(99,139,255,0.15)'; }}
            >
              Aujourd&apos;hui
            </button>
          </div>

          {/* Create button */}
          <button
            onClick={() => openCreateModal()}
            style={{
              padding: '10px 20px', border: 'none', borderRadius: '10px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: 600,
              background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
              color: 'white', boxShadow: '0 4px 12px rgba(99,139,255,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(99,139,255,0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,139,255,0.3)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nouveau RDV
          </button>
        </div>

        {/* ─── Main content: Calendar + Sidebar ──────────────────────── */}
        <div style={{
          padding: isMobile ? '0 16px 24px 16px' : '0 40px 40px 40px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
          gap: '24px',
        }}>
          {/* Calendar grid */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              {/* Day names row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                {dayNames.map((day) => (
                  <div key={day} style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
              }}>
                {calendarDays.map((date, index) => {
                  const dayAppts = date ? getAppointmentsForDate(date) : [];
                  const isToday = date ? isDateToday(date) : false;
                  const isSelected = date && selectedDate ? isSameDay(date, selectedDate) : false;
                  const isCurrentMonth = date ? isSameMonth(date, currentDate) : false;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (date) setSelectedDate(date);
                      }}
                      style={{
                        minHeight: isMobile ? '70px' : '100px',
                        padding: isMobile ? '4px' : '6px',
                        borderRight: (index + 1) % 7 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: date ? 'pointer' : 'default',
                        transition: 'background 0.15s',
                        background: isSelected
                          ? 'rgba(99,139,255,0.1)'
                          : date
                            ? 'transparent'
                            : 'rgba(255,255,255,0.01)',
                        opacity: date && !isCurrentMonth ? 0.3 : 1,
                      }}
                      onMouseOver={(e) => {
                        if (date && !isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }}
                      onMouseOut={(e) => {
                        if (date && !isSelected) e.currentTarget.style.background = 'transparent';
                        if (isSelected) e.currentTarget.style.background = 'rgba(99,139,255,0.1)';
                      }}
                    >
                      {date && (
                        <>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '4px',
                          }}>
                            <div style={{
                              width: isMobile ? '24px' : '28px',
                              height: isMobile ? '24px' : '28px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '13px',
                              fontWeight: isToday ? 700 : 500,
                              color: isToday ? 'white' : isSelected ? '#638BFF' : 'rgba(255,255,255,0.8)',
                              background: isToday
                                ? 'linear-gradient(135deg, #638BFF, #4a6fd4)'
                                : 'transparent',
                            }}>
                              {format(date, 'd')}
                            </div>
                          </div>

                          {/* Appointment pills */}
                          {dayAppts.slice(0, isMobile ? 1 : 2).map((apt) => (
                            <div
                              key={apt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                openViewModal(apt);
                              }}
                              style={{
                                fontSize: isMobile ? '9px' : '10px',
                                padding: isMobile ? '1px 4px' : '2px 6px',
                                borderRadius: '4px',
                                marginBottom: '2px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontWeight: 600,
                                cursor: 'pointer',
                                background: `${STATUS_COLORS[apt.status] || '#6366f1'}20`,
                                color: STATUS_COLORS[apt.status] || '#6366f1',
                                borderLeft: `2px solid ${STATUS_COLORS[apt.status] || '#6366f1'}`,
                                transition: 'opacity 0.15s',
                              }}
                              onMouseOver={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                              onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
                            >
                              {format(parseISO(apt.startTime), 'HH:mm')} {apt.title}
                            </div>
                          ))}

                          {dayAppts.length > (isMobile ? 1 : 2) && (
                            <div style={{
                              fontSize: '10px',
                              color: 'rgba(255,255,255,0.4)',
                              textAlign: 'center',
                              fontWeight: 600,
                            }}>
                              +{dayAppts.length - (isMobile ? 1 : 2)} autre{dayAppts.length - (isMobile ? 1 : 2) > 1 ? 's' : ''}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── Selected day detail panel ────────────────────────── */}
            {selectedDate && (
              <div style={{
                marginTop: '24px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '24px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>
                    {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
                  </h3>
                  <button
                    onClick={() => openCreateModal(selectedDate)}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Ajouter
                  </button>
                </div>

                {getAppointmentsForDate(selectedDate).length === 0 ? (
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '32px 0' }}>
                    Aucun rendez-vous ce jour
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {getAppointmentsForDate(selectedDate).map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => openViewModal(apt)}
                        style={{
                          padding: '16px',
                          background: 'rgba(255,255,255,0.04)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderLeft: `3px solid ${STATUS_COLORS[apt.status] || '#6366f1'}`,
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{apt.title}</div>
                          <span style={{
                            padding: '3px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 600,
                            background: `${STATUS_COLORS[apt.status] || '#6366f1'}20`,
                            color: STATUS_COLORS[apt.status] || '#6366f1',
                          }}>
                            {STATUS_LABELS[apt.status] || apt.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {format(parseISO(apt.startTime), 'HH:mm')} - {format(parseISO(apt.endTime), 'HH:mm')}
                        </div>
                        {apt.contact && (
                          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            {apt.contact.name}
                          </div>
                        )}
                        {apt.location && (
                          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {apt.location}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── Right sidebar: Upcoming ─────────────────────────────── */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '20px',
              position: isMobile ? 'static' : 'sticky',
              top: '20px',
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}>
                Prochains rendez-vous
              </h3>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'rgba(255,255,255,0.3)' }}>
                  Chargement...
                </div>
              ) : upcomingAppointments.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '32px 16px',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                }}>
                  Aucun rendez-vous a venir
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => openViewModal(apt)}
                      style={{
                        padding: '14px',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderLeft: `3px solid ${STATUS_COLORS[apt.status] || '#6366f1'}`,
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>
                        {apt.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {format(parseISO(apt.startTime), 'EEE d MMM', { locale: fr })}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {format(parseISO(apt.startTime), 'HH:mm')} - {format(parseISO(apt.endTime), 'HH:mm')}
                      </div>
                      {apt.contact && (
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                          {apt.contact.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CREATE MODAL
          ═══════════════════════════════════════════════════════════════════ */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px',
            backdropFilter: 'blur(6px)',
          }}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #0d1321 0%, #0a1628 100%)',
              borderRadius: '16px',
              maxWidth: '560px', width: '100%',
              maxHeight: '90vh', overflow: 'auto',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#638BFF" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nouveau rendez-vous
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  borderRadius: '8px', padding: '6px 10px',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                  fontSize: '18px', lineHeight: 1, display: 'flex',
                }}
              >
                x
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreate} style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Title */}
                <div>
                  <label style={labelStyle}>Titre *</label>
                  <input
                    type="text"
                    value={newAppointment.title}
                    onChange={(e) => { setNewAppointment({ ...newAppointment, title: e.target.value }); if (createErrors.title) setCreateErrors(prev => { const { title, ...rest } = prev; return rest; }); }}
                    placeholder="Ex: Reunion projet web"
                    style={{ ...inputStyle, ...(createErrors.title ? { border: inputErrorBorder } : {}) }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = createErrors.title ? 'rgba(239,68,68,0.5)' : 'rgba(99,139,255,0.5)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = createErrors.title ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.15)'; }}
                  />
                  {createErrors.title && <span style={errorStyle}>{createErrors.title}</span>}
                </div>

                {/* Date */}
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => { setNewAppointment({ ...newAppointment, date: e.target.value }); if (createErrors.date) setCreateErrors(prev => { const { date, ...rest } = prev; return rest; }); }}
                    style={{ ...inputStyle, colorScheme: 'dark', ...(createErrors.date ? { border: inputErrorBorder } : {}) }}
                  />
                  {createErrors.date && <span style={errorStyle}>{createErrors.date}</span>}
                </div>

                {/* Start / End time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Debut *</label>
                    <input
                      type="time"
                      value={newAppointment.startTime}
                      onChange={(e) => { setNewAppointment({ ...newAppointment, startTime: e.target.value }); if (createErrors.startTime) setCreateErrors(prev => { const { startTime, ...rest } = prev; return rest; }); }}
                      style={{ ...inputStyle, colorScheme: 'dark', ...(createErrors.startTime ? { border: inputErrorBorder } : {}) }}
                    />
                    {createErrors.startTime && <span style={errorStyle}>{createErrors.startTime}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Fin *</label>
                    <input
                      type="time"
                      value={newAppointment.endTime}
                      onChange={(e) => { setNewAppointment({ ...newAppointment, endTime: e.target.value }); if (createErrors.endTime) setCreateErrors(prev => { const { endTime, ...rest } = prev; return rest; }); }}
                      style={{ ...inputStyle, colorScheme: 'dark', ...(createErrors.endTime ? { border: inputErrorBorder } : {}) }}
                    />
                    {createErrors.endTime && <span style={errorStyle}>{createErrors.endTime}</span>}
                  </div>
                </div>

                {/* Contact dropdown */}
                <div>
                  <label style={labelStyle}>Contact</label>
                  <select
                    value={newAppointment.contactId}
                    onChange={(e) => setNewAppointment({ ...newAppointment, contactId: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'dark' }}
                  >
                    <option value="">-- Aucun contact --</option>
                    {contacts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}{c.email ? ` (${c.email})` : ''}{c.companyName ? ` - ${c.companyName}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label style={labelStyle}>Lieu</label>
                  <input
                    type="text"
                    value={newAppointment.location}
                    onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                    placeholder="Ex: Bureau, Visio, ..."
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  />
                </div>

                {/* Status */}
                <div>
                  <label style={labelStyle}>Statut</label>
                  <select
                    value={newAppointment.status}
                    onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'dark' }}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    value={newAppointment.description}
                    onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                    rows={3}
                    placeholder="Details du rendez-vous..."
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '24px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', fontSize: '14px',
                    fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  style={{
                    padding: '10px 20px',
                    background: creating ? 'rgba(99,139,255,0.3)' : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                    color: 'white', border: 'none',
                    borderRadius: '8px', fontSize: '14px',
                    fontWeight: 600, cursor: creating ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  {creating ? 'Creation...' : 'Creer le rendez-vous'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          VIEW / EDIT MODAL
          ═══════════════════════════════════════════════════════════════════ */}
      {showViewModal && viewingAppointment && (
        <div
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px',
            backdropFilter: 'blur(6px)',
          }}
          onClick={() => { setShowViewModal(false); setEditMode(false); setViewingAppointment(null); }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #0d1321 0%, #0a1628 100%)',
              borderRadius: '16px',
              maxWidth: '560px', width: '100%',
              maxHeight: '90vh', overflow: 'auto',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>
                {editMode ? 'Modifier le rendez-vous' : 'Details du rendez-vous'}
              </h3>
              <button
                onClick={() => { setShowViewModal(false); setEditMode(false); setViewingAppointment(null); }}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  borderRadius: '8px', padding: '6px 10px',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                  fontSize: '18px', lineHeight: 1, display: 'flex',
                }}
              >
                x
              </button>
            </div>

            {editMode ? (
              /* ─── EDIT FORM ──────────────────────────────────────── */
              <form onSubmit={handleSaveEdit} style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={labelStyle}>Titre *</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => { setEditForm({ ...editForm, title: e.target.value }); if (editErrors.title) setEditErrors(prev => { const { title, ...rest } = prev; return rest; }); }}
                      style={{ ...inputStyle, ...(editErrors.title ? { border: inputErrorBorder } : {}) }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = editErrors.title ? 'rgba(239,68,68,0.5)' : 'rgba(99,139,255,0.5)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = editErrors.title ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.15)'; }}
                    />
                    {editErrors.title && <span style={errorStyle}>{editErrors.title}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={labelStyle}>Debut *</label>
                      <input
                        type="datetime-local"
                        value={editForm.startTime}
                        onChange={(e) => { setEditForm({ ...editForm, startTime: e.target.value }); if (editErrors.startTime) setEditErrors(prev => { const { startTime, ...rest } = prev; return rest; }); }}
                        style={{ ...inputStyle, colorScheme: 'dark', ...(editErrors.startTime ? { border: inputErrorBorder } : {}) }}
                      />
                      {editErrors.startTime && <span style={errorStyle}>{editErrors.startTime}</span>}
                    </div>
                    <div>
                      <label style={labelStyle}>Fin *</label>
                      <input
                        type="datetime-local"
                        value={editForm.endTime}
                        onChange={(e) => { setEditForm({ ...editForm, endTime: e.target.value }); if (editErrors.endTime) setEditErrors(prev => { const { endTime, ...rest } = prev; return rest; }); }}
                        style={{ ...inputStyle, colorScheme: 'dark', ...(editErrors.endTime ? { border: inputErrorBorder } : {}) }}
                      />
                      {editErrors.endTime && <span style={errorStyle}>{editErrors.endTime}</span>}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Contact</label>
                    <select
                      value={editForm.contactId}
                      onChange={(e) => setEditForm({ ...editForm, contactId: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'dark' }}
                    >
                      <option value="">-- Aucun contact --</option>
                      {contacts.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}{c.email ? ` (${c.email})` : ''}{c.companyName ? ` - ${c.companyName}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Lieu</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Statut</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer', colorScheme: 'dark' }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(99,139,255,0.5)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '24px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    disabled={saving}
                    style={{
                      padding: '10px 20px',
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px', fontSize: '14px',
                      fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.5 : 1,
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      padding: '10px 20px',
                      background: saving ? 'rgba(99,139,255,0.3)' : 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                      color: 'white', border: 'none',
                      borderRadius: '8px', fontSize: '14px',
                      fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            ) : (
              /* ─── VIEW DETAILS ───────────────────────────────────── */
              <div style={{ padding: '24px 28px' }}>
                {/* Status badge */}
                <div style={{ marginBottom: '20px' }}>
                  <span style={{
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: `${STATUS_COLORS[viewingAppointment.status] || '#6366f1'}20`,
                    color: STATUS_COLORS[viewingAppointment.status] || '#6366f1',
                  }}>
                    {STATUS_LABELS[viewingAppointment.status] || viewingAppointment.status}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>
                  {viewingAppointment.title}
                </h2>

                {/* Info rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,139,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#638BFF" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>Date</div>
                      <div style={{ fontSize: '14px', color: 'white', fontWeight: 500, textTransform: 'capitalize' }}>
                        {format(parseISO(viewingAppointment.startTime), 'EEEE d MMMM yyyy', { locale: fr })}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,139,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#638BFF" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>Horaire</div>
                      <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>
                        {format(parseISO(viewingAppointment.startTime), 'HH:mm')} - {format(parseISO(viewingAppointment.endTime), 'HH:mm')}
                      </div>
                    </div>
                  </div>

                  {viewingAppointment.contact && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>Contact</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>
                          {viewingAppointment.contact.name}
                          {viewingAppointment.contact.email && (
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}> - {viewingAppointment.contact.email}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {viewingAppointment.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(251,191,36,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>Lieu</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>{viewingAppointment.location}</div>
                      </div>
                    </div>
                  )}

                  {viewingAppointment.description && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>Description</div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: 400, lineHeight: 1.5 }}>
                          {viewingAppointment.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div style={{
                  display: 'flex', gap: '10px', justifyContent: 'flex-end',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  flexWrap: 'wrap',
                }}>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    style={{
                      padding: '10px 18px',
                      background: deleting ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)',
                      color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '8px', fontSize: '13px',
                      fontWeight: 600, cursor: deleting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => { if (!deleting) e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = deleting ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)'; }}
                  >
                    {deleting ? 'Suppression...' : 'Supprimer'}
                  </button>
                  <button
                    onClick={startEditing}
                    style={{
                      padding: '10px 18px',
                      background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)',
                      color: 'white', border: 'none',
                      borderRadius: '8px', fontSize: '13px',
                      fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
