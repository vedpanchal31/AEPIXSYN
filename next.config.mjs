/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "./dist",
  // We keep React Router during the initial migration by serving one catch-all page.
  trailingSlash: true,
  experimental: {
    // The Codex sandbox blocks some localhost port bindings used by build workers.
    webpackBuildWorker: false,
    // Prefer worker_threads over child_process workers in restricted sandboxes.
    workerThreads: true,
    // Reduce parallelism to avoid spawning many workers.
    cpus: 1,
  },
};

export default nextConfig;
