// Import für i18n-Kofiguration!
// Um next.config.js einzubinden 
// nötig für die Multilinguale Komponente
// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
module.exports = withNextIntl(nextConfig);