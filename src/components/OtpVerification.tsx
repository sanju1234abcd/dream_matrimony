import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X, CheckCircle2 } from 'lucide-react';

interface OtpVerificationProps {
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length < 6) {
      toast.error('Please enter the full 6-digit OTP.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://dream-matrimony-server.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      setIsSuccess(true);
      toast.success('Registration completed successfully!');
      
      // Call onSuccess after a small delay to show success state
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (error: any) {
      toast.error(error.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verified!</h2>
        <p className="text-gray-600 mb-6">Your account has been successfully created.</p>
        <p className="text-sm text-gray-500 animate-pulse">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold text-primary mb-2 text-center">Verify Email</h2>
      <p className="text-center text-gray-600 text-sm mb-8">
        We've sent a 6-digit code to <br/><span className="font-semibold text-gray-800">{email}</span>
      </p>

      <form onSubmit={handleVerify}>
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          ))}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify & Complete'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Didn't receive the code? <button className="text-primary font-semibold hover:underline">Resend</button>
      </div>
    </div>
  );
};

export default OtpVerification;
