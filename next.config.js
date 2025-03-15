/**
 * Next.JS Configuration
 * @link https://nextjs.org/docs/app/building-your-application/configuring
 * @type {import('next').NextConfig}
 */
export default {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}
