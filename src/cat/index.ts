
import * as mqtt from "mqtt"

// compute-average-temperature
try {
     let count = 0; 
     let tempValues: number[] = [];
     let avgValues: number[] = [];
     const client : mqtt.MqttClient = mqtt.connect("mqtt://test.mosquitto.org");
     client.on('connect', function () {
        client.subscribe('temperature');
        console.log("Client has subscribed successfully!");
     });
     client.on('message', function (topic, message) {
        count++;
        if (count == 2) {
         // console.log("valor: ", message.toString());
         tempValues.push(parseFloat(message.toString()));
         count = 0;
        }
        if (tempValues.length == 2) {
         const avgTemp = (tempValues[0] + tempValues[1]) / 2;  
         console.log("Average temperature: ", avgTemp , "°C");
         avgValues.push(avgTemp);
         tempValues = [];
        }

        if (avgValues.length == 2) {
         const avgDiff = avgValues[1] - avgValues[0];
         if(avgDiff > 5.0) {
          console.log(`${avgValues[1]} - ${avgValues[0]}  = ${avgDiff} [Sudden temperature rise!]`);
         }
         avgValues = [];
        }
     
     });      
   
} catch ({message}) {
    console.log(message);
}

