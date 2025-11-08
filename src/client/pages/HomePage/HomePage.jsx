import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import Banner from './LandingComps/Banner';
import SearchFunction from './RegularComps/SearchFunction';
import FeaturedItems from './RegularComps/FeaturedItems';
import WhyChoose from './LandingComps/WhyChoose';
import Categories from './RegularComps/Categories';
import useAuth from '../../hooks/useAuth';

function HomePage() {
  const [authMode, setAuthMode] = useState('signup');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen pb-10 bg-gray-100">
      {!isLoggedIn && <Banner authMode={setAuthMode} authControl={setIsAuthOpen} />}

      <SearchFunction />

      <FeaturedItems />

      {!isLoggedIn && <WhyChoose />}

      <Categories />

      <AuthPage
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}

export default HomePage;
