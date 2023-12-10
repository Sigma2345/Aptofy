const MongoClient = require('mongodb').MongoClient;

async function fetchSongs() {
    try{
        const client = new MongoClient(process.env.mongo_url);
        await client.connect();
        const db = client.db(process.env.db_name);
        const collection = db.collection('song');
        const songs = await collection.find({}).sort({ transaction_version: -1 }).toArray();
        client.close();
        return songs;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export default async function handler(req, res) {
    const songs = await fetchSongs();
    if(songs){
        res.status(200).json(songs);
    }
    else{
        res.status(500).json({ error: "Failed to fetch songs" });
    }
}