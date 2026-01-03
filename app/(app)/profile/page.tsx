'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { formatDate } from '@/lib/utils/formatters';
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { Modal, ConfirmModal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, userProfile, signOut, refreshProfile } = useAuth();
  const { success, error: showError } = useToast();

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // Form states
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const displayName = userProfile?.name || user?.displayName || 'User';
  const email = user?.email || '';
  const phone = userProfile?.phone || '';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const openEditModal = () => {
    setEditName(displayName);
    setEditPhone(phone);
    setEditModalOpen(true);
  };

  const handleUpdateProfile = async () => {
    if (!user || !editName.trim()) return;

    setIsLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: editName.trim(),
        phone: editPhone.trim(),
        updatedAt: serverTimestamp(),
      });

      await refreshProfile();
      setEditModalOpen(false);
      success('Profile Updated', 'Your profile has been updated successfully.');
    } catch (err) {
      console.error('Error updating profile:', err);
      showError('Update Failed', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !auth.currentUser) return;

    setIsLoading(true);
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email!, deletePassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', user.uid));

      // Delete the user account
      await deleteUser(auth.currentUser);

      success('Account Deleted', 'Your account has been permanently deleted.');
      router.push('/login');
    } catch (err: unknown) {
      console.error('Error deleting account:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (errorMessage.includes('wrong-password') || errorMessage.includes('invalid-credential')) {
        showError('Incorrect Password', 'The password you entered is incorrect.');
      } else {
        showError('Delete Failed', 'Failed to delete account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    // TODO: Implement data export
    success('Coming Soon', 'Data export feature will be available soon.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-6">
          <div className="pt-3">
            <h1 className="text-xl font-bold">Profile</h1>
          </div>

          {/* Profile Info */}
          <div className="mt-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-600/30">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-bold">{displayName}</h2>
              <p className="text-slate-400 text-sm">{email}</p>
            </div>
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 space-y-4">
        {/* Account Section */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Account</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <MenuItem icon={<UserIcon />} iconBg="bg-blue-100" iconColor="text-blue-600" label="Edit Profile" onClick={openEditModal} />
            <MenuItem icon={<DownloadIcon />} iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Export Data" onClick={handleExportData} />
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Help & Support</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <MenuItem icon={<BookIcon />} iconBg="bg-violet-100" iconColor="text-violet-600" label="How to Use" href="/help" />
            <MenuItem icon={<DownloadAppIcon />} iconBg="bg-cyan-100" iconColor="text-cyan-600" label="Install App" href="/install" />
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">About</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <MenuItem icon={<InfoIcon />} iconBg="bg-slate-100" iconColor="text-slate-500" label="App Version" value="1.0.0" />
            <MenuItem icon={<FileIcon />} iconBg="bg-amber-100" iconColor="text-amber-600" label="Terms of Service" href="/terms" />
            <MenuItem icon={<ShieldIcon />} iconBg="bg-green-100" iconColor="text-green-600" label="Privacy Policy" href="/privacy" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Danger Zone</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <MenuItem
              icon={<TrashIcon />}
              iconBg="bg-red-100"
              iconColor="text-red-600"
              label="Delete Account"
              onClick={() => setDeleteConfirmModalOpen(true)}
              variant="danger"
            />
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full h-12 rounded-2xl font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 pt-2">
          Member since {userProfile?.createdAt ? formatDate(userProfile.createdAt, 'long') : 'recently'}
        </p>
      </main>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Profile"
        description="Update your personal information"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800"
              placeholder="+234 xxx xxx xxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setEditModalOpen(false)}
              className="flex-1 h-12 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProfile}
              disabled={isLoading || !editName.trim()}
              className="flex-1 h-12 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmModalOpen}
        onClose={() => setDeleteConfirmModalOpen(false)}
        onConfirm={() => {
          setDeleteConfirmModalOpen(false);
          setDeletePassword('');
          setDeleteModalOpen(true);
        }}
        title="Delete Account"
        message="This action is permanent and cannot be undone. All your data including income records, tax calculations, and settings will be permanently deleted."
        confirmText="Continue"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Delete Account Password Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        description="Enter your password to permanently delete your account"
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setDeleteModalOpen(false);
                setDeletePassword('');
              }}
              className="flex-1 h-12 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isLoading || !deletePassword}
              className="flex-1 h-12 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function MenuItem({
  icon,
  iconBg = 'bg-slate-100',
  iconColor = 'text-slate-600',
  label,
  value,
  onClick,
  href,
  variant = 'default',
}: {
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  label: string;
  value?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'danger';
}) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <span className={`flex-1 text-sm font-medium ${variant === 'danger' ? 'text-red-600' : 'text-slate-800'}`}>
        {label}
      </span>
      {value ? (
        <span className="text-xs text-slate-400 font-medium">{value}</span>
      ) : (onClick || href) ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full hover:bg-slate-50 transition-colors">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full hover:bg-slate-50 transition-colors text-left">
        {content}
      </button>
    );
  }

  return content;
}

// Icons
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const DownloadAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 6v8" />
    <path d="M9 11l3 3 3-3" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);
