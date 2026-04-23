import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, Briefcase, GraduationCap, ArrowLeft, 
  Mail, Phone, Calendar, User as UserIcon, MessageCircle,
  Share2, ShieldCheck, Info, Lock
} from 'lucide-react';
import Logo from '../components/Logo';

interface Profile {
  _id: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  occupation: string;
  religion: string;
  profilePictureUrl: string;
  phone?: string;
  email?: string;
  dob: string;
  createdAt: string;
  description?: string;
  height?: string;
  showContactInfo: boolean;
}

const UserProfilePage: React.FC = () => {
  const { profileID } = useParams<{ profileID: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileDetail = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://dream-matrimony-server.onrender.com/api/profiles/${profileID}`, {
          credentials: 'include'
        });
        if (!res.ok) {
          throw new Error('Profile not found');
        }
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (profileID) {
      fetchProfileDetail();
    }
  }, [profileID]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading profile details...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-500 mb-8">{error || 'Something went wrong while fetching the profile.'}</p>
          <button 
            onClick={() => navigate('/profiles')}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg"
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  const detailGroups = [
    {
      title: "Basic Details",
      items: [
        { icon: <UserIcon className="w-5 h-5 text-primary" />, label: "Gender", value: profile.gender },
        { icon: <Calendar className="w-5 h-5 text-primary" />, label: "Age", value: `${profile.age} Years` },
        ...(profile.height ? [{ icon: <UserIcon className="w-5 h-5 text-primary" />, label: "Height", value: profile.height }] : []),
        { icon: <Heart className="w-5 h-5 text-primary" />, label: "Religion", value: profile.religion },
      ]
    },
    {
      title: "Professional & Education",
      items: [
        { icon: <Briefcase className="w-5 h-5 text-primary" />, label: "Occupation", value: profile.occupation },
        { icon: <GraduationCap className="w-5 h-5 text-primary" />, label: "Education", value: profile.education },
      ]
    },
    {
      title: "Contact Information",
      items: profile.showContactInfo ? [
        { icon: <Mail className="w-5 h-5 text-primary" />, label: "Email Address", value: profile.email },
        { icon: <Phone className="w-5 h-5 text-primary" />, label: "Phone Number", value: profile.phone },
      ] : [
        { icon: <Lock className="w-5 h-5 text-gray-400" />, label: "Email Address", value: "Hidden for privacy (Admin only)" },
        { icon: <Lock className="w-5 h-5 text-gray-400" />, label: "Phone Number", value: "Hidden for privacy (Admin only)" },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={40} className="shadow-sm group-hover:scale-105 transition-transform" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600 font-serif hidden sm:block">
              Dream Matrimony
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-gray-50 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Avatar & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 mb-6 group">
                <img 
                  src={profile.profilePictureUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-black text-gray-900">{profile.name}</h2>
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-primary font-bold tracking-wide uppercase text-xs">
                  ID: DM-{profile._id.slice(-6).toUpperCase()}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {profile.showContactInfo && (
                  <a href={`mailto:${profile.email}`} className="w-full bg-primary text-white border-2 border-primary py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <MessageCircle className="w-5 h-5" />
                    Send Message (Admin)
                  </a>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-primary" />
                 Safe Matrimony Tip
               </h3>
               <p className="text-gray-300 text-sm leading-relaxed italic">
                 "Always meet in public places and never share your sensitive financial details with anyone you meet online."
               </p>
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-6 font-serif">About Profile</h3>
                {profile.description ? (
                  <p className="text-gray-600 leading-relaxed text-lg italic">"{profile.description}"</p>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-lg italic">
                    "I am a {profile.gender.toLowerCase()} who values tradition and modern outlook. Looking for a partner who is {profile.occupation.toLowerCase()} or from a similar professional background."
                  </p>
                )}
                
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/10">Verified User</span>
                  <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">Premium Member</span>
                  <span className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-bold border border-green-100">Online Now</span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detailGroups.map((group, idx) => (
                <div key={idx} className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 ${idx === detailGroups.length - 1 ? 'md:col-span-2' : ''}`}>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    {group.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    {group.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                          <p className="text-gray-800 font-bold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Status */}
            <div className="bg-gray-100 rounded-[2rem] p-6 text-center border border-gray-200/50">
               <p className="text-gray-500 text-sm">
                 Profile created on: {new Date(profile.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
               </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
