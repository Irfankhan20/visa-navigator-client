import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useContext, useState } from "react";
import { usePhoto } from "../../utilities/ImageHosting"; // Ensure this function is properly implemented for image uploads
import { AuthContext } from "../../components/provider/AuthProvider";
import { toast } from "react-toastify";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasLowercase) {
      return "Password must include at least one lowercase letter.";
    }
    if (!isValidLength) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.files[0];

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setPasswordError("");

    // Upload photo or use default image
    let imageUrl =
      "https://i.ibb.co.com/LNDqG5r/profile-png-removebg-preview.png";
    if (photo) {
      try {
        imageUrl = await usePhoto(photo);
      } catch (error) {
        console.error("Photo upload failed:", error);
        toast.error("Failed to upload photo. Please try again.");
        return;
      }
    }

    // Create user
    createUser(email, password)
      .then((result) => {
        toast.success("Signup successful!");
        console.log("User created:", result.user);
        handleUpdateProfile(name, imageUrl);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        toast.error("Signup failed. Please try again.");
      });

    // Update user profile
    const handleUpdateProfile = (name, imageUrl) => {
      const profile = { displayName: name, photoURL: imageUrl };
      updateUserProfile(profile)
        .then(() => console.log("Profile updated"))
        .catch((error) => console.error("Error updating profile:", error));
    };
  };

  return (
    <div className="lg:min-h-[70vh] w-full bg-green-200 border-black lg:mt-[75px] md:mt-[60px] mt-[62px] md:py-10 md:px-8 lg:px-0 md:flex md:justify-center lg:gap-10 md:items-center">
      <div className="text-center mb-4 md:mb-0 lg:mb-0 lg:text-left">
        <h1 className="text-3xl mt-8 md:mt-0 lg:mt-0 md:text-start text-center text-button font-bold italic">
          <span className="text-gray-500">Sign Up Now to </span>
        </h1>
        <h1 className="text-3xl md:mb-8 md:mt-3 md:text-start text-center text-button font-bold italic">
          VisaNavigator
        </h1>
      </div>
      <div className="bg-white/30 bg-blend-saturation w-full px-2 max-w-lg shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body">
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered shadow-lg"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered shadow-lg"
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Photo (optional)</span>
            </label>
            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered file-input-success w-full"
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                className="input input-bordered shadow-lg w-full"
                required
              />
              <span
                className="absolute top-4 right-3 text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {/* Password Error Message */}
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="py-3 rounded-lg bg-button text-white">
              Signup
            </button>
          </div>

          {/* Redirect to SignIn */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account on{" "}
              <span className="font-semibold text-primary">VisaNavigator</span>?
              <Link to="/signin">
                <button className="btn btn-link normal-case text-sky-700">
                  SignIn Here
                </button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
