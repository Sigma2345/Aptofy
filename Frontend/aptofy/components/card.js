import * as React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import vinyl from "../public/vinyl.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Titlecase } from "../common/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {Network, Provider} from "aptos";
import MODULE_ADDRESS from "../common/constants";

export default function MusicCard({title ,artist_name ,uri ,artist_address }) {
    const [amount, setAmount] = React.useState(0);
    const { signAndSubmitTransaction } = useWallet();
    const client = new Provider(Network.TESTNET); 
    
    // add $ button that allows to add number to field and when clicked processes transaction
    const onDollarClick = async (event) => {
        event.preventDefault();
        await payUser(amount);
    }

    const payUser = async (amount) => {
        const payload = {
            type: `entry_function_payload`, 
            function: `${MODULE_ADDRESS}::songs::tip_artist`, 
            type_arguments: [],
            arguments: [amount, artist_address],
        }
        const response = await signAndSubmitTransaction(payload);
        return await client.waitForTransaction(response);
    }

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
                            {Titlecase(title)}
                        </Typography>
                    </div>
                    <div className="pl-5 w-full">
                        <Typography fontFamily={"monospace"} variant="body2" color="text.secondary">
                            {Titlecase(artist_name)}
                        </Typography>
                    </div>
                </div>
                <div className="w-1/2 p-4 flex justify-end">
                    <div className="hover:bg-teal-300 bg-teal-200 hover:shadow transition-all rounded-full w-fit p-3 cursor-pointer">
                        <PlayArrowIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
