/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const nextConfig = {
	// Uncomment the line below ONLY if you want static export (not recommended with API rewrites)
	// output: 'export',
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
			},
		],
		// If using static export, also add:
		// unoptimized: true,
	},
	skipTrailingSlashRedirect: true,
	async rewrites() {
		return [
			{
				source: "/api/v1/:path*/",
				destination: `${API_URL}/api/v1/:path*/`,
			},
			{
				source: "/api/v1/:path*",
				destination: `${API_URL}/api/v1/:path*`,
			},
		];
	},
};

export default nextConfig;
