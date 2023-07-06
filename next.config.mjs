import nextra from 'nextra';

const isProduction = process.env.NODE_ENV === 'production';
const assetPrefix = isProduction ? '/dom-control-js' : '';

const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: assetPrefix,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};

const config = {
  ...nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
    staticImage: true,
  })(),
};

export default { ...nextConfig, ...config };
