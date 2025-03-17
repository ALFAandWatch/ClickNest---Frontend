import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactStrictMode: true,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'http2.mlstatic.com',
         },
         {
            protocol: 'https',
            hostname: 'www.apple.com',
         },
         {
            protocol: 'https',
            hostname: 'www.etech.com.uy',
         },
         {
            protocol: 'https',
            hostname: 'f.fcdn.app',
         },
         {
            protocol: 'https',
            hostname: 'www.zonatecno.com.uy',
         },
         {
            protocol: 'https',
            hostname: 'www.pngplay.com',
         },
         {
            protocol: 'https',
            hostname: 'www.asus.com',
         },
         {
            protocol: 'https',
            hostname: 'p2-ofp.static.pub',
         },
         {
            protocol: 'https',
            hostname: 'products.shureweb.eu',
         },
         {
            protocol: 'https',
            hostname: 'bryanpfeiffer.com',
         },
         {
            protocol: 'https',
            hostname: 'www.hp.com',
         },
         {
            protocol: 'https',
            hostname: 'www.lg.com',
         },
         {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
         },
         {
            protocol: 'https',
            hostname: 'www.insight.com',
         },
         {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
         },
         {
            protocol: 'https',
            hostname: 'localhost',
         },
      ],
   },
};

export default nextConfig;
