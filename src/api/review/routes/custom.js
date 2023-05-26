module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/reviews/by-slug/:slug',
      handler: 'review.findBySlug',
      config: {
        auth: false
      }
    },
  ]
}
