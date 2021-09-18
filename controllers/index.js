//add router for home routes
const router = require('../../../modules/module-14/just_tech_news_2/controllers/dashboard-routes.js');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);