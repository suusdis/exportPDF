const express = require('express');

const AzureController = require('../controllers/azure');

const router = express.Router();

// POST /azure/list_content
router.post('/list_content', AzureController.listAllContent);

// router.post('/getfile', AzureController.getFile);


module.exports = router;