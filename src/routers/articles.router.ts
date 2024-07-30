import express from 'express'
const { cryptoController } = require("../controllers/crypto.controllers");
const { cryptoCacheMiddleware } = require("../middleware/crypto.cache");

import * as articlesController from '../controllers/articles.controller'

const router = express.Router()

/* GET articles */
router.get('/', articlesController.getAll)

/* GET article by id */

router.get("/whatever", (req, res) => {
    res.send("Cache Project Home Page");
    res.status(200);
});
router.get("/crypto", cryptoCacheMiddleware, cryptoController);

router.get('/:id', articlesController.getById)
export { router as default }
