const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");

const AzureFileShare = require("@azure/storage-file-share");
const ShareServiceClient = AzureFileShare.ShareServiceClient;
const StorageSharedKeyCredential = AzureFileShare.StorageSharedKeyCredential;

const fileHelper = require('../helpers/file');

const fs = require('fs')

module.exports = {
    getCredentials: function () {
        // Enter your storage account name and shared key
        const account = process.env.AZURE_ACCOUNT_NAME || "";
        const accountKey = process.env.AZURE_ACCOUNT_KEY || "";

        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

        const serviceClient = new ShareServiceClient(
            `https://${account}.file.core.windows.net`,
            sharedKeyCredential
        );

        return serviceClient;
    },
    getShareClient: function () {
        const shareName = process.env.AZURE_SHARE || "";
        const serviceClient = this.getCredentials();
        const shareClient = serviceClient.getShareClient(shareName);
        return shareClient;
    },
    listShares: async function (_callback) {
        const serviceClient = this.getCredentials();

        // List shares
        const data = {};
        data["content"] = [];
        try {
            for await (const share of serviceClient.listShares()) {
                data["content"].push(share.name)
            }
        } catch (error) {
            console.log(error)
        }

        _callback(data);
    },
    listContent: async function (directoryClient) {
        let data = {
            directories: {},
            files: []
        };
        for await (const entity of directoryClient.listFilesAndDirectories()) {
            if (entity.kind === "directory") {
                directoryClient = directoryClient.getDirectoryClient(entity.name);
                const temp = await this.listContent(directoryClient);
                data.directories[entity.name] = temp;
            } else {
                data.files.push(entity.name);
            }
        }
        return data;
    },
    streamToString: async function (readableStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on("data", (data) => {
                chunks.push(data.toString());
            });
            readableStream.on("end", () => {
                resolve(chunks.join(""));
            });
            readableStream.on("error", reject);
        });
    },
    getFile: async function (folderPath, fileName) {
        const shareClient = this.getShareClient();
        directoryClient = shareClient.getDirectoryClient(folderPath);

        const fileClient = directoryClient.getFileClient(fileName)

        const downloadFileResponse = await fileClient.download();

        const file = downloadFileResponse.readableStreamBody;
        const ws = fs.createWriteStream('temp/' + fileName);
        file.pipe(ws);
        return 0;
    },
    uploadFile: async function (environment, fileName) {
        const directoryClient = this.getShareClient().getDirectoryClient(environment + "/uploaded");
        fs.readFile('temp/' + fileName, async (err, content) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
                console.log("Start upload")
                const fileClient = directoryClient.getFileClient(fileName);
                await fileClient.create(content.length);
                await fileClient.uploadRange(content, 0, content.length);
                console.log(`Created file ${fileName}`);
                fileHelper.deleteLocalFile('temp/' + fileName);
            } catch (error) {
                console.error(err);
            }
        })
    },
    callbackFunc: function (_callback) {
        _callback();
    }

};
