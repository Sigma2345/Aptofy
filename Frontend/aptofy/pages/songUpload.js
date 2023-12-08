import { React, useState } from "react";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import generateNFT from "../common/handleIPFS";
//import uploadToChain from "../common/uploadToChain";
import { AptosClient } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export const songUpload = () => {
    const [fileList, setFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");

    const { signAndSubmitTransaction } = useWallet();

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileList = Array.from(selectedFiles);
        console.log(fileList);
        setFiles(fileList);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const uploadToChain = async (title, uri, description) => {
        if (process.browser) {
            const response = await signAndSubmitTransaction({
                type: "entry_function_payload",
                function: 6b813bbe7f84ab59540e810cca6ed884e9358c05d1b0c45b1ea5f4d3170ea219::songs::publish_song,
                type_arguments: [],
                arguments: [title, uri, description],
            });
            return await AptosClient.waitForTransaction(response?.hash);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await generateNFT(fileList[0], title, genre, description);
        console.log(data);
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

                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept="audio/*" // Add audio file acceptance
                                            />
                                        </div>
                                    </div>
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
                                            {/* <li class="flex items-center">
                                                <svg
                                                    class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <image
                                                        href="data:image/png;base64,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"
                                                        width="20"
                                                        height="16"
                                                    />
                                                </svg>
                                                Batch uploads are limited to 100MB
                                            </li> */}
                                        </ul>
                                    </div>
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

            <Footer />
        </div>
    );
};

export default songUpload;
