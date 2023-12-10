import { useEffect, useState } from "react";
import MusicCard from "../components/card";
import axios from "axios";

export default function Home() {
    const [songList, setSongList] = useState([]);

    const fetchSongs = async () => {
        const res = await axios.get("http://localhost:3000/api/fetchSongs") 
        setSongList(res.data);
    };
    useEffect(() => {
        fetchSongs();
    }, []);
    return (
        <div>
            {songList.map((song) => (
                <MusicCard key={song.timestamp} title={song.title} artist_name={song.creator_name} uri={song.uri} artist_address={song.creator_address} />
            ))}
        </div>
    );
}
