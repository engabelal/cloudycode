// Site Configuration
const siteConfig = {
  // Site Info
  siteName: 'Cloudycode',
  siteUrl: 'https://cloudycode.dev',
  siteDescription: 'DevOps & Cloud Engineer Portfolio',
  
  // Author Info
  author: {
    name: 'Ahmed Belal',
    email: 'eng.abelal@gmail.com',
    title: 'DevOps & Cloud Engineer',
    experience: '12+',
  },
  
  // Social Links
  social: {
    github: 'https://github.com/engabelal',
    linkedin: 'https://www.linkedin.com/in/engabelal/',
    blog: 'https://blog.cloudycode.dev',
  },
  
  // SEO
  seo: {
    keywords: [
      'DevOps Engineer',
      'Cloud Engineer',
      'AWS',
      'Azure',
      'Kubernetes',
      'Terraform',
      'Docker',
      'CI/CD',
      'Ansible',
      'Infrastructure as Code'
    ],
  },
  
  // Analytics
  analytics: {
    plausible: {
      domain: 'cloudycode.dev',
      enabled: true,
    },
  },
  
  // PWA
  pwa: {
    name: 'Cloudycode',
    shortName: 'Cloudycode',
    themeColor: '#8b5cf6',
    backgroundColor: '#0f0f23',
  },
  
  // Version
  version: '6.1.0',
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}
