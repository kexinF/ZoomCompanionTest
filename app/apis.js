/* globals zoomSdk */

let width = 500;
let height = 500;
let imageData = new ImageData(width, height);

// Function to generate a random integer between 0 and 255
function randomColorValue() {
  return Math.floor(Math.random() * 256);
}

// Iterate over each pixel and set a random color
for (let i = 0; i < imageData.data.length; i += 4) {
  imageData.data[i] = randomColorValue(); // Red
  imageData.data[i + 1] = randomColorValue(); // Green
  imageData.data[i + 2] = randomColorValue(); // Blue
  imageData.data[i + 3] = 255; // Alpha (fully opaque)
}



const invokeZoomAppsSdk = (api) => () => {
    const { name, buttonName = "", options = null } = api;
    const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk);

    zoomAppsSdkApi(options)
        .then((clientResponse) => {
            console.log(
                `${buttonName || name} success with response: ${JSON.stringify(
                    clientResponse
                )}`
            );
        })
        .catch((clientError) => {
            console.log(
                `${buttonName || name} error: ${JSON.stringify(clientError)}`
            );
        });
};


const apis = [
    {
        name: "setVirtualForeground",
        buttonName: "Set PWS Badge Using Virtual Foreground",
        options: {
            imageData:
                imageData,
        },
    },
    {
        name: "removeVirtualForeground",
        buttonName: "Remove PWS Badge Using Virtual Foreground",
    },
 
];

module.exports = { apis, invokeZoomAppsSdk };
