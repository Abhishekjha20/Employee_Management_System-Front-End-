import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";  //reflect the login page after signup.

const SignUp = () => {
  const navigate = useNavigate();  //Initialize navigate hook
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/register", {
        email: email,
        name: name,
        password: password,
      });

      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  let imgs = [
    'https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg',
  ];

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <form>
            <h2 className="text-center mb-4">Create Your Account</h2>
            <p className="text-center mb-3">{registerStatus}</p>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email Address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={(e) => register(e)}
              >
                Sign Up
              </button>
            </div>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="login" className="text-primary">
                Login
              </a>
            </p>
          </form>
        </div>

        <div className="col-md-6">
          <img
            src={imgs[0]}
            className="img-fluid"
            alt="Illustration"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
