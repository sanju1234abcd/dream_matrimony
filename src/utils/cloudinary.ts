export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Use mock or real cloudinary variables
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'mock_cloud_name';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'mock_preset';

  // Check 4MB size limit
  if (file.size > 4 * 1024 * 1024) {
    throw new Error('File size exceeds the 4MB limit.');
  }

  // If using mock credentials, just return a dummy URL instead of actually uploading
  if (cloudName === 'mock_cloud_name') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://via.placeholder.com/300x300.png?text=Mock+Profile+Pic');
      }, 1000);
    });
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name',cloudName);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to Cloudinary.');
  }

  const data = await response.json();
  return data.url;
};
