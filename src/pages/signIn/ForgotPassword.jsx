import { useContext, useState } from "react";
import bgImg from "../../assets/bg2-removebg-preview.png";
import { AuthContext } from "../../components/provider/AuthProvider";

const ForgotPassword = () => {
  const { resetPassword, email } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(() => {
        setMessage(
          "A password reset email has been sent to your email address.After change password, you can login again."
        );
        window.open("https://gmail.com", "_blank");
        setError("");
      })
      .catch(() => {
        setMessage("");
        setError(
          "Failed to send reset email. Please check your email address."
        );
      });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
      }}
      className="flex flex-col border-2 w-full mx-auto justify-center items-center py-20"
    >
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border-2 py-24 lg:py-36 rounded-2xl shadow-xl px-5  backdrop-blur-xl bg-white/30"
      >
        <h1 className="font-bold text-xl underline pb-5">
          Check Email, Click on Reset Button
        </h1>
        <div className="my-4 px-4 md:px-0">
          <label className="font-medium text-lg">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={email || ""}
            placeholder="Enter Your Email"
            className="input input-bordered input-info w-full"
            required
          />
        </div>
        <div className="px-4 md:px-0">
          <button
            type="submit"
            className="btn bg-primary rounded-md w-full text-white py-2 hover:bg-button"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
