import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Search, Briefcase, GraduationCap, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

interface Profile {
  _id: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  occupation: string;
  religion: string;
  height: string;
  profilePictureUrl: string;
  phone: string;
}

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const fetchProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '12');

      const res = await fetch(`https://dream-matrimony-server.onrender.com/api/profiles?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await res.json();
      setProfiles(data.profiles || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch profiles:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm shrink-0">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={40} className="shadow-sm group-hover:scale-105 transition-transform" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600 font-serif hidden md:block">
              Dream Matrimony
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>
      </header>

      {/* Banner for logged out users */}
      {!user && (
        <div className="bg-primary/10 border-b border-primary/20 p-4 text-center shrink-0">
          <p className="text-primary font-semibold">
            Showing 5 preview profiles. <Link to="/" className="underline font-bold hover:text-pink-700">Log in</Link> to see thousands more!
          </p>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-6xl flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            {isLoading ? 'Loading...' : `${total} ${total === 1 ? 'Profile' : 'Profiles'} Found`}
          </h2>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-pulse">
                <div className="flex gap-5 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
                <div className="h-12 bg-gray-100 rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && profiles.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm max-w-xl mx-auto mt-12">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No profiles found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any profiles at the moment.</p>
          </div>
        )}

        {/* Profile Cards Grid */}
        {!isLoading && profiles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <div key={profile._id} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                  <div className="flex gap-4 mb-4">
                    <Link 
                      to={`/profile/${profile._id}`}
                      className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100 relative bg-gray-100 block"
                    >
                      <img
                        src={profile.profilePictureUrl}
                        alt={profile.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=C2185B&color=fff&size=128`;
                        }}
                      />
                      <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                        {profile.gender === 'Female' ? '👰' : '🤵'}
                      </div>
                    </Link>
                    <div className="flex-1 pt-1 min-w-0">
                      <Link to={`/profile/${profile._id}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-0.5 truncate hover:text-primary transition-colors">{profile.name}</h3>
                      </Link>
                      <p className="text-sm text-primary font-semibold mb-1">{profile.age} yrs • {profile.religion}</p>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                         <span className="truncate">Kolkata</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-3 grid grid-cols-1 gap-2 text-xs mt-auto">
                    <div className="flex items-center gap-2 text-gray-700">
                      <GraduationCap className="w-4 h-4 text-primary/60 shrink-0" />
                      <span className="truncate">{profile.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Briefcase className="w-4 h-4 text-primary/60 shrink-0" />
                      <span className="truncate">{profile.occupation}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/profile/${profile._id}`}
                    className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Heart className="w-4 h-4" />
                    View Full Profile
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12 pb-12">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | string)[]>((acc, p, idx, arr) => {
                    if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === '...' ? (
                      <span key={`ellipsis-${idx}`} className="text-gray-400 px-1">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(Number(p))}
                        className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                          page === p
                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                            : 'border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ProfilesPage;
