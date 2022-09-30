const express = require('express');
const pdfservicesController = require('../controllers/pdfServices');

const router = express.Router();

// POST /pdf/createpdf


router.post('/createpdf', pdfservicesController.createFromTemplate);
// router.post('/createpdf', function(req, res) {
//     console.log(pdfservicesController.createFromTemplate);
//     pdfservicesController.createFromTemplate;   
// });

// // POST /pdf/convertdocx
// router.post('/convertdocx', pdfservicesController.convertDocxToPdf);

// // POST /pdf/convertHtml
//router.post('/convertHtml', pdfservicesController.convertHTMLToPdf);

module.exports = router;