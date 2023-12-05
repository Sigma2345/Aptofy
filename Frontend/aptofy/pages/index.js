import { useEffect, useState } from "react";
import MusicCard from "../components/card";

export default function Home() {
    const [songList, setSongList] = useState([]);

    const fetchSongs = async () => {
        setSongList([
            {
                title: "TITLE",
                artist: "ARTIST",
            },
        ]);
    };
    useEffect(() => {
        fetchSongs();
    });
    return (
        <div>
            {songList.map((song) => (
                <MusicCard title={song.title} artist={song.artist} />
            ))}
        </div>
    );
}
