const express = require('express');

const newsController = require('../controller/news');

const router = express.Router();

router.get('/all/:pageNum', newsController.getAllNews);

router.get("/category/:category/:pageNum", newsController.getSetOfNewsByCategory);

router.get("/top-news", newsController.getTopNews);

router.get("/rss/:rss/:pageNum",newsController.invokeGetNewsByRSSProvider);

//router.get("/total-page/rss/:rss",newsController.invokeGetCountOfRecords);

//router.get("/total-page/category/:category",newsController.invokeCountOfCategoryRecords);

//router.get("/page-count",newsController.invokeGetCountOfAllRecords);


module.exports = router;