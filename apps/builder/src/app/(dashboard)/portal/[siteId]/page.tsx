'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface PortalConfig {
  id: string;
  siteId: string;
  logoUrl: string | null;
  primaryColor: string;
  moduleCRM: boolean;
  moduleDevis: boolean;
  moduleFactures: boolean;
  moduleContrats: boolean;
  moduleProjets: boolean;
  moduleCMS: boolean;
  moduleCalendrier: boolean;
}

interface PortalUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  active: boolean;
  createdAt: string;
}

interface PortalData {
  config: PortalConfig | null;
  users: PortalUser[];
  site: { name: string; slug: string } | null;
}

const MODULES = [
  { key: 'moduleCRM', label: 'CRM', desc: 'Contacts, interactions, pipeline' },
  { key: 'moduleDevis', label: 'Devis', desc: 'Création et suivi des devis' },
  { key: 'moduleFactures', label: 'Factures', desc: 'Facturation et paiements' },
  { key: 'moduleContrats', label: 'Contrats', desc: 'Gestion des contrats' },
  { key: 'moduleProjets', label: 'Projets', desc: 'Suivi des projets' },
  { key: 'moduleCMS', label: 'CMS', desc: 'Gestion de contenu' },
  { key: 'moduleCalendrier', label: 'Calendrier', desc: 'Rendez-vous et planning' },
];

const COLORS = ['#4668e5', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'];

export default function PortalManagementPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;

  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchData = useCallback(() => {
    fetch(`/api/sites/${siteId}/portal`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [siteId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggle = async (key: string) => {
    if (!data) return;
    const current = data.config ? !!(data.config as unknown as Record<string, unknown>)[key] : false;
    setSaving(true);
    const res = await fetch(`/api/sites/${siteId}/portal`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: !current }),
    });
    if (res.ok) {
      const config = await res.json();
      setData({ ...data, config });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
    setSaving(false);
  };

  const handleColorChange = async (color: string) => {
    if (!data) return;
    setSaving(true);
    const res = await fetch(`/api/sites/${siteId}/portal`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ primaryColor: color }),
    });
    if (res.ok) {
      const config = await res.json();
      setData({ ...data, config });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
      </div>
    );
  }

  const config = data?.config;
  const users = data?.users || [];
  const siteName = data?.site?.name || 'Site';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Portail Client — {siteName}</h1>
            <p className="text-sm text-zinc-500">Gérer les modules, le branding et les utilisateurs du portail</p>
          </div>
          {(saving || saved) && (
            <div className="ml-auto flex items-center gap-2 text-sm">
              {saving && <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />}
              {saved && <><Check className="w-4 h-4 text-green-400" /><span className="text-green-400">Enregistré</span></>}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Modules */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Modules activés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODULES.map((m) => {
              const enabled = config ? !!(config as unknown as Record<string, unknown>)[m.key] : false;
              return (
                <button
                  key={m.key}
                  onClick={() => handleToggle(m.key)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                    enabled
                      ? 'bg-zinc-800/80 border-indigo-500/40'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                    enabled ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-600'
                  }`}>
                    {m.label[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{m.label}</div>
                    <div className="text-xs text-zinc-500 truncate">{m.desc}</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${
                    enabled ? 'bg-indigo-500' : 'bg-zinc-700'
                  }`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      enabled ? 'left-[18px]' : 'left-0.5'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Branding */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Branding</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <label className="text-sm text-zinc-400 mb-3 block">Couleur principale</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className="w-8 h-8 rounded-lg transition-transform hover:scale-110 relative"
                  style={{ backgroundColor: c }}
                >
                  {config?.primaryColor === c && (
                    <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Users */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Utilisateurs du portail ({users.length})
          </h2>
          {users.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
              <p className="text-zinc-500 text-sm">Aucun utilisateur. Les utilisateurs sont créés depuis le portail client.</p>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              {users.map((user, i) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 px-5 py-3 ${
                    i < users.length - 1 ? 'border-b border-zinc-800' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
                    {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {user.firstName || ''} {user.lastName || ''} {!user.firstName && !user.lastName ? user.email : ''}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">{user.email}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400' :
                    user.role === 'EDITOR' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-zinc-700 text-zinc-400'
                  }`}>
                    {user.role}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${user.active ? 'bg-green-400' : 'bg-zinc-600'}`} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Portal URL */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Accès au portail</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-sm text-zinc-400 mb-2">URL du portail client :</p>
            <code className="text-sm text-indigo-400 bg-zinc-800 px-3 py-1.5 rounded-lg inline-block">
              http://localhost:3001/login
            </code>
            <p className="text-xs text-zinc-600 mt-2">
              Slug du site : <span className="text-zinc-400">{data?.site?.slug || '—'}</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
