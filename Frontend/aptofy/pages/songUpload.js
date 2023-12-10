import { React, useState } from "react";
import Button from "@mui/material/Button";
import generateNFT from "../common/handleIPFS";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import MODULE_ADDRESS from "../common/constants";
import TextField from "@mui/material/TextField";

export const songUpload = () => {
    const [fileList, setFiles] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const client = new Provider(Network.TESTNET);
    const {
        connect,
        account,
        network,
        connected,
        disconnect,
        wallet,
        wallets,
        signAndSubmitTransaction,
        signTransaction,
        signMessage,
    } = useWallet();

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileList = Array.from(selectedFiles);
        console.log(fileList);
        setFiles(fileList);
        setIsFileUploaded(!isFileUploaded);
    };

    const uploadToChain = async (title, uri, description) => {
        try {
            const payload = {
                type: "entry_function_payload",
                function: `${MODULE_ADDRESS}::songs::publish_song`,
                type_arguments: [],
                arguments: [title, uri, description],
            };
            const response = await signAndSubmitTransaction(payload);
            console.log("uploaded");
            const ans = await client.waitForTransaction(response.hash);
            return ans;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = event.target["title"].value;
        const description = event.target["description"].value;
        const data = await generateNFT(fileList[0], title, description);
        const ret = await uploadToChain(title, data, description);
        console.log(ret);
    };

    return (
        <div className="flex flex-col select-none">
            <div className="flex flex-1">
                <div className="flex-1 bg-slate-200 overflow-auto rounded p-10">
                    <h1 className="text-3xl">Upload Song</h1>
                    <div className="text-lg p-3">Audio recordings matter to users</div>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <TextField
                                name="title"
                                required
                                className="w-full bg-white"
                                id="outlined-required"
                                label="Title"
                            />
                        </div>

                        <div className="mb-3">
                            <TextField
                                name="description"
                                required
                                id="outlined-multiline-flexible"
                                label="Description"
                                className="w-full bg-white"
                                multiline
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-center rounded-lg">
                            <div className="flex-1 bg-slate-200 overflow:auto mt-10">
                                <h1 className="text-3xl m-2">Upload Audio</h1>

                                <div
                                    onClick={() => {
                                        document.querySelector("#dropzone-file").click();
                                    }}
                                    className="bg-white hover:bg-slate-50 cursor-pointer select-none transition-all rounded-lg shadow-md p-4"
                                >
                                    {!isFileUploaded ? (
                                        <span className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="p-5 text-gray-500 dark:text-gray-400 text-lg font-semibold">
                                                Click to upload or drag and drop audio files
                                            </p>
                                        </span>
                                    ) : (
                                        <label>
                                            <span>File uploaded</span>
                                        </label>
                                    )}

                                    {!isFileUploaded ? (
                                        <div className="p-2">
                                            <ul>
                                                <li className="flex items-center">Please upload a song</li>
                                                <li className="flex items-center">
                                                    Supported file formats are mp3, wav etc
                                                </li>

                                                <li className="flex items-center">Maximum audio size is 10MB</li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <span>{fileList[0].name}</span>
                                    )}
                                </div>
                                <input
                                    required
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="audio/*"
                                />
                            </div>
                        </div>
                    </form>
                    <Button
                        variant="contained"
                        sx={{ mt: 5, backgroundColor: "#006983", padding: 2, paddingLeft: 5, paddingRight: 5 }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default songUpload;
