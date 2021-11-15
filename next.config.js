const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
})
