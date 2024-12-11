import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const terms = e.target.terms.checked;

    // reset error and status
    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one uppercase, one lowercase, one number, one special character"
      );
      return;
    }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send verification email address
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification email sent");
        });

        // update profile name and photo url
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("User profile updated");
          })
          .catch((error) => console.log("User profile update error", error));
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card w-full max-w-sm shrink-0 shadow-2xl text-center mx-auto mt-10">
      <h3 className="text-3xl font-bold">Sign Up now!</h3>

      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="name"
            name="photo"
            placeholder="photo"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="btn btn-xs absolute right-2 top-12"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        {errorMessage && (
          <p className="text-left text-sm text-red-600">{errorMessage}</p>
        )}
        {success && <p className="text-green-500">Sign up is Successful.</p>}

        <div className="form-control">
          <label className="label justify-start gap-2 cursor-pointer">
            <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text hover:underline text-xs">
              Accept Our Terms And Conditions
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      <p className="m-2">
        Already have an account? Please{" "}
        <Link className="underline" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
