import * as mqtt from "mqtt";

// compute-average-temperature
try {
  const client: mqtt.MqttClient = mqtt.connect("mqtt://test.mosquitto.org");
  client.on("connect", function () {
    client.subscribe("high-temperature");
    client.subscribe("temperature-rise");
    console.log("Client has subscribed successfully!");
  });
  client.on("message", function (topic, message) {
    const date = new Date();
    const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      console.log(`${formattedDate} -  ${topic}: ${message}`);
  });
} catch ({ message }) {
  console.log(message);
}
