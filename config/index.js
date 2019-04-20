export const config = {
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
        as: page => (page > 1 ? `/page/${page}` : '/blog')
      }
    }
  },
  blog: {
    itemsPerPage: 4,
    categories: {
      raceday: 'Raceday.me',
      runverter: 'Runverter',
      stickerlicious: 'Stickerlicious',
      programming: 'Programming',
      general: 'General'
    }
  }
};
