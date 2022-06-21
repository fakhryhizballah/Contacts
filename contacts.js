require('dotenv').config();
const request = require('request');
const { google } = require('googleapis');
const Oauth2 = google.auth.OAuth2;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
var refreshToken = process.env.refreshToken;
const OAuth2_client = new Oauth2(clientId, clientSecret); // clientId, clientSecret)
OAuth2_client.setCredentials({ refresh_token: refreshToken });

// searchContacts();
const searchContacts = async function search(payload){
    const tokens = await OAuth2_client.getAccessToken(); 
    // OAuth2_client.setCredentials(tokens);
    // console.log(tokens);
       var options = {
     'method': 'GET',
      'url': 'https://people.googleapis.com/v1/people:searchContacts?readMask=names,emailAddresses,phoneNumbers&query='+payload.query,
     'headers': {
           'Authorization': 'Bearer ' + tokens.token
       }
   };
   console.log(options);
    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     // console.log(body);
    // }
    // )
    return new Promise(resolve => {
        request(options, function (error, response, body) {
            if(!error)
            // console.log(body);
                resolve(body);
        })
    })

}
const createContact = async function createContact(payload){
    const tokens = await OAuth2_client.getAccessToken();
    var options = {
        'method': 'POST',
        'url': 'https://people.googleapis.com/v1/people:createContact',
        'personFields': 'names,emailAddresses',
        'headers': {
              'Authorization': 'Bearer ' + tokens.token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
           "names": [
             {
               "givenName": payload.givenName,
               "familyName": payload.givenName
             }
           ],
           "emailAddresses": [
             {
               "value": payload.emailAddresses
             }
           ],
           "phoneNumbers": [
             {
               "value": payload.phoneNumbers,
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
           console.log('response: ', response);
           console.log(body);
       });
}
    
module.exports = {
    searchContacts,
    createContact
}





