const fs = require('fs')

module.exports = {
    // deleteLocalFile: async function (OutputFile) {
    //     curl request naar framework
    //     returned true false
    // },
        deleteLocalFile: async function (OutputFile) {
        fs.unlink(OutputFile, (err) => {
            if (err) {
                console.error(err)
                return
            };
        })
    },
    callbackFunc: function (_callback) {
        _callback();
    }

};
