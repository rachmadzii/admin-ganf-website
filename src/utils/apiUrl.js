export const getUrl = () => {
  const url = window.location.href;

  if (url.includes('localhost')) return 'http://localhost:5000';
  return 'https://ganf-backend.vercel.app';
};
