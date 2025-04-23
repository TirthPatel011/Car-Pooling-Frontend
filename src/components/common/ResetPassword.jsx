import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const token = useParams().token;
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Add navigate hook

  const submitHandler = async (data) => {
    const obj = {
      token: token,
      password: data.password,
    };
    try {
      const res = await axios.post("api/users/resetpassword", obj);
      console.log("Password updated successfully");
      setMessage("Password updated successfully");
      setTimeout(() => {
        navigate("/login"); // Navigate to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage("Failed to update password: " + error.message);
    }
  };

  return (
    <div className="reset-password-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        .reset-password-page {
          background: linear-gradient(135deg, #000000, #1A3C34); /* Black to dark teal */
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .reset-password-page::before {
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

        .reset-password-container {
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

        .reset-password-container h1 {
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

        .message {
          margin-top: 15px;
          color: #2ECC9B; /* Teal text */
          font-size: 0.9rem;
          text-shadow: 0 0 5px rgba(46, 204, 155, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .reset-password-container {
            width: 90%;
            padding: 20px;
          }
          .reset-password-container h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="reset-password-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter new password"
            />
          </div>
          <input type="submit" className="submit-btn" value="Reset Password" />
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};