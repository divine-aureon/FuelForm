import Head from 'next/head';

export default function ManifestMeta() {
  return (
    <>
      <link rel="manifest" href="/manifest.json" crossOrigin="anonymous" />
      <meta name="theme-color" content="#00ffcc" />
      <link rel="icon" href="/icons/icon-512x512.png" />
      <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
      </>
  );
}