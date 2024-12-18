export default {
    routes: [
        {
            method: 'GET',
            path: '/total-views',
            handler: 'api::post.post.totalViews', // Ensure the controller has this method
            config: {
                auth: false, // Disable authentication for this route
            },
        },
    ],
};