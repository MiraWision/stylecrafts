/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://stylecrafts.app',
  generateRobotsTxt: true,
  priority: 0.5,
  transform: async (config, path) => {
    let priority = 0.5;

    if (path === '/') {
      priority = 0.7;
    } else if (path.startsWith('/images') || path.startsWith('/colors')) {
      priority = 1;
    } else if (path.startsWith('/games')) {
      priority = 0.9;
    } else if (path.startsWith('/blog') || path.startsWith('/cheatsheets')) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
