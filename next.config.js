/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [{
      source: '/backend/:slug*',
      destination: 'http://localhost:4020/:slug*'
    }]
  },
  env: {
    GOOGLE_CLIENT_ID: ``,
    GOOGLE_CLIENT_SECRET: ``,
    BACKEND_URL: '',
    SECRET: ``,
    RAZORPAY_KEY: ``,
    BASE_IMAGE: ``,
    NEXTAUTH_URL: ``
  }
}

module.exports = nextConfig