// src/components/Auth/AuthPage.jsx
import AuthForm from "./AuthForm";
import SocialLogin from "./SocialLogin";

function AuthPage({ isOpen, onClose, mode = "login", onModeChange }) {
  const isLoginPageOpen = mode === "login";

  if (!isOpen) return null;

  const handleCloseBtn = () => onClose();

  const loginSignupToggle = () => {
    onModeChange(isLoginPageOpen ? "signup" : "login");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl relative 
          w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 
          max-h-[90vh] overflow-y-auto 
          p-6 md:p-8 
          animate-fade-in-up
        ">
        <button
          onClick={handleCloseBtn}
          className="absolute right-0 top-0 px-3 rounded-r-lg bg-gray-100 hover:shadow-lg hover:bg-gray-300 text-xl"
        >
          x
        </button>

        <h2 className="text-violet-600 font-bold text-2xl px-12">
          {!isLoginPageOpen
            ? "Sign up to E-Auction"
            : "Sign in to your Account"}
        </h2>

        <div className="my-4 p-4">
          <AuthForm isLoginPageOpen={isLoginPageOpen} onClose={onClose} />
          <SocialLogin />
          <p className="text-center">
            {!isLoginPageOpen
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              onClick={loginSignupToggle}
              className="text-violet-600 cursor-pointer hover:text-violet-900"
            >
              {!isLoginPageOpen ? "Login" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
