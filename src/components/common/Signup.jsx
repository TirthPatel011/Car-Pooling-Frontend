import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/api/roles");
        setRoles(res.data.data);
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
        alert("User created successfully");
        navigate("/login");
      } else {
        alert("User not created");
      }
    } catch (error) {
      alert("Error creating user: " + error.message);
    }
  };

  return (
    <div className="signup-page">
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
      `}</style>

      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" {...register("firstName")} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" {...register("lastName")} />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" {...register("email")} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" {...register("phone")} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select {...register("roleId")}>
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}></div>
          <input type="submit" className="submit-btn" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};