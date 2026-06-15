import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "https://taskmanager-fastapi-varsha.onrender.com/auth/login",
        {
          email: email,
          password: password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token || ""
      );

      localStorage.setItem(
        "role",
        response.data.role || "ADMIN"
      );

      alert("Login Successful");

      window.location.href = "/dashboard";

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#4f46e5,#7c3aed,#9333ea)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "420px",
          padding: "30px",
          borderRadius: "20px"
        }}
      >
        <h1
          className="text-center mb-4"
          style={{ color: "#4f46e5" }}
        >
          Task Manager
        </h1>

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
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account?
          <Link to="/signup" style={{ marginLeft: "5px" }}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
