import { React, useState } from "react";
import Button from "@mui/material/Button";
import generateNFT from "../common/handleIPFS";
import { Provider, Network } from 'aptos'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import MODULE_ADDRESS from "../common/constants";

export const songUpload = () => {
    const [fileList, setFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
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

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        // console.log(account); 
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const uploadToChain = async (title, uri, description) => {
        try {
            const payload = {
                type: 'entry_function_payload',
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await generateNFT(fileList[0], title, genre, description);
        console.log(data);
        console.log(title); 
        console.log(description); 
        const ret = await uploadToChain(title, data, description);
        console.log(ret);
    };


    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <div className="flex-1 bg-slate-200 overflow-auto p-6">
                    <h1 className="text-3xl">Upload Audio</h1>
                    <p>Audio recordings matter to users. Upload your audio files. You can add more later.</p>
                    <form className="mt-4">
                        <div className="mb-1">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                id="Description"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                Genre
                            </label>
                            <input
                                type="text"
                                id="genre"
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                value={genre}
                                onChange={handleGenreChange}
                            />
                        </div>

                        <div className="lg:flex lg:items-center border-2 border-dashed border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 rounded-lg">
                            <div class="flex-1 bg-slate-200 overflow: auto p-6">
                                <h1 class="text-3xl">Upload Audio</h1>

                                <div class="lg:flex lg:items-center border-2 border-dashed border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 rounded-lg ">
                                    <div class="lg:w-1/2 p-4 ">
                                        <div class="flex items-center justify-center w-full h-80 cursor-pointer bg-gray-50 dark:hover:bg-gray-700 hover:bg-gray-100">
                                            {
                                                !isFileUploaded ?
                                                    <label
                                                        for="dropzone-file"
                                                        class="flex flex-col items-center justify-center pt-5 pb-6"
                                                    >
                                                        <svg
                                                            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 16"
                                                        ></svg>
                                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span class="font-semibold">Click to upload</span> or drag and drop
                                                            audio files
                                                        </p>
                                                        <p class="text-xs text-gray-500 dark:text-gray-400">
                                                            Supported file formats: MP3, WAV, etc.
                                                        </p>
                                                    </label>
                                                    :
                                                    <label>
                                                        <span>File uploaded</span>
                                                    </label>
                                            }    
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept="audio/*" // Add audio file acceptance
                                            />
                                        </div>
                                    </div>
                                    {
                                        !isFileUploaded ?
                                            <div class="lg:w-1/2 p-4 mt-4">
                                                <ul>
                                                    <li class="flex items-center">
                                                        <svg
                                                            class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 16"
                                                        ></svg>
                                                        Please upload a song
                                                    </li>
                                                    <li class="flex items-center">
                                                        <svg
                                                            class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 20 16"
                                                        ></svg>
                                                        Supported file formats are mp3, wav etc
                                                    </li>

                                                    <li class="flex items-center">
                                                        <svg
                                                            class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 30 36"
                                                        >
                                                            <image
                                                                href="https://cdn1.iconfinder.com/data/icons/geometry-1/512/maximum-size-full-window-512.png"
                                                                width="30"
                                                                height="36"
                                                            />
                                                        </svg>
                                                        Maximum audio size is 10MB
                                                    </li>
                                                </ul>
                                            </div>
                                            :
                                            <span>{fileList[0].name}</span>
                                    }       
                                </div>
                            </div>
                        </div>
                    </form>
                    <Button variant="contained" sx={{ m: "10px", backgroundColor: "#006983" }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>

                <div
                    className="w-1/4 "
                    style={{
                        backgroundImage:
                            "url('https://cdn.pixabay.com/animation/2023/02/28/13/25/13-25-18-504_256.gif')",
                    }}
                >
                    {/* Content for the right side */}
                </div>
            </div>

        </div>
    );
};

export default songUpload;
