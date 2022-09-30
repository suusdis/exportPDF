const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");

const AzureHelper = require('../helpers/azure');
const PDFHelper = require('../helpers/pdfServices');
const fileHelper = require('../helpers/file');

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}
  // module.exports = ;

exports.createFromTemplate = (req, res, next) => {
    // Setup input data for the document merge process
    const environment = req.body.environment;
    const TemplateFile = req.body.inputFile;
    const OutputFile =  req.body.outputFile;
    const folderPath = environment + "/templates"; 

    let jsonDataForMerge = {};
    jsonDataForMerge = req.body.data;

    AzureHelper.callbackFunc(async function() {
        try {
            switch(getExtension(TemplateFile))
            {
                case ".docx":
                    await AzureHelper.getFile(folderPath, TemplateFile);
                    console.log("Downloaded template from azure, env: " + environment);
                    await PDFHelper.fillTemplateWithData(environment, TemplateFile, OutputFile, jsonDataForMerge);
                    res.status(200).json({
                        code: 200,
                        message: 'PDF generation started. The file will be available as: ' + OutputFile
                    });
                    break;
                case ".zip":
                    await AzureHelper.getFile(folderPath, TemplateFile);
                    console.log("Downloaded template from azure, env: " + environment);
                    await PDFHelper.ConvertHTMLToPdf(environment, TemplateFile, OutputFile, jsonDataForMerge);

                    res.status(200).json({
                        code: 200,
                        message: 'Conversion startedFile will be available as: ' + OutputFile
                    });
                    break;
                default:
                    res.status(400).json({
                        code: 400,
                        message: 'Document is not a supported file. '
                    });
                    break;
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                code: 400,
                message: 'Error: ' + error
            });
        }
    })
}


exports.convertDocxToPdf = (req, res, next) => {
    const InputDocx = req.body.inputFile;
    const OutputFile =  req.body.outputFile;
    const folderPath = req.body.environment + "/files";

    AzureHelper.callbackFunc(async function () {
        try {
            await AzureHelper.getFile(folderPath, InputDocx);
            await PDFHelper.convertDocxToPDF(req.body.environment, InputDocx, OutputFile);

            res.status(200).json({
                code: 200,
                message: 'Conversion startedFile will be available as: ' + OutputFile
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                code: 400,
                message: 'Error: ' + error
            });
        }
    })
};

