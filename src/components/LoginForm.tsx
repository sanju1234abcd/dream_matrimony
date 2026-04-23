import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await fetch('https://dream-matrimony-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      // Store user in context
      login(data.user);
      
      setIsLoading(false);
      toast.success(data.message || 'Logged in successfully!');
      onClose();
      
    } catch (error: any) {
      toast.error(error.message || 'Login failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 relative max-w-md w-full">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={onSwitchToRegister}
            className="text-primary font-bold hover:underline"
          >
            Register Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
