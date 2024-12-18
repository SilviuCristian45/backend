/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post',  ({ strapi }) => ({
    async totalViews(ctx) {
        const entries = await strapi.db.query("api::post.post").findMany();
        const totalViews = entries.reduce((acc, cur) => { return acc + cur.views; }, 0);
        console.log('totalViews', totalViews);
        ctx.body = {
            totalViews: totalViews,
        };
    },
}));