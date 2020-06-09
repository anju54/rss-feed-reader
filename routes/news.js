const express = require('express');

const newsController = require('../controller/news');

const router = express.Router();

router.get('/all/:pageNum', newsController.getAllNews);

router.get("/category/:category/:pageNum", newsController.getSetOfNewsByCategory);

router.get("/top-news", newsController.getTopNews);

router.get("/rss/:rss/:pageNum",newsController.invokeGetNewsByRSSProvider);

module.exports = router;