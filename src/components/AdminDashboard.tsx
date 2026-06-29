import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  FileSpreadsheet, 
  Settings, 
  Mail, 
  Phone, 
  Briefcase,
  Lock
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  package: string;
  budget: string;
  message: string;
  date: string;
  sheetSynced: boolean;
  emailSynced: boolean;
  contacted?: boolean;
}

interface AdminDashboardProps {
  adminLeads: Lead[];
  fetchAdminData: () => void;
  onLogout: () => void;
  adminConfig: {
    googleToken: string;
    linkedSheetId: string;
    googleUser: string;
    autoSync: boolean;
  };
  setAdminConfig: React.Dispatch<React.SetStateAction<{
    googleToken: string;
    linkedSheetId: string;
    googleUser: string;
    autoSync: boolean;
  }>>;
  handleGoogleAuthorize: () => Promise<void>;
  isAuthorizing: boolean;
  isSavingConfig: boolean;
  setIsSavingConfig: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: (msg: string | null) => void;
  navigateTo: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminLeads,
  fetchAdminData,
  onLogout,
  adminConfig,
  setAdminConfig,
  handleGoogleAuthorize,
  isAuthorizing,
  isSavingConfig,
  setIsSavingConfig,
  setToastMessage,
  navigateTo
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isTogglingContactedId, setIsTogglingContactedId] = useState<string | null>(null);
  const [isClearingLeads, setIsClearingLeads] = useState(false);

  // Poll leads list for automatic refresh in Admin Panel (Requirement 4)
  useEffect(() => {
    fetchAdminData(); // Initial load
    const interval = setInterval(() => {
      fetchAdminData();
    }, 15000); // 15 seconds polling for fresh leads
    return () => clearInterval(interval);
  }, []);

  // Compute analytics
  const totalLeads = adminLeads.length;
  const contactedLeads = adminLeads.filter(l => l.contacted).length;
  const pendingLeads = totalLeads - contactedLeads;
  const clientMessagesCount = adminLeads.filter(l => l.message && l.message !== '—').length;
  const packageRequestsCount = adminLeads.filter(l => l.package && l.package !== '—' && !l.package.toLowerCase().includes('select')).length;

  // Filter leads based on search term
  const filteredLeads = adminLeads.filter(lead => {
    const searchString = `${lead.name} ${lead.email} ${lead.phone} ${lead.business} ${lead.package} ${lead.message}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  // Handle Mark as Contacted
  const handleToggleContacted = async (leadId: string) => {
    setIsTogglingContactedId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/toggle-contacted`, {
        method: 'POST',
      });
      if (res.ok) {
        setToastMessage("🎯 Updated contacted status successfully.");
        fetchAdminData();
      } else {
        setToastMessage("❌ Failed to update contact status.");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("❌ Error updating contact status.");
    } finally {
      setIsTogglingContactedId(null);
    }
  };

  // Handle Delete Lead
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to delete this lead? This action is permanent.")) {
      return;
    }
    setIsDeletingId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setToastMessage("🗑️ Lead deleted from directory successfully.");
        fetchAdminData();
      } else {
        setToastMessage("❌ Failed to delete lead.");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("❌ Error deleting lead.");
    } finally {
      setIsDeletingId(null);
    }
  };

  // Handle Save API Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      const res = await fetch('/api/admin/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminConfig)
      });
      if (res.ok) {
        setToastMessage("⚙️ Google Workspace configurations saved successfully!");
      } else {
        setToastMessage("❌ Failed to save workspace configuration.");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("❌ Error saving configuration.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Handle Clear Leads Registry
  const handleClearLeads = async () => {
    if (!window.confirm("Are you sure you want to clear all backup leads? This does not delete them from Google Sheets.")) {
      return;
    }
    setIsClearingLeads(true);
    try {
      const res = await fetch('/api/admin/clear-leads', {
        method: 'POST',
      });
      if (res.ok) {
        setToastMessage("🧹 Cleared leads registry successfully.");
        fetchAdminData();
      } else {
        setToastMessage("❌ Failed to clear leads.");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("❌ Error clearing leads.");
    } finally {
      setIsClearingLeads(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col relative overflow-hidden font-sans">
      {/* Premium Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '48px 48px' 
          }} 
        />
        {/* Soft glowing mesh gradient on bottom right */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00F0FF]/5 blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* Header */}
      <header className="sticky top-0 w-full h-20 border-b border-white/5 backdrop-blur-md bg-slate-950/40 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/15 via-transparent to-[#D4AF37]/15" />
              <span className="relative font-display font-black text-lg text-white">
                <span className="text-[#00F0FF]">C</span>
                <span className="text-[#D4AF37] -ml-[1px]">B</span>
              </span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white font-display uppercase">Administrative Center</h1>
              <p className="text-[9px] text-[#00F0FF] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Network Syncing (15s Poll)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchAdminData}
              className="p-2 border border-white/5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="Manual Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 border border-red-500/20 hover:border-red-500/40 bg-red-950/10 hover:bg-red-950/20 text-red-400 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Secure Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-8 z-10 relative space-y-8">
        
        {/* Analytics Section */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Metric 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0b0a11]/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00F0FF]/5 rounded-bl-[40px] pointer-events-none" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Total Submissions</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white font-display">{totalLeads}</span>
                <Users className="w-4 h-4 text-[#00F0FF] opacity-60" />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Archived backups</p>
            </motion.div>

            {/* Metric 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-[#0b0a11]/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-[40px] pointer-events-none" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Uncontacted</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-amber-400 font-display">{pendingLeads}</span>
                <AlertTriangle className="w-4 h-4 text-amber-400 opacity-60" />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Requires action</p>
            </motion.div>

            {/* Metric 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0b0a11]/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-[40px] pointer-events-none" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Contacted</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-400 font-display">{contactedLeads}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-60" />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Successfully closed</p>
            </motion.div>

            {/* Metric 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-[#0b0a11]/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-bl-[40px] pointer-events-none" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Client Messages</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-pink-400 font-display">{clientMessagesCount}</span>
                <MessageSquare className="w-4 h-4 text-pink-400 opacity-60" />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Custom inquiries</p>
            </motion.div>

            {/* Metric 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 lg:col-span-1 bg-[#0b0a11]/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-[40px] pointer-events-none" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Package Tiers</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-indigo-400 font-display">{packageRequestsCount}</span>
                <Layers className="w-4 h-4 text-indigo-400 opacity-60" />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Blueprint specs</p>
            </motion.div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Config & Tools */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b0a11]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white font-bold font-display flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#00F0FF]" />
                  API Sync Engine
                </h3>
                <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase">Google Workspace Automations</p>
              </div>

              {/* Google Workspace Connection Action */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleAuthorize}
                  disabled={isAuthorizing}
                  className="w-full flex items-center justify-center gap-3 py-3 bg-slate-950 border border-white/5 hover:border-[#00F0FF]/30 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 hover:bg-slate-900 shadow-sm"
                >
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4.5 h-4.5 shrink-0">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                  {isAuthorizing ? 'Authorizing...' : 'Sync Google Account'}
                </button>
                <div className="flex items-center gap-2 py-1">
                  <div className="h-[1px] bg-white/5 flex-1" />
                  <span className="text-[8px] font-mono uppercase text-gray-500">or configure manually</span>
                  <div className="h-[1px] bg-white/5 flex-1" />
                </div>
              </div>

              {/* Form Config */}
              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-400 block">Google Sheet ID</label>
                  <input
                    type="text"
                    value={adminConfig.linkedSheetId}
                    onChange={(e) => setAdminConfig({ ...adminConfig, linkedSheetId: e.target.value })}
                    placeholder="Spreadsheet ID string"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]/40 font-mono focus:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-400 block">OAuth Access Token</label>
                  <textarea
                    rows={3}
                    value={adminConfig.googleToken}
                    onChange={(e) => setAdminConfig({ ...adminConfig, googleToken: e.target.value })}
                    placeholder="Paste OAuth access token"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]/40 resize-none font-mono focus:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-gray-400 block">Admin Gmail Account</label>
                  <input
                    type="text"
                    value={adminConfig.googleUser}
                    onChange={(e) => setAdminConfig({ ...adminConfig, googleUser: e.target.value })}
                    placeholder="codybrothers026@gmail.com"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]/40 focus:bg-slate-950"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingConfig}
                  className="w-full py-2.5 bg-gradient-to-r from-[#00F0FF]/80 to-[#007AFF]/80 text-black font-extrabold rounded-lg text-[9px] uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer hover:from-[#00F0FF] hover:to-[#007AFF]"
                >
                  {isSavingConfig ? 'Saving...' : 'Apply API Config'}
                </button>
              </form>

              {/* Clear Registry Section */}
              <div className="border-t border-white/5 pt-6 space-y-3">
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-wider text-red-400 font-bold">Dangerous Zone</h4>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Administrative actions</p>
                </div>
                <button
                  onClick={handleClearLeads}
                  disabled={isClearingLeads}
                  className="w-full py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500/30 text-red-400 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {isClearingLeads ? 'Clearing Registry...' : 'Purge All Leads Registry'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Lead Stream */}
          <div className="lg:col-span-8 flex flex-col h-full space-y-4">
            
            {/* Search and Stream Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b0a11]/60 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by name, email, package choice, custom messages..."
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]/40 focus:bg-slate-950"
                />
              </div>
              <div className="text-right text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 self-end sm:self-auto select-none">
                <Layers className="w-3.5 h-3.5" />
                <span>Showing {filteredLeads.length} / {totalLeads}</span>
              </div>
            </div>

            {/* Stream List */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {filteredLeads.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-64 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-500 bg-white/[0.01]"
                  >
                    <FileSpreadsheet className="w-8 h-8 text-gray-600 mb-2" />
                    <p className="text-xs font-mono uppercase tracking-widest text-center px-4">
                      {totalLeads === 0 ? "No Leads Submissions Captured yet." : "No leads match your active filters."}
                    </p>
                  </motion.div>
                ) : (
                  filteredLeads.map((lead) => (
                    <motion.div 
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`bg-[#0b0a11]/40 border ${lead.contacted ? 'border-emerald-500/10' : 'border-white/5'} rounded-2xl p-5 hover:border-[#00F0FF]/20 transition-all flex flex-col justify-between relative group`}
                    >
                      {/* Top bar info */}
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white font-display leading-tight">{lead.name}</h4>
                            {lead.contacted ? (
                              <span className="text-[8px] font-mono uppercase font-black bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded text-emerald-400 select-none">
                                Contacted
                              </span>
                            ) : (
                              <span className="text-[8px] font-mono uppercase font-black bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded text-amber-400 select-none">
                                Pending
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[11px] text-gray-400 font-mono mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-gray-600" /> {lead.email}</span>
                            <span className="text-gray-700">|</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-gray-600" /> {lead.phone}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
                            {lead.date}
                          </span>
                        </div>
                      </div>

                      {/* Technical Blueprint Specifications */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-2.5 p-3 border border-white/5 rounded-xl bg-slate-950/40 text-xs font-mono">
                        <div>
                          <span className="text-[9px] text-gray-500 uppercase block">Requested Tier</span>
                          <span className="text-white font-semibold flex items-center gap-1 mt-0.5">
                            <Briefcase className="w-3 h-3 text-[#00F0FF] opacity-75" />
                            {lead.package}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 uppercase block">Investment Range</span>
                          <span className="text-[#D4AF37] font-semibold block mt-0.5">{lead.budget}</span>
                        </div>
                        {lead.business && lead.business !== '—' && (
                          <div className="col-span-2 md:col-span-1">
                            <span className="text-[9px] text-gray-500 uppercase block">Company / Business</span>
                            <span className="text-gray-300 block truncate mt-0.5">{lead.business}</span>
                          </div>
                        )}
                      </div>

                      {/* Message section if present */}
                      {lead.message && lead.message !== '—' && (
                        <p className="text-xs text-gray-400 italic bg-white/[0.01] border border-white/5 p-3 rounded-xl mb-3">
                          "{lead.message}"
                        </p>
                      )}

                      {/* Interactive Controls Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-3 mt-1 text-xs">
                        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
                          <span className="flex items-center gap-1">
                            Sheets Sync: 
                            {lead.sheetSynced ? (
                              <span className="text-emerald-400 font-bold">● Synced</span>
                            ) : (
                              <span className="text-amber-500 font-semibold">○ Offline</span>
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            Email Alert: 
                            {lead.emailSynced ? (
                              <span className="text-emerald-400 font-bold">● Sent</span>
                            ) : (
                              <span className="text-amber-500 font-semibold">○ Offline</span>
                            )}
                          </span>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2">
                          {/* Mark Contacted Button */}
                          <button
                            onClick={() => handleToggleContacted(lead.id)}
                            disabled={isTogglingContactedId === lead.id}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono cursor-pointer transition-all active:scale-95 flex items-center gap-1 ${
                              lead.contacted 
                                ? 'bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/25' 
                                : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {isTogglingContactedId === lead.id ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : lead.contacted ? (
                              'Mark Pending'
                            ) : (
                              'Mark Contacted'
                            )}
                          </button>

                          {/* Delete Lead Button */}
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            disabled={isDeletingId === lead.id}
                            className="p-1.5 bg-red-950/10 hover:bg-red-950/30 border border-red-500/15 hover:border-red-500/30 text-red-400 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead Permanent"
                          >
                            {isDeletingId === lead.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[10px] font-mono text-gray-600 select-none border-t border-white/5 bg-slate-950/10 z-10 relative">
        © 2026 CodyBrothers Secure Dashboard. Authorized administrators only.
      </footer>
    </div>
  );
};
