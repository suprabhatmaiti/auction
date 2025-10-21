// src/components/Auth/SocialLogin.jsx
import { FaGoogle, FaGithub } from "react-icons/fa";

function SocialLogin() {
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: integrate actual OAuth flow
  };

  const handleGithubLogin = () => {
    console.log("GitHub login clicked");
  };

  return (
    <div className="py-4">
      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex gap-4 justify-center items-center py-2">
        <div
          onClick={handleGoogleLogin}
          className="cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex-shrink-0 w-1/2 py-2 flex gap-2 justify-center items-center"
        >
          <FaGoogle className="text-2xl" />
          <p>Google</p>
        </div>

        <div
          onClick={handleGithubLogin}
          className="cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex-shrink-0 w-1/2 py-2 flex gap-2 justify-center items-center"
        >
          <FaGithub className="text-2xl" />
          <p>Github</p>
        </div>
      </div>
    </div>
  );
}

export default SocialLogin;
