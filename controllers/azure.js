const AzureHelper = require('../helpers/azure');
const fs = require('fs');


exports.listAllContent = (req, res, next) => {
    AzureHelper.callbackFunc(async function () {
        const shareClient = AzureHelper.getShareClient();
        const environment = req.body.environment;
        let directoryName;
        directoryName = environment + "/" + req.body.directory;

        try {
            let directoryClient;
            if (req.body.directory == "") {
                directoryName = environment;
                directoryClient = shareClient.getRootDirectoryClient(directoryName);
            }else{
                directoryClient = shareClient.getDirectoryClient(directoryName);
            }
            data = await AzureHelper.listContent(directoryClient);
            res.status(200).json({
                code: 200,
                message: 'Success.',
                data: data
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                message: 'Uncaught error: ' + error,
            });
        }
    })
};

// exports.getFile = (req, res, next) => {
//     AzureHelper.callbackFunc(async function () {
//         const fileName = req.body.inputFile;
//         const folderPath = req.body.environment + "/uploaded";

//         await AzureHelper.getFile(folderPath, fileName);


//         // const shareClient = AzureHelper.getShareClient();
//         // const environment = req.body.env;
//         // const directoryName = environment + "/templates/"

//         // let directoryClient;
//         // try {
//         //     directoryClient = shareClient.getDirectoryClient(directoryName);
//         //     data = await AzureHelper.listContent(directoryClient);
//         //     res.status(200).json({
//         //         code: 200,
//         //         message: 'Success.',
//         //         data: data
//         //     });
//         // } catch (error) {
//         //     res.status(500).json({
//         //         code: 500,
//         //         message: 'Uncaught error: ' + error,
//         //     });
//         // }
//     })
// };
