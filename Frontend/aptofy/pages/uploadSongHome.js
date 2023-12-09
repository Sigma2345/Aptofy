import React from "react";
import { Provider, Network } from "aptos"; 
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import MODULE_ADDRESS from "../common/constants";
import Button from "@mui/material/Button";

export const uploadSongHome = () => {

    const client = new Provider(Network.TESTNET);
    const {signAndSubmitTransaction} = useWallet();
    const creator = async (event) => {
        //Logic for creating Creator
        event.preventDefault();
        const name = event.target.name.value;
        await addCreator(name);
        router.push("/songUpload");
    }

    const addCreator = async (name) => {
        const payload = {
            type: `entry_function_payload`, 
            function: `${MODULE_ADDRESS}::songs::add_creator`,
            type_arguments: [], 
            arguments: [name]
        }
        const response = await signAndSubmitTransaction(payload);
        return await client.waitForTransaction(response);
    }

    return (
        <div class="flex flex-col min-h-screen">
            <div class="py-8 text-center">
                <div class="text-center">
                    <h1 class="font-semibold animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl">
                        Upload your content
                    </h1>
                    <p class="text-lg text-gray-600">Get the views you’ve been missing by listing for free, today!</p>
                </div>
            </div>

            <div class="flex justify-center space-x-4">
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-4">
                    <div>
                        <img
                            class="rounded-t-lg"
                            src="https://cdn1.matadornetwork.com/blogs/1/2014/04/Music-producer-man-in-recording-studio.jpg"
                            alt=""
                        />
                    </div>
                    <div class="p-5">
                        <div>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Song</h5>
                        </div>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Vibes as beats enclosed to blast ears
                        </p>
                        <div onClick={() => console.log("Hello")}                            
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            
                                Be a Creator
                                <svg
                                    class="w-3.5 h-3.5 ml-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-8 text-center">
                <div class="text-center">
                    <h1 class="font-semibold text-5xl">Reasons to upload on Aptofy</h1>
                </div>
            </div>

            <div class="bg-[#a7f4f173] rounded-md p-2 w-1/4 mx-auto">
                <div class="flex justify-center">
                    <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400 text-lg">
                        <li class="flex items-center space-x-3">
                            <svg
                                class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5.917 5.724 10.5 15 1.5"
                                />
                            </svg>
                            <span>Free Registration</span>
                        </li>
                        <li class="flex items-center space-x-3">
                            <svg
                                class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5.917 5.724 10.5 15 1.5"
                                />
                            </svg>
                            <span>Decentralized system</span>
                        </li>
                        <li class="flex items-center space-x-3">
                            <svg
                                class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5.917 5.724 10.5 15 1.5"
                                />
                            </svg>
                            <span>Data stored and protected on IPFS</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="container my-24 mx-auto md:px-6">
                <section class="mb-32">
                    <h2 class="mb-16 text-center text-3xl font-bold">Frequently asked questions</h2>

                    <div class="grid gap-6 lg:grid-cols-3">
                        <div class="mb-6 md:mb-8 lg:mb-12">
                            <p class="mb-4 font-bold">How do I register?</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                                Make an account on Aptos wallet and simply login.
                            </p>
                        </div>

                        <div class="mb-6 md:mb-8 lg:mb-12">
                            <p class="mb-4 font-bold">Are there any hidden charges?</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                                There are no hidden charges. The song registration is entirely free of cost.
                            </p>
                        </div>

                        <div class="mb-6 md:mb-8 lg:mb-12">
                            <p class="mb-4 font-bold">Who will accept my upload request?</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                                The system will check and respond the request.
                            </p>
                        </div>

                        <div class="mb-6 md:mb-8 lg:mb-12">
                            <p class="mb-4 font-bold">How much time is taken to respond?</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                                It generally happens in hours but can take 1-2 days too.
                            </p>
                        </div>

                        <div class="mb-6 md:mb-8 lg:mb-12">
                            <p class="mb-4 font-bold">Any fraud checks?</p>
                            <p class="text-neutral-500 dark:text-neutral-300">
                                The system checks and filter frauds and duplicates
                            </p>
                        </div>

                        <div class="mb-6 md:mb-8 lg:mb-12">
                            <p class="mb-4 font-bold">More</p>
                            <p class="text-neutral-500 dark:text-neutral-300">Yes</p>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default uploadSongHome;
