"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const changeForm = () => alert("Change to Sign up form");
  const redirectToSummary = () => router.push("/Summary");
  const redirectToPrivacyPolicySignup = () =>
    alert("Redirect to Privacy Policy");
  const redirectToLegalNoticeSignup = () => alert("Redirect to Legal Notice");
  const login = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login triggered");
  };

  return (
    <div className="relative min-h-screen bg-[#F6F7F8] font-sans overflow-x-hidden">
      <header className="fixed top-0 w-full flex justify-between px-[75px] pt-[20px] z-50">
        <div className="relative w-[177px] h-[208px]">
          <Image
            src="/joinlogo2.png"
            alt="Join Logo Mobile"
            width={274}
            height={334}
            id="logo2"
            className="hidden md:hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-shrinkAndMove logoMobile"
          />
        </div>

        {/* Sign Up Container */}
        <div className="absolute top-[67px] right-[75px] flex items-center gap-[35px] w-[279px] h-[49px]">
          <p className="text-[20px]">Not a Join user?</p>
          <button
            onClick={changeForm}
            className="w-[91px] h-[49px] rounded-[8px] bg-[#2A3647] text-white font-bold text-[16px] px-4 py-3 hover:bg-[#29ABE2] hover:shadow-md transition duration-200"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div className="form bg-white rounded-[30px] w-[652px] h-[493px] flex flex-col items-center">
          {/* Headline */}
          <div className="formHeadline flex flex-col items-center mt-[20px] mb-[12px]">
            <h1 className="text-[61px] font-bold leading-[73.2px] text-center mb-[16px]">
              Log in
            </h1>
            <div className="w-[150px] border-b-4 border-blue-500 rounded-[8px] mb-[12px]"></div>
          </div>

          {/* Form */}
          <form className="mailPassword flex flex-col" onSubmit={login}>
            <div>
              <input
                id="email-login"
                type="email"
                placeholder="Email"
                required
                className="inputMail w-[422px] h-[48px] m-4 rounded-[10px] border border-gray-300 text-[20px] font-normal pl-[21px] bg-no-repeat bg-right-[377px] bg-[url('/img/mail.png')] placeholder-gray-400"
              />
            </div>
            <div>
              <input
                id="password-login"
                type="password"
                placeholder="Password"
                required
                className="inputPassword w-[422px] h-[48px] m-[16px_16px_4px_16px] rounded-[10px] border border-gray-300 text-[20px] font-normal pl-[21px] bg-no-repeat bg-right-[377px] bg-[url('/img/lock.png')] placeholder-gray-400"
              />
            </div>

            {/* Message Box */}
            <div className="notification flex justify-start items-center h-[20px] ml-[32px] mb-[10px]">
              <p id="msgbox" className="text-red-600"></p>
            </div>

            {/* Remember Me Checkbox */}
            <div
              id="checkboxSignUp"
              className="loginCheckbox flex items-center gap-2 ml-[39px] mb-[20px]"
            >
              <input
                type="checkbox"
                id="loginCheckBoxRememberMe"
                className="hidden"
              />
              <label
                htmlFor="loginCheckBoxRememberMe"
                className="inline-block w-[16px] h-[16px] border-2 border-[#2A3647] rounded-[3px] cursor-pointer relative"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[24px] text-[#2A3647] pointer-events-none select-none opacity-0 peer-checked:opacity-100">
                  &#10003;
                </span>
              </label>
              <p className="text-[16px] font-normal text-[#2A3647]">
                Remember me
              </p>
            </div>

            {/* Buttons */}
            <div className="buttons flex justify-center gap-[35px] mb-[48px]">
              <button
                type="submit"
                className="buttonLogin w-[110px] h-[48px] rounded-[8px] bg-[#2A3647] text-white font-bold text-[21px] hover:bg-[#29ABE2] hover:shadow-md transition duration-200"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={redirectToSummary}
                className="cursor-pointer buttonGuest w-[177px] h-[48px] rounded-[8px] border border-[#2A3647] bg-white text-[#2A3647] font-bold text-[21px] hover:border-[2px] hover:border-blue-400 hover:shadow-md transition duration-200"
              >
                Guest Log in
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Sign Up Container */}
        <div className="signUpMobile hidden flex-row items-center gap-[35px] w-[279px] h-[49px] mb-[26px] md:hidden">
          <p className="text-[20px]">Not a Join user?</p>
          <button
            onClick={changeForm}
            className="sign_up_button w-[91px] h-[49px] rounded-[8px] bg-[#2A3647] text-white font-bold text-[16px] px-4 py-3 hover:bg-[#29ABE2] hover:shadow-md transition duration-200"
          >
            Sign up
          </button>
        </div>

        {/* Footer */}
        <footer className="footer flex gap-[35px] mb-[48px] items-end">
          <a
            className="footerLinks cursor-pointer text-[#A8A8A8] text-[16px] font-normal hover:text-blue-400 hover:scale-110 transition duration-200"
            onClick={redirectToPrivacyPolicySignup}
          >
            Privacy Policy
          </a>
          <a
            className="footerLinks cursor-pointer text-[#A8A8A8] text-[16px] font-normal hover:text-blue-400 hover:scale-110 transition duration-200"
            onClick={redirectToLegalNoticeSignup}
          >
            Legal notice
          </a>
        </footer>
      </main>
    </div>
  );
}
