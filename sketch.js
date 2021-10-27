// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://jianjian1001.github.io/bread-test/';

const handleCharacteristicValueChanged = (event) => {
   console.log(event.target.value.getUint8(0) + '%');
};
const connectToDeviceAndSubscribeToUpdates = async () => {
   const device = await navigator.bluetooth
      .requestDevice({
          filters: [{ services: ['battery_service']}
      });
   const server = await device.gatt.connect();
   const service = await server.getPrimaryService('battery_service');
   const characteristic = await service.getCharacteristic('battery_level');
   characteristic.startNotifications();
   characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
   const reading = await characteristic.readValue();
   console.log(reading.getUint8(0) + '%');
};