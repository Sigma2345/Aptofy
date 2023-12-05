import * as React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import vinyl from "../public/vinyl.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Titlecase } from "../common/utils";
export default function MusicCard(props) {
    return (
        <div
            style={{ width: "400px" }}
            className="m-2 bg-teal-50 rounded border shadow hover:bg-teal-100 transition-all"
        >
            <div className="w-full flex justify-center shadow bg-black bg-opacity-30 p-5 hover:bg-opacity-40 cursor-pointer transition-all">
                <Image src={vinyl} alt="vinyl" width={100} height={100} />
            </div>
            <div className="w-full flex p-5 pb-20">
                <div className="w-1/2 flex flex-wrap">
                    <div className="w-full pt-3">
                        <Typography gutterBottom variant="h5" fontFamily={"monospace"} component="div">
                            {Titlecase(props.title)}
                        </Typography>
                    </div>
                    <div className="pl-5 w-full">
                        <Typography fontFamily={"monospace"} variant="body2" color="text.secondary">
                            {Titlecase(props.artist)}
                        </Typography>
                    </div>
                </div>
                <div className="w-1/2 p-4 flex justify-end">
                    <div className="hover:bg-teal-300 bg-teal-200 hover:shadow transition-all rounded-full w-fit p-3 cursor-pointer">
                        {props.isPlayed ? <PauseIcon /> : <PlayArrowIcon />}
                    </div>
                </div>
            </div>
        </div>
    );
}
