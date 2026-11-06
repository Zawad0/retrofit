import { API_BASE } from './api.js';

export async function uploadProductImage(file, token) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPEG, PNG, or WebP image.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be 5 MB or smaller.');
  const signedResponse = await fetch(`${API_BASE}/seller/cloudinary-signature`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
  const signed = await signedResponse.json();
  if (!signedResponse.ok) throw new Error(signed.message || 'Could not start image upload.');
  const body = new FormData();
  body.append('file', file); body.append('api_key', signed.apiKey); body.append('timestamp', String(signed.timestamp)); body.append('signature', signed.signature); body.append('folder', signed.folder);
  if (signed.uploadPreset) body.append('upload_preset', signed.uploadPreset);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(signed.cloudName)}/image/upload`, { method: 'POST', body });
  const result = await response.json();
  if (!response.ok || !result.secure_url) throw new Error(result.error?.message || 'Cloudinary image upload failed.');
  return result.secure_url;
}
