import nextra from "nextra";

const isProduction = process.env.NODE_ENV === "production";
const assetPrefix = isProduction ? "/dom-control-js" : "";

export default {
  ...nextra({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.jsx",
  }),
  images: {
    unoptimized: true,
  },
  basePath: assetPrefix,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};
