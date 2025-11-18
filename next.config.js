const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],
  },
  output: 'standalone',
}

module.exports = withNextIntl(nextConfig)

