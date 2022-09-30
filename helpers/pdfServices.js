const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
const AzureHelper = require('../helpers/azure');
const fileHelper = require('../helpers/file');

const fs = require('fs')

module.exports = {
    getCredentials: function () {
        // Create credentials instance.
        const credentials =
            PDFServicesSdk.Credentials.serviceAccountCredentialsBuilder()
                .fromFile('./keys/pdfservices-api-credentials.json')
                .build();

        return credentials;
    },
    fillTemplateWithData: async function (folderPath, TemplateFile, OutputFile, jsonDataForMerge) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        try {
            // Initial setup, get credentials instance.
            const credentials = this.getCredentials();

            // Create an ExecutionContext using credentials
            const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

            // Create a new DocumentMerge options instance
            const documentMerge = PDFServicesSdk.DocumentMerge,
                documentMergeOptions = documentMerge.options,
                options = new documentMergeOptions.DocumentMergeOptions(
                    jsonDataForMerge,
                    documentMergeOptions.OutputFormat.PDF
                );

            // Create a new operation instance using the options instance
            const documentMergeOperation = documentMerge.Operation.createNew(options);

            // Set operation input document template from a source file.
            const input = PDFServicesSdk.FileRef.createFromLocalFile(
                'files/' + TemplateFile
            );
            documentMergeOperation.setInput(input);

            // Execute the operation and Save the result to the specified location.
            documentMergeOperation
                .execute(executionContext)
                .then((result) => result.saveAsFile('temp/' + OutputFile))
                .then(() => console.log("done"))
                .then(() => { AzureHelper.uploadFile(folderPath,  OutputFile); })
                //.then(() => console.log("Deleting temp template file"))
                //.then(() => { fileHelper.deleteLocalFile('temp/' + TemplateFile); })
                .catch((err) => {
                    if (
                        err instanceof PDFServicesSdk.Error.ServiceApiError ||
                        err instanceof PDFServicesSdk.Error.ServiceUsageError
                    ) {
                        console.log("Exception encountered while executing operation", err);
                    } else {
                        console.log("Exception encountered while executing operation", err);
                    }
                });
        } catch (err) {
            console.log("Exception encountered while executing operation", err);
        }
    },
    convertDocxToPDF: async function (folderPath, InputDocx, OutputFile) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        try { 
            // Initial setup, create credentials instance.
            const credentials = this.getCredentials();
    
            // Create an ExecutionContext using credentials and create a new operation instance.
            const executionContext =
                PDFServicesSdk.ExecutionContext.create(credentials),
                createPdfOperation = PDFServicesSdk.CreatePDF.Operation.createNew();
    
            // Set operation input from a source file.
            const input = PDFServicesSdk.FileRef.createFromLocalFile(
                'temp/' + InputDocx
            );
            createPdfOperation.setInput(input);
    
            // Execute the operation and Save the result to the specified location.
            createPdfOperation
                .execute(executionContext)
                .then((result) => result.saveAsFile('temp/' + OutputFile))
                .then(() => { AzureHelper.uploadFile(folderPath,  OutputFile); })
                .catch((err) => {
                    if (
                        err instanceof PDFServicesSdk.Error.ServiceApiError ||
                        err instanceof PDFServicesSdk.Error.ServiceUsageError
                    ) {
                        console.log("Exception encountered while executing operation", err);
                    } else {
                        console.log("Exception encountered while executing operation", err);
                    }
                });
        } catch (err) {
            console.log("Exception encountered while executing operation", err);
        }
    },
    ConvertHTMLToPdf: async function (folderPath, InputHtml, OutputFile)
    {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const setCustomOptions = (htmlToPDFOperation) => {
            // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
            const pageLayout = new PDFServicesSdk.CreatePDF.options.html.PageLayout();
            pageLayout.setPageSize(15, 11.5);
            
            //Set the dataToMerge field that needs to be populated in the HTML before its conversion.
            const dataToMerge = {
                "header": "TESTINGGGG",
                "title": "Klopt dit?",
                "year": "2022"
            };
            // Set the desired HTML-to-PDF conversion options.
            const htmlToPdfOptions = new PDFServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
                .includesHeaderFooter(false)
                .withPageLayout(pageLayout)
                .withDataToMerge(dataToMerge)
                .build();
            htmlToPDFOperation.setOptions(htmlToPdfOptions); 
        };
        
        try {
            // Initial setup, create credentials instance.
            const credentials =  this.getCredentials();
        
            // Create an ExecutionContext using credentials and create a new operation instance.
            const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
                htmlToPDFOperation = PDFServicesSdk.CreatePDF.Operation.createNew();
        
            // Set operation input from a source file.
            const input = PDFServicesSdk.FileRef.createFromLocalFile(
                'files/' + InputHtml
            );
            htmlToPDFOperation.setInput(input);
        
            // Provide any custom configuration options for the operation.
            setCustomOptions(htmlToPDFOperation);
        
            // Execute the operation and Save the result to the specified location.
            htmlToPDFOperation.execute(executionContext)
                .then(result => result.saveAsFile('temp/' + OutputFile))
                .then(() => { AzureHelper.uploadFile(folderPath,  OutputFile); })
                .catch(err => {
                    if(     err instanceof PDFServicesSdk.Error.ServiceApiError ||
                            err instanceof PDFServicesSdk.Error.ServiceUsageError
                        ) {
                        console.log('Exception encountered while executing operation', err);
                    } else {
                        console.log('Exception encountered while executing operation', err);
                    }
                });
        } catch (err) {
            console.log('Exception encountered while executing operation', err);
        }
    },
   
    callbackFunc: function (_callback) {
        _callback();
    }

};
