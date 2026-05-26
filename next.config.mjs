/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  basePath: isGithubPages ? "/velora-web" : "",
  assetPrefix: isGithubPages ? "/velora-web/" : "",
  turbopack: {
    root: "C:/Users/Noor/Documents/jishan.builds",
  },
};

export default nextConfig;
