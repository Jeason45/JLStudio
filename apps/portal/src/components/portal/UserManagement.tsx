'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, User, Edit3 } from 'lucide-react';
import type { PortalUserData } from '@/types/portal';
import { Card, Button, Badge, Skeleton, EmptyState, Tooltip } from '@/components/ui';

export default function UserManagement() {
  const [users, setUsers] = useState<PortalUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{ email: string; password: string; firstName: string; lastName: string; role: 'ADMIN' | 'CLIENT' | 'EDITOR' }>({ email: '', password: '', firstName: '', lastName: '', role: 'CLIENT' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = () => {
    fetch('/api/portal/users')
      .then((r) => r.json())
      .then((data) => { setUsers(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/portal/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur');
        setSaving(false);
        return;
      }
      setShowForm(false);
      setFormData({ email: '', password: '', firstName: '', lastName: '', role: 'CLIENT' });
      fetchUsers();
    } catch {
      setError('Erreur serveur');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    await fetch(`/api/portal/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleToggleActive = async (user: PortalUserData) => {
    await fetch(`/api/portal/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !user.active }),
    });
    fetchUsers();
  };

  const roleIcon = (role: string) => {
    if (role === 'ADMIN') return <Shield size={14} style={{ color: 'var(--danger)' }} />;
    if (role === 'EDITOR') return <Edit3 size={14} style={{ color: 'var(--warning)' }} />;
    return <User size={14} style={{ color: 'var(--accent)' }} />;
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  return (
    <Card padding="24px">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Utilisateurs</h3>
        <Button onClick={() => setShowForm(!showForm)} iconLeft={<Plus size={16} />} size="sm">
          Ajouter
        </Button>
      </div>

      {showForm && (
        <div style={{
          background: 'var(--bg-hover)', borderRadius: '10px',
          border: '1px solid var(--border)', padding: '16px', marginBottom: '16px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input placeholder="Prenom" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={inputStyle} />
            <input placeholder="Nom" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={inputStyle} />
          </div>
          <input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ ...inputStyle, marginBottom: '10px' }} />
          <input placeholder="Mot de passe (min 8 car.)" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={{ ...inputStyle, marginBottom: '10px' }} />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'CLIENT' | 'EDITOR' })}
            style={{ ...inputStyle, marginBottom: '14px' }}
          >
            <option value="CLIENT">Client</option>
            <option value="EDITOR">Editeur</option>
            <option value="ADMIN">Admin</option>
          </select>
          {error && <p style={{ color: 'var(--danger)', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={handleCreate} loading={saving} size="md">
              {saving ? 'Création...' : 'Créer'}
            </Button>
            <Button onClick={() => setShowForm(false)} variant="secondary" size="md">
              Annuler
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <Skeleton height={120} rounded={8} />
      ) : users.length === 0 ? (
        <EmptyState icon={<User size={24} />} title="Aucun utilisateur" description="Ajoutez le premier utilisateur de ce site." />
      ) : (
        <div style={{ overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--border)' }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 120px 80px 80px',
            padding: '10px 14px', background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Utilisateur</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Role</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Statut</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</span>
          </div>
          {users.map((user, idx) => (
            <div key={user.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 120px 80px 80px',
              alignItems: 'center', padding: '12px 14px',
              borderBottom: idx < users.length - 1 ? '1px solid var(--border-light)' : 'none',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'var(--accent-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {roleIcon(user.role)}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {user.firstName || ''} {user.lastName || ''} {!user.firstName && !user.lastName ? user.email : ''}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{user.email}</div>
                </div>
              </div>
              <Badge tone={user.role === 'ADMIN' ? 'danger' : user.role === 'EDITOR' ? 'warning' : 'accent'}>
                {user.role}
              </Badge>
              <button
                onClick={() => handleToggleActive(user)}
                style={{
                  padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500,
                  background: user.active ? 'var(--success-light)' : 'var(--bg-badge)',
                  color: user.active ? 'var(--success)' : 'var(--text-tertiary)',
                  border: 'none', cursor: 'pointer', width: 'fit-content',
                }}
              >
                {user.active ? 'Actif' : 'Inactif'}
              </button>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip content="Supprimer">
                  <button onClick={() => handleDelete(user.id)} style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: 'transparent', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-tertiary)', transition: 'all 0.15s',
                  }}>
                    <Trash2 size={14} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
