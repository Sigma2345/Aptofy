import React from "react";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import MODULE_ADDRESS from "../common/constants";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = [
    {
        question: "How do I register?",
        answer: "Make an account on Aptos wallet and simply login.",
    },
    {
        question: "Are there any hidden charges?",
        answer: "There are no hidden charges. The song registration is entirely free of cost.",
    },
    {
        question: "Who will accept my upload request?",
        answer: "The system will check and respond the request.",
    },
    {
        question: "How much time is taken to respond?",
        answer: "It generally happens in hours but can take 1-2 days too.",
    },
    {
        question: "Any fraud checks?",
        answer: "The system checks and filter frauds and duplicates",
    },
    {
        question: "More",
        answer: "Yes",
    },
];

export const uploadSongHome = () => {
    const [name, setName] = React.useState("");
    const router = useRouter();
    const client = new Provider(Network.TESTNET);
    const { signAndSubmitTransaction } = useWallet();
    const isCreator = true;
    const creator = async (event) => {
        event.preventDefault();
        if (name.length < 3) {
            alert("Name must be at least 3 characters long");
            return;
        }
        await addCreator(name);
        router.push("/songUpload");
    };

    const addCreator = async (name) => {
        const payload = {
            type: `entry_function_payload`,
            function: `${MODULE_ADDRESS}::songs::add_creator`,
            type_arguments: [],
            arguments: [name],
        };
        const response = await signAndSubmitTransaction(payload);
        return await client.waitForTransaction(response);
    };

    return (
        <div className="flex flex-col font-mono">
            <div className="py-8 text-center">
                <div className="text-center">
                    <h1 className="font-semibold animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl">
                        Upload your content
                    </h1>
                    <p className="text-lg text-gray-600">
                        Get the views you’ve been missing by listing for free, today!
                    </p>
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow">
                    <div>
                        <img
                            className="rounded-t-lg"
                            src="https://cdn1.matadornetwork.com/blogs/1/2014/04/Music-producer-man-in-recording-studio.jpg"
                            alt=""
                        />
                    </div>

                    <div className="p-5">
                        <div>
                            <h5 className="mb-2 text-2xl font-semibold font-mono italic tracking-tight text-gray-900">
                                Become a Creator
                            </h5>
                        </div>
                        <div className="ml-3 mb-6 font-normal font-mono text-gray-700">
                            Vibes as beats enclosed to blast ears
                        </div>
                        <TextField
                            label="Your Name"
                            variant="outlined"
                            value={name}
                            required
                            sx={{ width: "100%", mb: 2 }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div
                            onClick={creator}
                            className="p-4 pl-8 cursor-pointer pr-8 inline-flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Be a Creator
                            <svg
                                className="w-3.5 h-3.5 ml-2"
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

            <div className="py-8 text-center">
                <div className="text-center">
                    <h1 className="font-semibold text-5xl">Reasons to upload on Aptofy</h1>
                </div>
            </div>

            <div className="bg-[#a7f4f173] rounded-md p-2 w-1/4 mx-auto">
                <div className="flex justify-center">
                    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-lg">
                        <li className="flex items-center space-x-3">
                            <svg
                                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
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
                        <li className="flex items-center space-x-3">
                            <svg
                                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
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
                        <li className="flex items-center space-x-3">
                            <svg
                                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
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

            <div className="container my-24 mx-auto md:px-6">
                <section className="mb-32">
                    <h2 className="mb-16 text-center text-3xl font-bold">Frequently asked questions</h2>
                    {FAQs.map((faq) => (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <div className="text-lg text-black font-semibold">{faq.question}</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="text-base text-black">{faq.answer}</div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default uploadSongHome;
