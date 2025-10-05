import { FaGithub, FaLinkedin } from "react-icons/fa";


function Footer(){
    return(
        <footer className="absolute bottom-0 left-0 right-0 bg-slate-900 text-center text-white py-8">
            <div className="flex justify-between w-5/6 border-b pb-10 ml-8 border-white">
                <div>
                   <h2 className="text-lg font-bold mb-2 ">Auction Central</h2>
                   
                    <p className="text-sm text-start">Live Auctions</p>
                    <p className="text-sm text-start">Past Auctions</p>
                    <p className="text-sm text-start">Categories</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2 ">About Us</h2>
                    <p className="text-sm text-start">Our Story</p>
                    <p className="text-sm text-start">Careers</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold  mb-2">Support</h2>
                    <p className="text-sm text-start">FAQ</p>
                    <p className="text-sm text-start">Contact Us</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2 ">Follow Us</h2>
                    <div className="flex gap-4 text-3xl">
                        <FaGithub/>
                        <FaLinkedin/>
                    </div>
                </div>
            </div>
            <div className="text-start mx-8 mt-4 .">
                @ 2025 Auction Central. All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer;