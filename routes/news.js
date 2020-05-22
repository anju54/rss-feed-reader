const express = require('express');

const newsController = require('../controller/news');

const router = express.Router();

router.get('/all', newsController.getAllNews);

router.get("/:category/:limit", newsController.getSetOfNewsByCategory);

module.exports = router;