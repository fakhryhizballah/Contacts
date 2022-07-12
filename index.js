const { clientMq } = require('./mqtt');
const {createContact, searchContacts} = require('./contacts');

clientMq.on('message', async function (topic, message) {
    console.log(topic, message.toString());
    if (topic == 'contact/createContact') {
        // console.log("contact/createContact = " + message.toString())
        // console.log(message.toString());
        const payload = JSON.parse(message.toString());
        const data = {
            level: 1,
            topic: "Create Contacts",
            title: topic,
            value: message.toString()
        };
        console.log(data);
        clientMq.publish('log/dump', JSON.stringify(data));
        try {
            const Create = await createContact(payload);
            console.log(Create);
        } catch (err) {
            // console.log(typeof err);
            console.log(err.response.data);
            console.log(err.code);
            const data = {
                level: 4,
                topic: "Create Contacts : " + err.code,
                title: topic + message.toString(),
                value: "data = " + JSON.stringify(err.response.data)
            };
            console.log(data);
            clientMq.publish('log/dump', JSON.stringify(data));
        }

    }
    if (topic == 'contact/searchContacts') {
        // console.log(message.toString());
        const payload = JSON.parse(message.toString());
        try{ 
        const search = await searchContacts(payload);
        console.log(search);
         clientMq.publish('contact/searchContacts/response', search.toString());
        }catch(err){
            // console.log(typeof err);
            console.log(err.response.data);
            console.log(err.code);
            const data = {
                level: 4,
                topic: "Search Contacts : " + err.code,
                title: topic + message.toString(),
                value: "data = " + JSON.stringify(err.response.data)
            };
            console.log(data);
            clientMq.publish('log/dump', JSON.stringify(data));
        }

    }  
}
);