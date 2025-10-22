import { CgBell, CgProfile } from "react-icons/cg";

import useAuth from "../../hooks/useAuth";
function RightSection({isLoggedIn,onLoginClick}){
    const {logout}= useAuth();
    return(
        <div className="hidden md:flex justify-around items-center gap-8">
            <CgBell className="size-6 cursor-pointer" />
            
            {isLoggedIn
                ?<CgProfile className="size-6 cursor-pointer" onClick={logout} />
                :<div>
                    <button onClick={onLoginClick} className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-bold transition">
                        Login
                    </button>  
                </div>
            }
        </div>
    )
}

export default RightSection;