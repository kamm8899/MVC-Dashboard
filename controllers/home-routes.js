//user-facing routes such as homepage and login page
//setup main page
const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('homepage');
});

module.exports = router;