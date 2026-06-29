import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Sparkles, LogIn, AlertTriangle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  navigateTo: (path: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate luxury animation delay
    setTimeout(() => {
      if (email === 'codybrothers026@gmail.com' && password === 'Arman1905') {
        onLoginSuccess();
      } else {
        setError('Invalid Email or Password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Premium background mesh & grids */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '48px 48px' 
          }} 
        />
        {/* Electric Blue Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00F0FF]/10 blur-[130px] rounded-full" />
      </div>

      {/* Header */}
      <header className="w-full h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 bg-slate-950/40 backdrop-blur-md z-10 relative">
        <div 
          onClick={() => navigateTo('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 border border-white/10 group-hover:border-[#00F0FF]/40 transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/15 via-transparent to-[#D4AF37]/15" />
            <span className="relative font-display font-black text-lg text-white">
              <span className="text-[#00F0FF]">C</span>
              <span className="text-[#D4AF37] -ml-[1px]">B</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white font-display">CodyBrothers</span>
            <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#00F0FF]">Web Architects</span>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('/')}
          className="text-xs text-gray-400 hover:text-white font-mono uppercase tracking-wider transition-colors"
        >
          Return to Site
        </button>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#0b0a11]/80 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,240,255,0.08)] relative overflow-hidden"
        >
          {/* Accent light lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

          {/* Icon and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00F0FF]/10 to-transparent border border-[#00F0FF]/30 text-[#00F0FF] mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-white">Security Command</h1>
            <p className="text-xs text-gray-400 mt-2 font-mono uppercase tracking-wider">CodyBrothers Admin Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-950/20 border border-red-500/30 text-red-400 rounded-xl p-4 flex items-start gap-3 text-xs font-mono"
              >
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@codybrothers.com"
                  className="w-full bg-slate-950/60 border border-white/5 focus:border-[#00F0FF]/40 focus:bg-slate-950 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">Passkey Credentials</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/60 border border-white/5 focus:border-[#00F0FF]/40 focus:bg-slate-950 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#00F0FF] to-[#007AFF] text-black font-extrabold rounded-xl shadow-[0_4px_25px_rgba(0,240,255,0.25)] hover:shadow-[0_4px_35px_rgba(0,240,255,0.4)] transition-all duration-300 disabled:opacity-50 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Decrypt Credentials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Secure indicator */}
          <div className="mt-8 flex items-center justify-center gap-1.5 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#00F0FF]" />
            <span>End-to-End Cryptographic Protocol</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[10px] font-mono text-gray-600 select-none border-t border-white/5 bg-slate-950/10 z-10 relative">
        © 2026 CodyBrothers Administrative Panel. All rights reserved.
      </footer>
    </div>
  );
};
