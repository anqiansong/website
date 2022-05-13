// @ts-check
const path = require('path')
const friendLinks = [
  {
    label: 'go-zero',
    to: 'https://go-zero.dev/',
  },
]
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Keson 的博客',
  titleDelimiter: '-',
  url: 'https://keson.cn',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'anqiansong', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  // @ts-ignore
  themeConfig: {
    image: 'img/keson.jpg',
    metadata: [
      {
        name: 'keywords',
        content: 'keson, anqiansong, go, golang, goctl, go-zero, 后端',
      },
    ],
    hideableSidebar: true,
    navbar: {
      title: 'Keson',
      logo: {
        alt: 'Keson',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      items: [
        {
          label: '归档',
          to: 'archive',
          position: 'right',
        },
        {
          label: '博客',
          position: 'right',
          to: '/blog',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '社交媒体',
          items: [
            {
              label: '首页',
              to: '/',
            },
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/anqiansong',
            },
          ],
        },
        {
          title: '友情链接',
          items: friendLinks,
        },
      ],
      copyright: `<p>Copyright © ${new Date().getFullYear()} Keson Built with Docusaurus.</p>`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java', 'php'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    zoomSelector: '.markdown :not(em) > img',
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    // googleAnalytics: {
    //   trackingID: "UA-118572241-1",
    //   anonymizeIP: true, // Should IPs be anonymized?
    // },
    // gtag: {
    //   trackingID: "G-6PSESJX0BM",
    //   // Optional fields.
    //   anonymizeIP: true, // Should IPs be anonymized?
    // },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
          showLastUpdateTime: true,
        },
        blog: {
          path: 'blog',
          routeBasePath: '/',
          blogSidebarTitle: '近期文章',
          blogSidebarCount: 5,
          postsPerPage: 10,
          // remarkPlugins: [require("remark-math")],
          // rehypePlugins: [require("rehype-katex")],
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          feedOptions: {
            type: 'all',
            title: 'Keson',
            copyright: `Copyright © ${new Date().getFullYear()} Keson Built with Docusaurus.<p></p>`,
          },
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        // debug: true,
      }),
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    path.resolve(__dirname, './src/plugin/plugin-baidu-analytics'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    // path.resolve(__dirname, "./src/plugin/plugin-onesignal-push"),
    // "docusaurus2-dotenv",
    '@docusaurus/plugin-ideal-image',
    path.resolve(__dirname, './src/plugin/plugin-image-zoom'),
    path.resolve(__dirname, './src/plugin/plugin-latest-docs'),
    // [
    //   "@easyops-cn/docusaurus-search-local",
    //   {
    //     hashed: true,
    //     // indexPages: true,
    //     blogRouteBasePath: "/",
    //     language: ["en", "zh"],
    //   },
    // ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/keson.jpg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // 您的 PWA Manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(51 139 255)',
          },
        ],
      },
    ],
  ],
  stylesheets: [
    // {
    //   rel: "preconnect",
    //   href: "https://fonts.gstatic.com",
    //   type: "text/css",
    // },
    /* {
      href: "/katex/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    }, */
    // {
    //   href: "https://fonts.font.im/css?family=Raleway:500,700&display=swap",
    //   type: "text/css",
    //   rel: "stylesheet",
    // },
    // {
    //   href: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
    //   type: "text/css",
    //   rel: "stylesheet",
    // },
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },
  onBrokenLinks: 'ignore',
}

module.exports = config
