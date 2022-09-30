var request = require('request');

module.exports =
  async function login (env, auth, contentType) {
      let str = auth;
      let n = 7;
      str = str.substring(n);

      var options = {
          'method': 'POST',
          'headers': {
            'Content-Type': contentType,
          },
          body: JSON.stringify({

            })
        };
        let confirm = false;
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          const info = JSON.parse(body);

          if(response.statusCode == 200 && info.data.access_token != 0)
          { 
              confirm = true;
              return confirm;
          }
          else{
            confirm = false;
            return confirm;
          }         
        });

      await new Promise(resolve => setTimeout(resolve, 2000));
      return confirm;
};