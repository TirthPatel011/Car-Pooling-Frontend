import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("api/users/forgotpassword", { email: data.email });
      if (res.status === 200) {
        setMessage("A reset code has been sent to your email.");
        // Optionally navigate to a "check your email" page or reset page with token
        // navigate(`/reset-password/${res.data.token}`);
      }
    } catch (error) {
      setMessage("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        .forgot-password-page {
          background: linear-gradient(135deg, #000000, #1A3C34);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .forgot-password-page::before {
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

        .forgot-password-container {
          background: rgba(0, 0, 0, 0.9);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(46, 204, 155, 0.5);
          width: 400px;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: fadeIn 1s ease-in-out;
        }

        .forgot-password-container h1 {
          font-size: 2.5rem;
          color: #2ECC9B;
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
          border: 2px solid #2ECC9B;
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(46, 204, 155, 0.1);
          color: #fff;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #3EEBB1;
          box-shadow: 0 0 10px #2ECC9B;
          outline: none;
        }

        .submit-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
          cursor: pointer;
          font-size: 1.1rem;
          width: 100%;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.7);
          background: #27A583;
        }

        .message {
          margin-top: 15px;
          color: #2ECC9B;
          font-size: 0.9rem;
          text-shadow: 0 0 5px rgba(46, 204, 155, 0.3);
        }

        .back-to-login {
          margin-top: 15px;
          display: block;
          color: #2ECC9B;
          text-decoration: none;
          font-size: 0.9rem;
          transition: text-shadow 0.3s;
        }

        .back-to-login:hover {
          text-shadow: 0 0 5px #2ECC9B;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .forgot-password-container {
            width: 90%;
            padding: 20px;
          }
          .forgot-password-container h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
          </div>
          <input type="submit" className="submit-btn" value="Send Reset Code" />
        </form>
        {message && <p className="message">{message}</p>}
        <a href="/login" className="back-to-login">Back to Login</a>
      </div>
    </div>
  );
};