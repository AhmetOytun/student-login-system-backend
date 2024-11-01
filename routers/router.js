const router = require('express').Router();

/* user router */
router.use('/user', require('./userRouter/route.js'));
router.use('/announcements', require('./announcementRouter/route.js'));
router.use('/students', require('./studentRouter/route.js'));
router.use('/teachers', require('./teacherRouter/route.js'));
router.use('/todos', require('./todoRouter/route.js'));

module.exports = router;