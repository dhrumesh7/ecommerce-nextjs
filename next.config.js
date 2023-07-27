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
    GOOGLE_CLIENT_ID: `695977102477-tt3qn74pjctsp71ahvppegk18jsm60q8.apps.googleusercontent.com`,
    GOOGLE_CLIENT_SECRET: `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`,
    BACKEND_URL: 'http://3.111.148.12:4020',
    SECRET: `@!Ecom_dev@NexT@%$!+*&Dk`,
    RAZORPAY_KEY: `rzp_test_wSKSrOLwNIS37y`,
    BASE_IMAGE: `https://arya-ecom.s3.ap-south-1.amazonaws.com`,
    NEXTAUTH_URL: `http://ec2-3-111-148-12.ap-south-1.compute.amazonaws.com:3000`
  }
}

module.exports = nextConfig