/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH || "/velora-sites";

const nextConfig = {
  output: "export",
  basePath: isGithubPages ? githubPagesBasePath : "",
  assetPrefix: isGithubPages ? `${githubPagesBasePath}/` : "",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
