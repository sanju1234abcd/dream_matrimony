import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

interface RegistrationFormProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://dream-matrimony-server.onrender.com/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      toast.success('Registration details saved! Please verify your email.');
      onSuccess(formData.email);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Create Account</h2>
      <p className="text-center text-gray-500 mb-6">Register to view full profiles</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              value={formData.phone} 
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
              minLength={6}
              maxLength={8}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? 'Processing...' : 'Continue to Verification'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
