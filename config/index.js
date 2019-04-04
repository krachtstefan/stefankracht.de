export const config = {
  routing: {
    blogPost: {
      nextLink: {
        href: url => `/post?url=${url}`,
        as: url => `/p/${url}`
      }
    },
    blogList: {
      nextLink: {
        href: page => (page > 1 ? `?page=${page}` : '/'),
        as: page => (page > 1 ? `/page/${page}` : '/')
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
