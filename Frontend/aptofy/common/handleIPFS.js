import { NFTStorage } from 'nft.storage'

//Temporary KEY, to be deleted befior publishing/submission
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ2NzBBNkU0ZjY0YjVjMDUwMjc4NzM3OUUxMjZkMTk1ODM4RUUzMTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTk0ODM0MTYwMCwibmFtZSI6IkZvckludGVySUlUVGVzdGluZyJ9.-HpAsbcOUUUq--IvjNwFUI0NENGDl6VxslVGvLr0A8U';

const generateNFT = async (file, name, genre, description) => {
    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store({
        name: name,
        description: description,
        image: file,
        properties: {
            genre: genre
        }
    });
    return metadata.url;
};

export default generateNFT;