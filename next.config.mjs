/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Responsive srcSet breakpoints — next/image uses these for all images.
    // Matches common mobile → desktop widths for Cloudinary responsive delivery.
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
