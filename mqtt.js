var mqtt = require('mqtt');
require('dotenv').config();

const clientMq = mqtt.connect(process.env.mqtt_host, {
    username: process.env.mqtt_username,
    password: process.env.mqtt_password,
    clientId: process.env.mqtt_client_id + Math.random(),
    connectTimeout: 1000,
});
clientMq.on('connect', function () {
    clientMq.subscribe('contact/createContact', function (err) {
        if (!err) {
            console.log("subscribe createContact")
        }
    })
    clientMq.subscribe('contact/searchContacts', function (err) {
        if (!err) {
            console.log("subscribe sendGrup")
        }
    })
});

module.exports = {
    clientMq
}
