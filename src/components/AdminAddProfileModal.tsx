import React, { useState, useRef } from 'react';
import { X, UserPlus, Upload, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminAddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const HEIGHTS: string[] = [];
for (let f = 4; f <= 6; f++) {
  for (let i = 0; i <= 11; i++) {
    HEIGHTS.push(`${f}' ${i}"`);
  }
}
HEIGHTS.push(`7' 0"`);

const AdminAddProfileModal: React.FC<AdminAddProfileModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Female',
    dob: '',
    height: "5' 5\"",
    religion: 'Hindu',
    education: '',
    occupation: '',
    phone: '',
    email: '',
    description: '',
  });
  
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePictureFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file);
    // Using an unsigned upload preset - this needs to be created in the Cloudinary dashboard if not existing
    data.append('upload_preset', 'first_time_using_cloudinary'); 
    data.append('cloud_name', 'dxm27kskt'); 

    const res = await fetch('https://api.cloudinary.com/v1_1/dxm27kskt/image/upload', {
      method: 'POST',
      body: data
    });
    
    if (!res.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }
    
    const json = await res.json();
    return json.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profilePictureFile) {
      toast.error('Please upload a profile picture.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      toast.loading('Uploading image...', { id: 'upload-toast' });
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(profilePictureFile);
      toast.success('Image uploaded!', { id: 'upload-toast' });

      // 2. Submit to our Backend
      const finalPayload = {
        ...formData,
        profilePictureUrl: imageUrl
      };

      const res = await fetch('https://dream-matrimony-server.onrender.com/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(finalPayload)
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success('Profile created successfully!');
        
        // Reset form completely
        setFormData({
          name: '', gender: 'Female', dob: '', height: '', religion: 'Hindu', 
          education: '', occupation: '', phone: '', email: '', description: ''
        });
        setProfilePictureFile(null);
        setPreviewUrl(null);
        
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || 'Failed to create profile');
      }
    } catch (err: any) {
      toast.dismiss('upload-toast');
      toast.error(err.message || 'An error occurred during profile creation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-serif">Add New Profile</h2>
              <p className="text-xs text-gray-500 font-medium">Administrator Tool</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto flex-1">
          <form id="add-profile-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth *</label>
                  <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Gender *</label>
                  <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Religion *</label>
                  <select required name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50">
                    {['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Height *</label>
                  <select required name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50">
                    <option value="" disabled>Select Height</option>
                    {HEIGHTS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Professional & Contact */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Professional & Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Education *</label>
                  <input required type="text" name="education" value={formData.education} onChange={handleChange} placeholder="e.g. B.Tech, MBA" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Occupation *</label>
                  <input required type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g. Software Engineer" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Media & About */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b pb-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Media & About
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Profile Picture *</label>
                  
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden cursor-pointer hover:border-primary hover:bg-primary/5 transition-all shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center text-gray-400">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <span className="text-xs font-semibold">Upload Photo</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*"
                        className="hidden" 
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm text-sm"
                      >
                        <Upload className="w-4 h-4" />
                        Choose Local Image
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: JPG, PNG, WEBP. Max size: 5MB.<br/>
                        Image will be uploaded directly to Cloudinary.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">About Profile (Max 120 chars) *</label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} maxLength={120} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 resize-none"></textarea>
                  <p className="text-xs text-gray-500 mt-1 text-right">{formData.description.length}/120</p>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            form="add-profile-form"
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <UserPlus className="w-5 h-5" />
            )}
            {isLoading ? 'Creating...' : 'Create Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProfileModal;
