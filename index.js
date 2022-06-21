const { clientMq } = require('./mqtt');
const {createContact, searchContacts} = require('./contacts');

clientMq.on('message', async function (topic, message) {
    console.log(topic, message.toString());
    if (topic == 'contact/createContact') {
        console.log(message.toString());
        const payload = JSON.parse(message.toString());
        await createContact(payload);
    }
    if (topic == 'contact/searchContacts') {
        // console.log(message.toString());
        const payload = JSON.parse(message.toString());
        try{ 
        const search = await searchContacts(payload);
        console.log(search);
         clientMq.publish('contact/searchContacts/response', search.toString());
        }catch(err){
            console.log(err);
        }

    }  
}
);