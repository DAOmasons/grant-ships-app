import { Json } from '../../types/common';

export const pinJSONToIPFS = async (content: Json) => {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`, // Replace [TOKEN] with your actual token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });
  return await res.json();
};

export const pinFileToIPFS = async (file: File) => {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`, // Replace [TOKEN] with your actual token
    },
    body,
  });
  return await res.json();
};
