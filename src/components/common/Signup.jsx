import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/api/roles");
        // Filter out the admin role
        const filteredRoles = res.data.data.filter(role => 
          role.role_name !== "Admin"
        );
        setRoles(filteredRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/api/users", data);
      if (res.status === 201) {
        toast.success("Registered successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("User not created", {
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
      toast.error("Error creating user: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="signup-page">
      <ToastContainer />
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        .signup-page {
          background: linear-gradient(135deg, #000000, #1A3C34);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .signup-page::before {
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

        .signup-container {
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

        .signup-container h1 {
          font-size: 2.5rem;
          color: #2ECC9B;
          text-shadow: 0 0 10px rgba(46, 204, 155, 0.5);
          margin-bottom: 20px;
        }

        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          flex: 1;
          text-align: left;
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 1rem;
          color: #fff;
          margin-bottom: 8px;
          text-shadow: 0 0 3px rgba(46, 204, 155, 0.3);
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 2px solid #2ECC9B;
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(46, 204, 155, 0.1);
          color: #fff;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .form-group select {
          appearance: none;
          background-image: url('data:image/svg+xml;utf8,<svg fill="%232ECC9B" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 12px top 50%;
        }

        /* Style the dropdown options */
        .form-group select option {
          background: rgba(0, 0, 0, 0.9); /* Match the container background */
          color: #fff; /* White text for options */
          font-family: 'Orbitron', sans-serif;
          padding: 10px;
        }

        /* Style the dropdown menu when open */
        .form-group select:focus,
        .form-group input:focus {
          border-color: #3EEBB1;
          box-shadow: 0 0 10px #2ECC9B;
          outline: none;
        }

        /* Attempt to style the dropdown menu (browser support varies) */
        .form-group select::-webkit-scrollbar {
          width: 8px;
        }

        .form-group select::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.9);
        }

        .form-group select::-webkit-scrollbar-thumb {
          background: #2ECC9B;
          border-radius: 4px;
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .signup-container {
            width: 90%;
            padding: 20px;
          }
          .form-row {
            flex-direction: column;
            gap: 15px;
          }
          .signup-container h1 {
            font-size: 2rem;
          }
        }

        .error-message {
          color: #ff4444;
          font-size: 0.8rem;
          margin-top: 5px;
          text-align: left;
        }

        .form-group input:invalid,
        .form-group select:invalid {
          border-color: #ff4444;
        }
      `}</style>

      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                {...register("firstName", { 
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "First name cannot exceed 50 characters"
                  },
                  pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "First name can only contain letters, spaces, hyphens, and apostrophes"
                  }
                })} 
              />
              {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Last name cannot exceed 50 characters"
                  },
                  pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "Last name can only contain letters, spaces, hyphens, and apostrophes"
                  }
                })} 
              />
              {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
            </div>
          </div>
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
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                }
              })} 
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              {...register("phone", { 
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits"
                }
              })} 
            />
            {errors.phone && <span className="error-message">{errors.phone.message}</span>}
          </div>
          <div className="form-group">
            <label>Role</label>
            <select 
              {...register("roleId", { 
                required: "Role is required",
                validate: value => value !== "" || "Please select a role"
              })}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.role_name}
                </option>
              ))}
            </select>
            {errors.roleId && <span className="error-message">{errors.roleId.message}</span>}
          </div>
          <div style={{ marginBottom: '20px' }}></div>
          <input type="submit" className="submit-btn" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};