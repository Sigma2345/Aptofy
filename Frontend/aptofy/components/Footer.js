import React from "react";

function Footer() {
    return (
        <footer class="bg-black text-white py-4">
            <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div class="md:w-1/3 mb-4 md:mb-0">
                    <address>
                        IIT Jammu
                        <br />
                        Jammu, Jammu and Kasmir
                        <br />
                        India
                    </address>
                </div>
                <div class="md:w-1/3 text-center my-4 md:my-0">
                    <div>
                        All material herein © 2023 Aptofy <br />
                        All Rights Reserved.
                    </div>
                </div>
                <div class="text-center md:w-1/3">
                    Phone: (123) 456-7890
                    <br />
                    Email: info@example.com
                </div>
            </div>
        </footer>
    );
}

export default Footer;
