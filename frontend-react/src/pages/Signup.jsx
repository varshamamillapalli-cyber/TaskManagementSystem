import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        {
          username: username,
          email: email,
          password: password
        }
      );

      alert("Signup Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "450px",
          padding: "30px",
          borderRadius: "20px"
        }}
      >
        <h1 className="text-center mb-4 text-success">
          Create Account
        </h1>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={signupUser}
        >
          Signup
        </button>

        <p className="text-center mt-3">
          Already have an account?
          <Link to="/" style={{ marginLeft: "5px" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}