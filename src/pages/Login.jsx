import React from 'react'
import { useState } from "react";
import { z } from "zod";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),
});


export default function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();


    async function handleSubmit(e) {

        e.preventDefault();

        const result = loginSchema.safeParse({
            email,
            password,
        });

        if (!result.success) {

            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });

            return;
        }

        setErrors({});

        try {

            const users = await api.get("/");

            const user = users.data.find(
                (user) =>
                    user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
                    user.password === password
            );

            if (!user) {

                setErrors({
                    email: "Invalid email or password",
                });

                return;
            }

            login(user);

            localStorage.setItem("user", JSON.stringify(user));

            console.log(user);

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    }

    return (
        <div className="login-container">
            <div className="login-card">

                <div className="login-header">
                    <h2>Sign In</h2>
                    <p>Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${errors.email ? "error" : ""}`}>

                        <div className="input-wrapper">

                            <input
                                type="email"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                required
                            />

                            <label>Email</label>



                        </div>

                        <span className={`error-message ${errors.email ? "show" : ""}`}>
                            {errors.email}
                        </span>

                    </div>

                    <div className={`form-group ${errors.password ? "error" : ""}`}>

                        <div className="input-wrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <label>Password</label>

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className={`toggle-icon ${showPassword ? "show-password" : ""}`}></span>
                            </button>

                        </div>

                        <span className={`error-message ${errors.password ? "show" : ""}`}>
                            {errors.password}
                        </span>

                    </div>

                    <div className="form-options">

                        <div className="remember-wrapper">

                            <input
                                type="checkbox"
                                id="remember"
                            />

                            <label htmlFor="remember" className="checkbox-label">


                                Remember me

                            </label>

                        </div>

                        <Link to="/forgot-password" className="forgot-password">
                            Forgot password?
                        </Link>

                    </div>

                    <button type="submit" className="login-btn">
                        <span className="btn-text">Sign In</span>
                    </button>

                </form>

                <div className="signup-link">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup">Create one</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}
