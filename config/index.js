export const config = {
  googleAnalytics: {
    trackingId: 'UA-748711-5'
  },
  routing: {
    baseUrl: 'https://stefankracht.now.sh',
    blogPost: {
      nextLink: {
        href: url => `/post?url=${url}`,
        as: url => `/p/${url}`
      }
    },
    blogList: {
      nextLink: {
        href: page => (page > 1 ? `/blog?page=${page}` : '/blog'),
        as: page => (page > 1 ? `/blog/${page}` : '/blog')
      }
    },
    blogCategory: {
      nextLink: {
        href: (category, page) =>
          page > 1
            ? `/blog?category=${category}&page=${page}`
            : `/blog?category=${category}`,
        as: (category, page) =>
          page > 1 ? `/blog/${category}/${page}` : `/blog/${category}`
      }
    }
  },
  blog: {
    itemsPerPage: 4,
    categories: {
      raceday: 'Raceday.me',
      runverter: 'Runverter.io',
      stickerlicious: 'Stickerlicious',
      programming: 'Programming',
      general: 'General'
    }
  }
};
