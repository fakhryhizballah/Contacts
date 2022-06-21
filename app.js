require('dotenv').config();
const request = require('request');
const { google } = require('googleapis');
const Oauth2 = google.auth.OAuth2;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
var refreshToken = process.env.refreshToken;
const OAuth2_client = new Oauth2(clientId, clientSecret); // clientId, clientSecret)
OAuth2_client.setCredentials({ refresh_token: refreshToken });
const accessToken = OAuth2_client.getAccessToken();
// console.log(accessToken);


// const {tokens} = await OAuth2_client.getToken()
// OAuth2_client.setCredentials(tokens);

// OAuth2_client.on('tokens', (tokens) => {
//     if (tokens.refresh_token) {
//       // store the refresh_token in my database!
//       console.log("refresh_token");
//       console.log(tokens.refresh_token);
//     }
//     console.log("access_token");
//     console.log(tokens.access_token);
//     console.log(tokens)
//   });

function searchContacts() {
    var options = {
      'method': 'POST',
      'url': 'https://people.googleapis.com/v1/people:search',
      'headers': {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "query": "fakhry",
            "pageSize": 10,
            "pageToken": "",
            "orderBy": "PHONE_NUMBER"
        })
    };
    console.log(options);
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log('rsponse: ', response);
        console.log(body);
    }
    );

}
// searchContacts();
async function cekContacts(){
    const tokens = await OAuth2_client.getAccessToken(); 
    // OAuth2_client.setCredentials(tokens);
    // console.log(tokens);
       var options = {
     'method': 'GET',
    //  'url': 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
    //  'url': 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
     'url': 'https://people.googleapis.com/v1/people:searchContacts?readMask=names,emailAddresses,phoneNumbers,memberships&query=fakhry',
    //  'url': 'https://people.googleapis.com/v1/people/me?',

     'headers': {
           'Authorization': 'Bearer ' + tokens.token
       }
   };
   console.log(options);
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    }
    );

}
cekContacts();

//   console.log(getAccessToken());

// accessToken.then(function(result) {
//    console.log(result.token) // "Some User token"
//    var options = {
//      'method': 'GET',
//     //  'url': 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
//     //  'url': 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
//      'url': 'https://people.googleapis.com/v1/people:searchContacts?readMask=names,emailAddresses,phoneNumbers,memberships&query=fakhry',
//     //  'url': 'https://people.googleapis.com/v1/people/me?',

//      'headers': {
//            'Authorization': 'Bearer ' + result.token
//        }
//    };
//    console.log(options);
//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         console.log(body);
//     }
//     );

// })





