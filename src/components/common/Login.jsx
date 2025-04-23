import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { ForgotPassword } from './ForgotPassword'; // Import ForgotPassword component

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("api/users/login", data);
      console.log(res.data);
      if (res.status === 200) {
        alert("Login Success");
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.role_name);

        if (res.data.data.roleId.role_name === "Admin") {
          navigate("/admin");
        }
        if (res.data.data.roleId.role_name === "Driver") {
          navigate("/rider");
        }
        if (res.data.data.roleId.role_name === "passanger") {
          navigate("/passanger");
        }
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        .login-page {
          background: linear-gradient(135deg, #000000, #1A3C34); /* Black to dark teal */
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(46, 204, 155, 0.2), transparent);
          z-index: 0;
          pointer-events: none;
        }

        .login-container {
          background: rgba(0, 0, 0, 0.9); /* Semi-transparent black */
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(46, 204, 155, 0.5);
          width: 400px;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: fadeIn 1s ease-in-out;
        }

        .login-container h1 {
          font-size: 2.5rem;
          color: #2ECC9B; /* Teal text */
          text-shadow: 0 0 10px rgba(46, 204, 155, 0.5);
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 1rem;
          color: #fff;
          margin-bottom: 8px;
          text-shadow: 0 0 3px rgba(46, 204, 155, 0.3);
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #2ECC9B; /* Teal border */
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(46, 204, 155, 0.1); /* Teal tint */
          color: #fff;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #3EEBB1; /* Lighter teal */
          box-shadow: 0 0 10px #2ECC9B;
          outline: none;
        }

        .submit-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(45deg, #2ECC9B, #27A583); /* Teal gradient */
          color: #000000; /* Black text */
          cursor: pointer;
          font-size: 1.1rem;
          width: 100%;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.7);
          background: #27A583; /* Darker teal */
        }

        .forgot-password {
          margin-top: 15px;
          display: block;
          color: #2ECC9B; /* Teal text */
          text-decoration: none;
          font-size: 0.9rem;
          transition: text-shadow 0.3s;
        }

        .forgot-password:hover {
          text-shadow: 0 0 5px #2ECC9B;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .login-container {
            width: 90%;
            padding: 20px;
          }
          .login-container h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" {...register("email")} placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} placeholder="Enter password" />
          </div>
          <input type="submit" className="submit-btn" value="Login" />
        </form>
        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};