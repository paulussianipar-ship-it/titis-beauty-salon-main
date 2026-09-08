import React, { useState } from 'react';
import { LockKeyhole, LogIn, ShieldCheck } from 'lucide-react';
import { AdminCrmDashboard } from './AdminCrmDashboard';

const ADMIN_SESSION_KEY = 'titis-admin-session';

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated');

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminCrmDashboard onLogout={handleLogout} />;
};

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
      onLogin();
      return;
    }
    setError('Username atau password tidak sesuai.');
  };

  return (
    <main className="min-h-screen bg-[#252525] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#F7F4EF] border border-[#C4A47C] shadow-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#252525] text-[#C4A47C] flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#9B8778] font-bold">Titis Internal Access</span>
          <h1 className="font-serif-luxury text-3xl text-[#252525] mt-2">Admin Panel</h1>
          <p className="text-xs text-[#9B8778] mt-2">Masuk untuk mengelola katalog dan operasional klinik.</p>
        </div>

        <form onSubmit={submitLogin} className="space-y-4">
          <label className="block text-xs font-semibold text-[#252525]">
            Username
            <input required autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} className="admin-product-input" placeholder="Masukkan username" />
          </label>
          <label className="block text-xs font-semibold text-[#252525]">
            Password
            <div className="relative">
              <LockKeyhole className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8778]" />
              <input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="admin-product-input pl-9" placeholder="Masukkan password" />
            </div>
          </label>
          {error && <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 p-3">{error}</p>}
          <button type="submit" className="w-full py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <LogIn className="w-4 h-4 text-[#C4A47C]" /> Masuk ke Admin Panel
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E8DDD3] text-[10px] text-[#9B8778] text-center">
          Demo akses: <strong className="text-[#252525]">admin</strong> / <strong className="text-[#252525]">admin123</strong>
        </div>
      </div>
    </main>
  );
};