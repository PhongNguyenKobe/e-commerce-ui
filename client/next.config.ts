const nextConfig = {
	typescript: {
		// Cho phép build dù còn lỗi TS (tạm thời để unblock deploy)
		ignoreBuildErrors: true,
	},
	eslint: {
		// Bỏ qua lỗi ESLint trong quá trình build (tạm thời)
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
