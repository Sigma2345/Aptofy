import { NFTStorage } from 'nft.storage'
import axios from 'axios';

//Temporary KEY, to be deleted befior publishing/submission
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ2NzBBNkU0ZjY0YjVjMDUwMjc4NzM3OUUxMjZkMTk1ODM4RUUzMTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjMwMDYxNTUzNCwibmFtZSI6InRlc3RrZXkyIn0.MiTGmPF0zAf59LY1wo__PL7_svYunS_XbNyZFuD4i4w';

const generateNFT = async (name, image) => {
    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store({
        name: name,
        image: image,
        description: 'Creator Image Asset'
    });
    return metadata.url;
}

const fetchGatewayURL = (ipfsURL) => {
    return 'https://ipfs.io/ipfs/' + ipfsURL.split('ipfs://')[1];
}

const fetchImageURL = async (ipfsURL) => {
    const gatewayURL = fetchGatewayURL(ipfsURL);
    const response = await axios.get(gatewayURL);
    return fetchGatewayURL(response.data.image);
}

const uploadImage = async (name, image) => {
    const url = await generateNFT(name, image);
    console.log(url);
    return fetchImageURL(url);
}

export default uploadImage;