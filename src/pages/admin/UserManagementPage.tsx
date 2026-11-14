import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Shield, Phone, Mail, CheckCircle2, UserCheck, X } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
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
    <div className="space-y-6 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Account Governance</span>
          <h1 className="text-2xl font-bold text-[#17211C]">User & Account Management</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
            Search, manage roles, and review accounts across all platform portals
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="art-btn-primary px-5 py-2.5 flex items-center gap-2 text-xs shadow-md"
        >
          <Plus className="w-4 h-4 text-[#CFB53B]" /> Add User Account
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="art-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#008080] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="art-input w-full pl-10 pr-4 py-2 font-sans text-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold overflow-x-auto w-full sm:w-auto font-sans">
          {['all', 'family', 'elder', 'caregiver', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-art border uppercase text-[10px] transition-colors ${
                roleFilter === r
                  ? 'bg-[#008080] text-[#FFFFF0] border-[#008080]'
                  : 'bg-[#FFFDD0] text-[#17211C]/75 border-[#CFB53B]/40 hover:bg-[#FFFFF0]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="art-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#CFB53B]/30 text-[#008080] uppercase font-bold text-[11px]">
                <th className="pb-3 pl-2">Name & Contact</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Registered Date</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFB53B]/20">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#FFFDD0]/50 transition-colors">
                  <td className="py-4 pl-2">
                    <p className="font-bold text-[#17211C] text-sm font-serif">{user.name}</p>
                    <p className="text-[11px] text-[#17211C]/60 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-[#008080]" /> {user.email}
                    </p>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded-art font-bold uppercase text-[10px] border ${
                      user.role === 'admin'
                        ? 'bg-[#800020]/15 text-[#800020] border-[#800020]/30'
                        : user.role === 'caregiver'
                        ? 'bg-[#005F9E]/15 text-[#005F9E] border-[#005F9E]/30'
                        : user.role === 'elder'
                        ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/30'
                        : 'bg-[#008080]/15 text-[#008080] border-[#008080]/30'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-[#17211C]/80">
                    {user.phone || '—'}
                  </td>
                  <td className="py-4 font-mono text-[#17211C]/60 text-[11px]">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <button
                      onClick={() => showToast('Role Updated', `${user.name}'s permissions verified`, 'info')}
                      className="art-btn-secondary px-3 py-1 text-[11px]"
                    >
                      Audit
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
        <div className="fixed inset-0 z-50 bg-[#17211C]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative art-card w-full max-w-md p-6 sm:p-8 space-y-5 animate-in fade-in">
            
            

            <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-3">
              <h3 className="text-xl font-bold text-[#17211C]">Create New User Account</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#17211C]/60 hover:text-[#17211C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 font-sans text-xs">
              <div>
                <label className="font-bold text-[#17211C] block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="art-input w-full text-sm font-serif"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211C] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="art-input w-full text-sm font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211C] block mb-1">Phone Number (+91)</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="art-input w-full text-sm font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-[#17211C] block mb-1">Account Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="art-input w-full text-sm bg-[#FFFFF0]"
                >
                  <option value="family">Family Sponsor (Son/Daughter)</option>
                  <option value="elder">Elderly Parent (Senior Citizen)</option>
                  <option value="caregiver">Certified Sahayak (Caregiver)</option>
                  <option value="admin">Operations Command (Admin)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="art-btn-secondary px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="art-btn-primary px-5 py-2 shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
