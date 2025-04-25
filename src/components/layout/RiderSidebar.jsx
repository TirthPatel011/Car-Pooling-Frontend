import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faCar, faHandshake, faRoad, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import carLogo from '../../../image/navbarlogo.png';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RiderSidebar = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isVehicleEditing, setIsVehicleEditing] = useState(false);

  // State for profile
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseId, setLicenseId] = useState('');

  // State for vehicle
  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [carColor, setCarColor] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  // State for add ride
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [ridePrice, setRidePrice] = useState('');

  // State for active rides
  const [activeRides, setActiveRides] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      toast.success(' Successfully logged in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetchUserProfile();
      fetchVehicle();
      fetchActiveRides();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`api/users/${userId}`);
      const user = response.data.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone || '');
      setLicenseId('DL123456');
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  const fetchVehicle = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/vehicle?driverId=${userId}`);
      if (response.data) {
        const vehicle = response.data;
        setVehicleId(vehicle.vehicleId);
        setCarName(vehicle.model);
        setCarNumber(vehicle.licensePlate);
        setAvailableSeats(vehicle.capacity);
        setCarColor(vehicle.color || '');
      } else {
        setVehicleId('');
        setCarName('');
        setCarNumber('');
        setAvailableSeats('');
        setCarColor('');
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    }
  };

  const fetchActiveRides = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/rides?driverId=${userId}`);
      setActiveRides(response.data);
    } catch (error) {
      console.error('Error fetching active rides:', error);
    }
  };

  const handleProfileEdit = async () => {
    if (isProfileEditing) {
      try {
        const updatedData = { firstName, lastName, email, phone };
        await axios.put(`api/users/${userId}`, updatedData);
        toast.success('Profile updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    setIsProfileEditing(!isProfileEditing);
  };

  const handleVehicleButton = async () => {
    if (vehicleId) {
      if (isVehicleEditing) {
        try {
          const updatedData = {
            model: carName,
            licensePlate: carNumber,
            capacity: parseInt(availableSeats),
            color: carColor,
          };
          await axios.put(`http://localhost:3000/vehicle/${vehicleId}`, updatedData);
          toast.success('Vehicle updated successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setIsVehicleEditing(false);
        } catch (error) {
          console.error('Error updating vehicle:', error);
          toast.error('Failed to update vehicle. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        setIsVehicleEditing(true);
      }
    } else {
      try {
        const newVehicle = {
          model: carName,
          licensePlate: carNumber,
          capacity: parseInt(availableSeats),
          color: carColor,
          driverId: userId,
        };
        const response = await axios.post('http://localhost:3000/vehicle', newVehicle);
        setVehicleId(response.data.vehicleId);
        toast.success('Vehicle added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error('Error adding vehicle:', error);
        toast.error('Failed to add vehicle. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const handleAddRide = async () => {
    try {
      const rideData = {
        rideId: uuidv4(),
        driverId: userId,
        source,
        destination,
        dateTime,
        availableSeats: parseInt(availableSeats),
        price: parseFloat(ridePrice),
      };
      await axios.post('http://localhost:3000/rides', rideData);
      toast.success('Ride added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetchActiveRides();
      setSource('');
      setDestination('');
      setDateTime('');
      setRidePrice('');
    } catch (error) {
      console.error('Error adding ride:', error);
      toast.error('Failed to add ride. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
 
  const deactivateRide = async (rideId) => {
    try {
      await axios.delete(`http://localhost:3000/rides/${rideId}`);
      toast.success('Ride deactivated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetchActiveRides();
    } catch (error) {
      console.error('Error deactivating ride:', error);
    }
  };

const [rideRequests, setRideRequests] = useState([]);

useEffect(() => {
  if (userId && activeTab === 'ride-requests') {
    fetchRideRequests();
  }
}, [activeTab, userId]);

const fetchRideRequests = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/ride-requests?driverId=${userId}`);
    const requestsWithPassengerNames = await Promise.all(
      response.data.map(async (request) => {
        try {
          const passengerResponse = await axios.get(`http://localhost:3000/api/users/${request.passengerId}`);
          return {
            ...request,
            passengerName: `${passengerResponse.data.data.firstName} ${passengerResponse.data.data.lastName}`
          };
        } catch (error) {
          console.error('Error fetching passenger details:', error);
          return {
            ...request,
            passengerName: 'Unknown Passenger'
          };
        }
      })
    );
    setRideRequests(requestsWithPassengerNames);
  } catch (error) {
    console.error('Error fetching ride requests:', error);
  }
};

const handleAcceptRequest = async (requestId) => {
  try {
    await axios.put(`http://localhost:3000/ride-requests/${requestId}`, { status: 'accepted' });
    toast.success('Ride request accepted!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    fetchRideRequests();
  } catch (error) {
    console.error('Error accepting ride request:', error);
    alert('Failed to accept ride request.');
  }
};

const handleRejectRequest = async (requestId) => {
  try {
    await axios.put(`http://localhost:3000/ride-requests/${requestId}`, { status: 'rejected' });
    alert('Ride request rejected!');
    fetchRideRequests();
  } catch (error) {
    console.error('Error rejecting ride request:', error);
    alert('Failed to reject ride request.');
  }
};

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <ToastContainer />
      <style>{`
        /* Global Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Orbitron', sans-serif;
        }

        body {
          background: linear-gradient(135deg, #000000, #1A3C34);
          color: #fff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, #2ECC9B, #000000);
          padding: 15px 30px;
          box-shadow: 0 4px 15px rgba(46, 204, 155, 0.4);
          position: sticky;
          top: 0;
          z-index: 10;
          animation: slideIn 0.5s ease-in-out;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo img {
          height: 62px;
          transition: transform 0.3s;
        }

        .logo img:hover {
          transform: scale(1.1);
        }

        .logo span {
          font-size: 1.5rem;
          color: #000000;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-profile img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #2ECC9B;
          transition: box-shadow 0.3s;
        }

        .user-profile img:hover {
          box-shadow: 0 0 10px #2ECC9B;
        }

        .user-profile span {
          font-size: 1.2rem;
          color: #fff;
          text-shadow: 0 0 5px rgba(46, 204, 155, 0.5);
        }

        .container {
          display: flex;
          min-height: calc(100vh - 70px);
        }

        .sidebar {
          width: 300px;
          background: #000000;
          padding: 30px 20px;
          border-right: 3px solid #2ECC9B;
          box-shadow: 2px 0 15px rgba(46, 204, 155, 0.3);
          animation: fadeIn 1s ease-in-out;
        }

        .profile-pic {
          text-align: center;
          margin-bottom: 30px;
        }

        .profile-pic img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid #2ECC9B;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.5);
          transition: transform 0.3s;
        }

        .profile-pic img:hover {
          transform: scale(1.05);
        }

        .profile-pic h3 {
          font-size: 1.5rem;
          color: #2ECC9B;
          text-shadow: 0 0 5px #2ECC9B;
          margin-top: 10px;
        }

        .sidebar-menu a {
          display: flex;
          align-items: center;
          padding: 15px;
          margin: 10px 0;
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          background: rgba(46, 204, 155, 0.1);
        }

        .sidebar-menu a i {
          margin-right: 15px;
          color: #2ECC9B;
          font-size: 1.3rem;
        }

        .sidebar-menu a.active {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.7);
          color: #000000;
        }

        .sidebar-menu a:hover:not(.active) {
          background: rgba(46, 204, 155, 0.3);
          transform: translateX(5px);
        }

        .main-content {
          flex: 1;
          padding: 40px;
          background: rgba(0, 0, 0, 0.9);
          margin: 20px;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(46, 204, 155, 0.3);
          position: relative;
          overflow: hidden;
        }

        .main-content::before {
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

        .tab-content {
          display: none;
          position: relative;
          z-index: 1;
        }

        .tab-content.active {
          display: block;
          animation: fadeIn 0.5s ease-in-out;
        }

        h1 {
          font-size: 2.5rem;
          color: #2ECC9B;
          text-shadow: 0 0 10px rgba(46, 204, 155, 0.5);
          margin-bottom: 10px;
        }

        .subtext {
          font-size: 1rem;
          color: #3EEBB1;
          margin-bottom: 25px;
          font-style: italic;
        }

        .form-section {
          background: rgba(46, 204, 155, 0.1);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #2ECC9B;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.3);
        }

        .form-row {
          display: flex;
          gap: 25px;
          margin-bottom: 20px;
        }

        .form-group {
          flex: 1;
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
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          border-color: #3EEBB1;
          box-shadow: 0 0 10px #2ECC9B;
          outline: none;
        }

        .submit-btn, .edit-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 10px;
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
        }

        .submit-btn:hover, .edit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.7);
          background: #27A583;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
          background: rgba(46, 204, 155, 0.1);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.3);
        }

        th, td {
          padding: 15px;
          text-align: left;
          font-size: 1rem;
          color: #fff;
        }

        th {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          text-shadow: 0 0 5px rgba(46, 204, 155, 0.5);
          color: #000000;
        }

        td {
          border-bottom: 1px solid rgba(46, 204, 155, 0.3);
        }

        .accept-btn, .reject-btn, .toggle-status-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 10px;
        }

        .accept-btn {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
        }

        .reject-btn, .toggle-status-btn.active {
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          color: #fff;
        }

        .toggle-status-btn {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
        }

        .accept-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.7);
          background: #27A583;
        }

        .reject-btn:hover, .toggle-status-btn.active:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(231, 76, 60, 0.7);
          background: #c0392b;
        }

        .ride-requests-list {
          margin-top: 20px;
        }

        .request-card {
          background: rgba(46, 204, 155, 0.1);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #2ECC9B;
          margin-bottom: 20px;
          box-shadow: 0 0 10px rgba(46, 204, 155, 0.3);
        }

        .request-info {
          margin-bottom: 15px;
        }

        .request-info p {
          margin: 5px 0;
          color: #fff;
        }

        .status-pending {
          color: #f39c12;
          font-weight: bold;
        }

        .status-accepted {
          color: #2ecc71;
          font-weight: bold;
        }

        .status-rejected {
          color: #e74c3c;
          font-weight: bold;
        }

        .request-actions {
          text-align: right;
          margin-top: 15px;
        }

        .no-requests-message {
          text-align: center;
          padding: 20px;
          color: #fff;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 3px solid #2ECC9B;
          }
          .main-content {
            margin: 10px;
            padding: 20px;
          }
          .form-row {
            flex-direction: column;
            gap: 15px;
          }
          table {
            font-size: 0.9rem;
          }
          .submit-btn, .edit-btn, .accept-btn, .reject-btn, .toggle-status-btn {
            margin: 5px 0;
            width: 100%;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">
          <img src={carLogo} alt="Car Pool" style={{ width: '63px' }} />
          <span>GreenFuture</span>
        </div>
        <div className="user-profile">
          <img
            src="https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg?t=st=1742445269~exp=1742448869~hmac=f30726838027f73b69ef47ec0f1293cfb1b217f80bc38726763b739b8b481c6e&w=826"
            alt="User Icon"
          />
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="profile-pic">
            <img
              src="https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg?t=st=1742445269~exp=1742448869~hmac=f30726838027f73b69ef47ec0f1293cfb1b217f80bc38726763b739b8b481c6e&w=826"
              alt="Profile"
            />
            <h3>{`${firstName} ${lastName}`}</h3>
          </div>
          <nav className="sidebar-menu">
            <a className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
            <a className={activeTab === 'add-ride' ? 'active' : ''} onClick={() => setActiveTab('add-ride')}>
              <FontAwesomeIcon icon={faPlus} /> Add Ride
            </a>
            <a className={activeTab === 'vehicle-details' ? 'active' : ''} onClick={() => setActiveTab('vehicle-details')}>
              <FontAwesomeIcon icon={faCar} /> Vehicle Details
            </a>
            <a className={activeTab === 'ride-requests' ? 'active' : ''} onClick={() => setActiveTab('ride-requests')}>
              <FontAwesomeIcon icon={faHandshake} /> Ride Requests
            </a>
            <a className={activeTab === 'active-rides' ? 'active' : ''} onClick={() => setActiveTab('active-rides')}>
              <FontAwesomeIcon icon={faRoad} /> Active Rides
            </a>
            <a onClick={logoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </a>
          </nav>
        </aside>

        <main className="main-content">
          <section className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
            <h1>Driver Dashboard</h1>
            <p className="subtext">Customize Your Profile</p>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isProfileEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isProfileEditing}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isProfileEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isProfileEditing}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Driver License ID</label>
                  <input type="text" value={licenseId} disabled />
                </div>
              </div>
              <button className="edit-btn" onClick={handleProfileEdit}>
                {isProfileEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>
          </section>

          <section className={`tab-content ${activeTab === 'add-ride' ? 'active' : ''}`}>
            <h1>Launch a Ride</h1>
            <p className="subtext">Set Up Your Next Journey</p>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>Driver License ID</label>
                  <input type="text" value={licenseId} disabled />
                </div>
                <div className="form-group">
                  <label>Source</label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Enter pickup location"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter drop-off location"
                  />
                </div>
                <div className="form-group">
                  <label>Date and Time</label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={ridePrice}
                    onChange={(e) => setRidePrice(e.target.value)}
                    placeholder="Enter price"
                  />
                </div>
              </div>
              <button className="submit-btn" onClick={handleAddRide}>Add Ride</button>
            </div>
          </section>

          <section className={`tab-content ${activeTab === 'vehicle-details' ? 'active' : ''}`}>
            <h1>Vehicle Command</h1>
            <p className="subtext">Tune Your Ride Settings</p>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>Car Name</label>
                  <input
                    type="text"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    disabled={vehicleId && !isVehicleEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Car Number</label>
                  <input
                    type="text"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    disabled={vehicleId && !isVehicleEditing}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Available Seats</label>
                  <input
                    type="number"
                    value={availableSeats}
                    onChange={(e) => setAvailableSeats(e.target.value)}
                    disabled={vehicleId && !isVehicleEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Car Color</label>
                  <input
                    type="text"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                    disabled={vehicleId && !isVehicleEditing}
                  />
                </div>
              </div>
              <button className="edit-btn" onClick={handleVehicleButton}>
                {vehicleId ? (isVehicleEditing ? 'Save Vehicle' : 'Edit Vehicle') : 'Add Vehicle'}
              </button>
            </div>
          </section>

          <section className={`tab-content ${activeTab === 'ride-requests' ? 'active' : ''}`}>
            <h1>Ride Requests</h1>
            <p className="subtext">Manage Incoming Requests</p>
            <div className="ride-requests-list">
              {rideRequests.length > 0 ? (
                rideRequests.map((request) => (
                  <div className="request-card" key={request.requestId}>
                    <div className="request-info">
                      <p><strong>Request ID:</strong> {request.requestId}</p>
                      <p><strong>Passenger Name:</strong> {request.passengerName}</p>
                      <p><strong>From:</strong> {request.source}</p>
                      <p><strong>To:</strong> {request.destination}</p>
                      <p><strong>Request Date:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                      <p><strong>Status:</strong> 
                        <span className={`status-${request.status.toLowerCase()}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className="request-actions">
                      {request.status === 'pending' && (
                        <>
                          <button className="accept-btn" onClick={() => handleAcceptRequest(request.requestId)}>
                            Accept
                          </button>
                          <button className="reject-btn" onClick={() => handleRejectRequest(request.requestId)}>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-requests-message">
                  <p>No pending ride requests.</p>
                </div>
              )}
            </div>
          </section>

          <section className={`tab-content ${activeTab === 'active-rides' ? 'active' : ''}`}>
            <h1>Active Rides</h1>
            <p className="subtext">Monitor Your Current Routes</p>
            <table>
              <thead>
                <tr>
                  <th>Ride ID</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Date & Time</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeRides.map((ride) => (
                  <tr key={ride.rideId}>
                    <td>{ride.rideId}</td>
                    <td>{ride.source}</td>
                    <td>{ride.destination}</td>
                    <td>{new Date(ride.dateTime).toLocaleString()}</td>
                    <td>${ride.price}</td>
                    <td>Active</td>
                    <td>
                      <button
                        className="toggle-status-btn active"
                        onClick={() => deactivateRide(ride.rideId)}
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export { RiderSidebar };