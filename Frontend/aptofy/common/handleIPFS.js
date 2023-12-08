import { NFTStorage } from 'nft.storage'

//Temporary KEY, to be deleted befior publishing/submission
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM2NzcxZDY5Y0RmNjY2RWE4RjI4NzI4RjE1OWZjMDNiZkRkQzEwMTUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3ODgyNTAxMzMyNywibmFtZSI6InRlc3Qga2V5In0.MunLaN9rXUYVOPO2O9fnyw5g70Z_uJ7wykjFUPR-EQA';

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
