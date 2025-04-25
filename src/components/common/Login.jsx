import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { ForgotPassword } from './ForgotPassword'; // Import ForgotPassword component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("api/users/login", data);
      console.log(res.data);
      if (res.status === 200) {
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Login Failed: " + error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
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

        .error-message {
          color: #ff4444;
          font-size: 0.8rem;
          margin-top: 5px;
          text-align: left;
        }
        .form-group input.error {
          border-color: #ff4444;
        }
      `}</style>

      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })} 
              className={errors.email ? "error" : ""}
              placeholder="Enter email" 
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters"
                }
              })} 
              className={errors.password ? "error" : ""}
              placeholder="Enter password" 
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          <input type="submit" className="submit-btn" value="Login" />
        </form>
        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
        <div style={{ marginTop: '15px' }}>
          <span style={{ color: '#fff' }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: '#2ECC9B', textDecoration: 'none' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};