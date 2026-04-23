import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { 
  User, Phone, Mail, LogOut, 
  Users, UserPlus, Trash2, ShieldCheck, Heart, Search, Filter, X, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminAddProfileModal from '../components/AdminAddProfileModal';

const RELIGIONS = ['All', 'Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist'];

const Dashboard: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Admin Search Filters
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('All');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [religion, setReligion] = useState('All');

  const fetchAdminProfiles = useCallback(async () => {
    setIsAdminLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '1000');
      if (search) params.set('search', search);
      if (gender !== 'All') params.set('gender', gender);
      if (minAge) params.set('minAge', minAge);
      if (maxAge) params.set('maxAge', maxAge);
      if (religion !== 'All') params.set('religion', religion);

      const res = await fetch(`https://dream-matrimony-server.onrender.com/api/profiles?${params.toString()}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setProfiles(data.profiles || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin profiles', err);
    } finally {
      setIsAdminLoading(false);
    }
  }, [search, gender, minAge, maxAge, religion]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminProfiles();
    }
  }, [user, fetchAdminProfiles]);

  const handleDeleteProfile = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;
    try {
      const res = await fetch(`https://dream-matrimony-server.onrender.com/api/profiles/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Profile deleted successfully');
        fetchAdminProfiles();
      } else {
        toast.error('Failed to delete profile');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleClearFilters = () => {
    setSearch('');
    setGender('All');
    setMinAge('');
    setMaxAge('');
    setReligion('All');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Not Logged In</h2>
          <p className="text-gray-500">Please log in to view your dashboard.</p>
          <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const activeFilterCount = [
    gender !== 'All', minAge !== '', maxAge !== '', religion !== 'All', search !== '',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 font-sans pb-24 md:pb-8">

      {/* Navbar */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size={36} className="group-hover:scale-105 transition-transform" />
            <span className="font-bold text-base text-gray-800 hidden sm:block font-serif">Dream Matrimony</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* Admin Badge */}
            {user.role === 'admin' && (
              <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </div>
            )}
            <Link to="/profiles" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-gray-100 hidden sm:block">
              Browse
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-full transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-5">

        {/* Dashboard Hero Card */}
        <div className="relative bg-gradient-to-r from-primary to-rose-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl shadow-primary/20">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0">
                {user.role === 'admin' ? (
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                ) : (
                  <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                )}
              </div>
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">
                  {user.role === 'admin' ? 'Platform Administrator' : 'Registered Visitor'}
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {user.name || 'Admin Panel'}
                </h1>
                <p className="text-white/70 text-sm mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {user.email}
                </p>
              </div>
            </div>

            {/* Stats pill */}
            {user.role === 'admin' && (
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-3 rounded-xl text-center shrink-0">
                <p className="text-2xl font-black text-white">{profiles.length}</p>
                <p className="text-white/70 text-xs font-semibold">Total Profiles</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Dashboard */}
        {user.role === 'admin' ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Top Toolbar */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-serif flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Manage Profiles
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 text-sm ${
                      showFilters || activeFilterCount > 0
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:block">Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setIsAddProfileModalOpen(true)}
                    className="bg-primary text-white px-3 py-2.5 sm:px-5 rounded-xl font-bold hover:bg-pink-700 active:scale-95 transition-all flex items-center gap-1.5 text-sm shadow-lg shadow-primary/20"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Quick Search bar (always visible) */}
              <div className="relative mt-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, occupation..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-gray-50"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Expandable Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-700">Advanced Filters</p>
                    {activeFilterCount > 0 && (
                      <button onClick={handleClearFilters} className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1">
                        <X className="w-3 h-3" /> Clear all
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm appearance-none"
                    >
                      <option value="All">All Genders</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                    <select
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm appearance-none"
                    >
                      {RELIGIONS.map(r => <option key={r} value={r}>{r === 'All' ? 'All Religions' : r}</option>)}
                    </select>
                    <input
                      type="number" placeholder="Min Age" value={minAge} min={18} max={70}
                      onChange={(e) => setMinAge(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                    <input
                      type="number" placeholder="Max Age" value={maxAge} min={18} max={70}
                      onChange={(e) => setMaxAge(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Profile List */}
            {isAdminLoading ? (
              <div className="py-16 text-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Loading profiles...</p>
              </div>
            ) : profiles.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <p className="font-semibold text-gray-600">No profiles found</p>
                {activeFilterCount > 0 && (
                  <button onClick={handleClearFilters} className="mt-2 text-primary font-bold text-sm hover:underline">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="py-3.5 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Profile</th>
                        <th className="py-3.5 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="py-3.5 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Details</th>
                        <th className="py-3.5 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles.map(p => (
                        <tr key={p._id} className="border-b border-gray-50 hover:bg-primary/5 transition-colors group">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <img src={p.profilePictureUrl} alt={p.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                                <p className="text-xs text-primary font-bold">DM-{p._id.slice(-6).toUpperCase()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            <p className="text-xs text-gray-600 flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400 shrink-0" />{p.email || 'N/A'}</p>
                            <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-1"><Phone className="w-3 h-3 text-gray-400 shrink-0" />{p.phone}</p>
                          </td>
                          <td className="py-3.5 px-5 text-xs text-gray-600">
                            <span className="font-semibold">{p.age}y</span> · {p.gender} · {p.religion}
                            <p className="text-gray-400 mt-0.5 truncate max-w-[130px]">{p.occupation}</p>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <div className="flex justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                              <Link to={`/profile/${p._id}`} className="p-2 text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button onClick={() => handleDeleteProfile(p._id)} className="p-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card List */}
                <div className="md:hidden divide-y divide-gray-50">
                  {profiles.map(p => (
                    <div key={p._id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 transition-colors">
                      <img src={p.profilePictureUrl} alt={p.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-gray-900 text-sm truncate">{p.name}</p>
                          <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full shrink-0">
                            {p.gender === 'Female' ? '👰' : '🤵'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {p.age}y · {p.religion} · <span className="text-primary font-semibold">DM-{p._id.slice(-6).toUpperCase()}</span>
                        </p>
                        <p className="text-xs text-gray-400 truncate">{p.phone}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Link to={`/profile/${p._id}`} className="w-9 h-9 flex items-center justify-center text-primary bg-primary/10 hover:bg-primary hover:text-white rounded-xl transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDeleteProfile(p._id)} className="w-9 h-9 flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Visitor Dashboard */
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-8 text-center py-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-serif mb-4">Ready to find your match?</h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-8">
              Your account is fully registered! You now have unrestricted access to browse our extensive catalog of verified matrimony profiles.
            </p>
            <Link
              to="/profiles"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-pink-700 transition-colors shadow-lg hover:shadow-xl hover:shadow-primary/20"
            >
              <Users className="w-5 h-5" />
              Browse Profiles Now
            </Link>
          </div>
        )}

      </main>

      {/* Mobile Bottom Action Bar (Admin only) */}
      {user.role === 'admin' && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-3 max-w-md mx-auto">
            <Link to="/profiles" className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors text-sm">
              <Eye className="w-4 h-4" /> Browse
            </Link>
            <button
              onClick={() => setIsAddProfileModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-pink-700 active:scale-95 transition-all shadow-lg shadow-primary/30 text-sm"
            >
              <UserPlus className="w-4 h-4" /> Add Profile
            </button>
          </div>
        </div>
      )}

      <AdminAddProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={() => setIsAddProfileModalOpen(false)}
        onSuccess={fetchAdminProfiles}
      />
    </div>
  );
};

export default Dashboard;
