'use strict';

/**
 * review controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils')
const { contentAPI } = sanitize;

module.exports = createCoreController('api::review.review', ({ strapi }) => ({
  async create(ctx) {

    const contentType = strapi.contentType('api::review.review')
    const { title, slug } = ctx.request.body;

    const titleEntries = await strapi.db.query('api::review.review').findMany({
      where: {
        title,
      },
    });
    if (titleEntries.length > 0) {
      ctx.badRequest('This review already exists');
    }

    const slugEntries = await strapi.db.query('api::review.review').findMany({
      where: {
        slug,
      },
    });
    if (slugEntries.length > 0) {
      const random = Math.floor(Math.random() * 100) + 1;
      slug = slug + random;
    }

    const entry = await strapi.service('api::review.review').create({
      data: {
        ...ctx.request.body,
        slug,
      },
    });

    return await contentAPI.output(entry, contentType, ctx.state.auth);
  },
  async findBySlug(ctx) {
    try {
      const contentType = strapi.contentType('api::review.review')
      const entry = await strapi.db.query('api::review.review').findOne({
        where: {
          slug: ctx.params.slug,
        },
      });

      return await contentAPI.output(entry, contentType, ctx.state.auth);
    } catch (error) {
      ctx.badRequest(error);
    }
  },
}));
