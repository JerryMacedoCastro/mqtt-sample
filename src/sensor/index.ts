import * as mqtt from "mqtt"

// publisher
try {
    const client : mqtt.MqttClient = mqtt.connect("mqtt://test.mosquitto.org");
    client.on("connect", function () {
        client.publish("temperature", "");
        setInterval(function() {
            let randomTemp = Math.random() * 400;
            console.log("Temperatura atual: ", randomTemp, "°C");
            client.publish("temperature", randomTemp.toString());
        } , 5000);
    });      
    
} catch ({message}) {
    console.log(message);
}
