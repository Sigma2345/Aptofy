const axios = require('axios');

function fetchGatewayURL(ipfsURL) {
    return ipfsURL.split('ipfs://')[1];
}

async function fetchCoverImageURL(ipfsURL) {
    const gatewayURL = fetchGatewayURL(ipfsURL);
    const response = await axios.get(`https://ipfs.io/ipfs/${gatewayURL}`);
    return response.data.properties.cover;
}

exports.fetchCoverImageURL = fetchCoverImageURL;