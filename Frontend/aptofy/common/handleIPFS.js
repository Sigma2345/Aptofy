import { NFTStorage } from 'nft.storage'
import { fetchCoverImageURL } from './fetchImageURL';

//Temporary KEY, to be deleted befior publishing/submission
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ2NzBBNkU0ZjY0YjVjMDUwMjc4NzM3OUUxMjZkMTk1ODM4RUUzMTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjMwMDYxNTUzNCwibmFtZSI6InRlc3RrZXkyIn0.MiTGmPF0zAf59LY1wo__PL7_svYunS_XbNyZFuD4i4w';

const generateNFT = async (file, name, genre, description, cover) => {
    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store({
        name: name,
        description: description,
        image: file,
        properties: {
            genre: genre,
            cover: cover
        }
    });
    const coverURL = await fetchCoverImageURL(metadata.url);
    return [metadata.url, coverURL];
};

export default generateNFT;
