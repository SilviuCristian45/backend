export default {
    /**
     * Simple example.
     * Every monday at 1am.
     */

    myJob: {
        task: async ({strapi}) => {
            const entries = await strapi.db.query('api::post.post').findMany();

            // Loop through each entry and increment the views
            for (const entry of entries) {
                // Increment the views by 1
                await strapi.db.query('api::post.post').update({
                    where: { id: entry.id },
                    data: {
                        views: entry.views + 1,
                    },
                });
            }
        },
        options: {
            rule: '*/1 * * * *',
        },
    },
};