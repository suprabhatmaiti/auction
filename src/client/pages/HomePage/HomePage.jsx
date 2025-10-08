import {useState } from "react";
import AuthPage from "../AuthPage";
import Banner from "./LandingComps/Banner";
import SearchFunction from "./RegularComps/SearchFunction";
import FeaturedItems from "./RegularComps/FeaturedItems";
import WhyChoose from "./LandingComps/WhyChoose";
import Categories from "./RegularComps/Categories";

function HomePage() {
  const [authMode,setAuthMode] = useState('signup');
  const [isAuthOpen,setIsAuthOpen] = useState(false)

  

  return (
    <div className="min-h-screen pb-60 bg-gray-100">
      <Banner authMode={setAuthMode} authControl={setIsAuthOpen}/>

      <SearchFunction/>

      <FeaturedItems/>

      <WhyChoose/>

      <Categories/>

      <AuthPage isOpen={isAuthOpen} onClose={()=>setIsAuthOpen(false) } mode = {authMode} onModeChange={setAuthMode} />
    </div>
  );
}

export default HomePage;
