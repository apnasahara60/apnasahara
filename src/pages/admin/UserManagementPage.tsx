import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Shield, Phone, Mail, CheckCircle2, UserCheck } from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { UserProfile, UserRole } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const UserManagementPage: React.FC = () => {
  const { showToast } = useNotification();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New User Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('family');

  const loadUsers = () => {
    setUsers(dbStore.getUsers());
  };

  useEffect(() => {
    loadUsers();
    const handleUpdate = () => loadUsers();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const created: UserProfile = {
      id: `user-${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      role: newRole,
      created_at: new Date().toISOString()
    };
    dbStore.saveUser(created);
    showToast('User Created', `Added ${newName} as ${newRole}`, 'info');
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase()) ||
                          u.phone.includes(search);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">User & Account Management</h1>
          <p className="text-xs text-slate-500">
            Search, manage roles, and review accounts across all platform portals
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add User Account
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold overflow-x-auto w-full sm:w-auto">
          {['all', 'family', 'elder', 'caregiver', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl border uppercase text-[11px] transition-colors ${
                roleFilter === r
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold">
                <th className="pb-3 pl-2">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Created</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover border"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                        <p className="text-slate-400 text-[11px]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                      u.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : u.role === 'caregiver'
                        ? 'bg-blue-100 text-blue-800'
                        : u.role === 'elder'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 font-medium">{u.phone || '+91 98000 00000'}</td>
                  <td className="py-3.5 text-slate-500">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active Member'}
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <button
                      onClick={() => showToast('Profile Managed', `Opened configuration for ${u.name}`, 'info')}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Create Platform Account</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Meera Saxena"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Portal Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                >
                  <option value="family">Family Portal (Son/Daughter)</option>
                  <option value="elder">Elderly Parent Portal</option>
                  <option value="caregiver">Verified Caregiver (Sahayak)</option>
                  <option value="admin">Admin Operations</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
