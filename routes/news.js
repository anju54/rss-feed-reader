const express = require('express');

const newsController = require('../controller/news');

const router = express.Router();

router.get('/all', newsController.getAllNews);

router.get("/:category/:pageNum", newsController.getSetOfNewsByCategory);

router.get("/top-news", newsController.getTopNews);

module.exports = router;