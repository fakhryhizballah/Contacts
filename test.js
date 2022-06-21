const request = require('request');
const { google } = require('googleapis');
const Oauth2 = google.auth.OAuth2;
const clientId = "441031107329-o54sibnjiigftdr9k4qeif3465m74cpk.apps.googleusercontent.com";
const clientSecret = "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";
var refreshToken = "1//04UgGTUaHwG3CCgYIARAAGAQSNwF-L9Ir5lpQza85YgAoRFZyGTxRMQFcJmyeGxv5whRsPD4Ijig0Ky-Ugr8fkoyOOfxUMixSW00";
const OAuth2_client = new Oauth2(clientId, clientSecret); // clientId, clientSecret)
OAuth2_client.setCredentials({ refresh_token: refreshToken });
const accessToken = OAuth2_client.getAccessToken();
// console.log(accessToken);
var telphoneNumber = "081212121212";

accessToken.then(function(result) {
   console.log(result.token) // "Some User token"
   var options = {
     'method': 'POST',
     'url': 'https://people.googleapis.com/v1/people:createContact',
     'personFields': 'names,emailAddresses',
     'headers': {
           'Authorization': 'Bearer ' + result.token,
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        "names": [
          {
            "givenName": "fakhry",
            "familyName": "hizballah al"
          }
        ],
        "emailAddresses": [
          {
            "value": "falehry88@gmail.com"
          }
        ],
        "phoneNumbers": [
          {
            "value": telphoneNumber,
          }
        ],
        "memberships": [
          {
            "contactGroupMembership": {
              "contactGroupResourceName": "contactGroups/191229f48eb7b40e"
            }
          },
          {
            "contactGroupMembership": {
              "contactGroupResourceName": "contactGroups/myContacts"
            }
          }
        ]
      })
   };
   console.log(options);
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log('rsponse: ', response);
        console.log(body);
    }
    );

})






