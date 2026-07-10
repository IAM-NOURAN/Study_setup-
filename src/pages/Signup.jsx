import React from 'react'
import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import api from "../services/api";

const signupSchema = z.object({
  username: z.string().min(1, "Full name is required"),

  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",

    path: ["confirmPassword"],
  });

export default function Signup() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    const result = signupSchema.safeParse({

      username,

      email,

      password,

      confirmPassword,

    });

    if (!result.success) {

      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({

        username: fieldErrors.username?.[0],

        email: fieldErrors.email?.[0],

        password: fieldErrors.password?.[0],

        confirmPassword: fieldErrors.confirmPassword?.[0],

      });

      return;

    }

    setErrors({});

    try {
      const users = await api.get("/");

      const existingUser = users.data.find(
        (user) => user.email === email
      );

      console.log(existingUser);

      if (existingUser) {
        setErrors({
          email: "This email already exists",
        });

        return;
      }

      const response = await api.post("/", {
        username,
        email,
        password,
      });

      console.log(response.data);

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-header">

          <h2>Create Account</h2>

          <p>Sign up to get started</p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Username */}

          <div className={`form-group ${errors.username ? "error" : ""}`}>

            <div className="input-wrapper">

              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);

                  if (errors.username) {
                    setErrors((prev) => ({
                      ...prev,
                      username: "",
                    }));
                  }
                }}
                required
              />

              <label>Full Name</label>

            </div>

            <div className="error-text">
              {errors.username}
            </div>

          </div>

          {/* Email */}

          <div className={`form-group ${errors.email ? "error" : ""}`}>

            <div className="input-wrapper">

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));
                  }
                }}
                required
              />

              <label>Email</label>

            </div>

            <div className="error-text">
              {errors.email}
            </div>

          </div>

          {/* Password */}

          <div className={`form-group ${errors.password ? "error" : ""}`}>

            <div className="input-wrapper">

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                    }));
                  }
                }}
                required
              />

              <label>Password</label>

            </div>

            <div className="error-text">
              {errors.password}
            </div>

          </div>

          {/* Confirm Password */}

          <div className={`form-group ${errors.confirmPassword ? "error" : ""}`}>

            <div className="input-wrapper">

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);

                  if (errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "",
                    }));
                  }
                }}
                required
              />

              <label>Confirm Password</label>

            </div>

            <div className="error-text">
              {errors.confirmPassword}
            </div>

          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Sign Up
          </button>

        </form>

        <div className="signup-link">

          <p>

            Already have an account?{" "}

            <Link to="/login">
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

