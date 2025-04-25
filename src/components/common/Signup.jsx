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
        const errorMessage = res.data?.message || "Unexpected error occurred. Please try again.";
        toast.error(`User not created: ${errorMessage}`, {
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
      if (error.response) {
        const errorMessage = error.response.data?.message || "An error occurred while creating the user.";
        toast.error(`Error creating user: ${errorMessage}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Network error: Unable to connect to the server.", {
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

        .signup-container {
          display: flex;
          flex-direction: row;
          background: rgba(0, 0, 0, 0.9);
          padding: 20px; /* Reduced padding for a smaller design */
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.5);
          width: 75%; /* Reduced width for a smaller design */
          max-width: 800px; /* Reduced max-width */
          text-align: center;
          position: relative;
          z-index: 1;
          animation: fadeIn 1s ease-in-out;
          overflow: visible; /* Ensures dropdown is not clipped */
        }

        .signup-left {
          flex: 1;
          padding: 10px; /* Reduced padding */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #2ECC9B;
        }

        .signup-left h1 {
          font-size: 1.8rem; /* Reduced font size */
          color: #2ECC9B;
          text-shadow: 0 0 8px rgba(46, 204, 155, 0.5);
          margin-bottom: 10px; /* Reduced margin */
        }

        .signup-left p {
          font-size: 0.8rem; /* Reduced font size */
          color: #fff;
          margin-bottom: 10px; /* Reduced margin */
        }

        .signup-right {
          flex: 2;
          padding: 10px; /* Reduced padding */
        }

        .form-row {
          display: flex;
          gap: 15px; /* Minor spacing between fields */
          margin-bottom: 15px; /* Minor spacing between rows */
        }

        .form-group {
          flex: 1;
          text-align: left;
          margin-bottom: 15px; /* Minor spacing between fields */
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 0.8rem; /* Reduced font size */
          color: #fff;
          margin-bottom: 5px; /* Minor spacing below labels */
          text-shadow: 0 0 2px rgba(46, 204, 155, 0.3);
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 8px; /* Reduced padding */
          border: 2px solid #2ECC9B;
          border-radius: 8px;
          font-size: 0.8rem; /* Reduced font size */
          background: rgba(46, 204, 155, 0.1);
          color: #fff;
          transition: all 0.3s ease;
        }

        .form-group select {
          appearance: none;
          background-color: #000;
          color: #fff;
          background-image: url('data:image/svg+xml;utf8,<svg fill="%232ECC9B" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 10px top 50%;
          z-index: 2;
        }

        .form-group select:focus {
          border-color: #3EEBB1;
          box-shadow: 0 0 8px #2ECC9B;
          outline: none;
          z-index: 3;
        }

        .form-group select option {
          background-color: #000;
          color: #fff;
        }

        .submit-btn {
          padding: 8px 15px; /* Reduced padding */
          border: none;
          border-radius: 20px;
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
          cursor: pointer;
          font-size: 0.9rem; /* Reduced font size */
          width: 100%;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(46, 204, 155, 0.7);
          background: #27A583;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .signup-container {
            flex-direction: column;
            width: 90%;
          }

          .signup-left {
            border-right: none;
            border-bottom: 2px solid #2ECC9B;
          }

          .signup-right {
            padding-top: 10px;
          }

          .form-row {
            flex-direction: column;
          }
        }

        .error-message {
          color: #ff4444;
          font-size: 0.7rem; /* Reduced font size */
          margin-top: 5px;
          text-align: left;
        }
      `}</style>

      <div className="signup-container">
        <div className="signup-left">
          <h1>Welcome!</h1>
          <p>Create your account to join our carpooling community.</p>
        </div>
        <div className="signup-right">
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
    </div>
  );
};