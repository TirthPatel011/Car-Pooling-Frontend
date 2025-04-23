import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faSignOutAlt, faBook, faBan } from '@fortawesome/free-solid-svg-icons';
import carLogo from '../../../image/navbarlogo.png';
import axios from 'axios';

const PassangerSidebar = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('id');
  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    if (userId) {
      fetchPassengerProfile();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (activeTab === 'search-ride') {
        fetchAllRides();
      } else if (activeTab === 'bookings') {
        fetchBookings();
      }
    }
  }, [activeTab, userId]);

  const fetchPassengerProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
      const user = response.data.data;
      setFirstName(user.firstName || 'PassengerFirst');
      setLastName(user.lastName || 'PassengerLast');
      setEmail(user.email || 'passenger@example.com');
      setPhone(user.phone || '123-456-7890');
      setProfilePicture(user.profilePicture || 'https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg');
    } catch (error) {
      console.error('Error fetching passenger profile:', error);
    }
  };

  const fetchAllRides = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rides`);
      const ridesWithDetails = await Promise.all(
        response.data
          .filter((ride) => ride.status === 'active')
          .map(async (ride) => {
            let driver = null;
            let vehicle = null;

            if (ride.driverId) {
              // Fetch driver details
              try {
                const driverResponse = await axios.get(`${BASE_URL}/api/users/${ride.driverId}`);
                driver = driverResponse.data.data;
              } catch (error) {
                console.error(`Error fetching driver details for driverId ${ride.driverId}:`, error);
              }

              // Fetch vehicle details using driverId
              try {
                const vehicleResponse = await axios.get(`${BASE_URL}/vehicle?driverId=${ride.driverId}`);
                vehicle = vehicleResponse.data;
              } catch (error) {
                console.error(`Error fetching vehicle details for driverId ${ride.driverId}:`, error);
              }
            }

            return {
              ...ride,
              driver,
              vehicle,
            };
          })
      );
      setSearchResults(ridesWithDetails);
    } catch (error) {
      console.error('Error fetching all rides:', error);
      setSearchResults([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/booking?passengerId=${userId}`);
      const bookingsWithDetails = await Promise.all(
        response.data.map(async (booking) => {
          let ride = null;
          let driver = null;
          if (booking.rideId) {
            try {
              const rideResponse = await axios.get(`${BASE_URL}/rides/${booking.rideId}`);
              ride = rideResponse.data;
              if (ride.driverId) {
                const driverResponse = await axios.get(`${BASE_URL}/api/users/${ride.driverId}`);
                driver = driverResponse.data.data;
              }
            } catch (error) {
              console.error(`Error fetching ride or driver details for rideId ${booking.rideId}:`, error);
            }
          }
          return {
            ...booking,
            ride,
            driver,
          };
        })
      );
      setBookings(bookingsWithDetails);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Error handling...
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleProfileEdit = async () => {
    if (isEditing) {
      const updatedData = { firstName, lastName, email, phone };
      try {
        await axios.put(`${BASE_URL}/api/users/${userId}`, updatedData);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleSearchRide = async (e) => {
    e.preventDefault();
    const source = e.target.elements.source.value.toLowerCase();
    const destination = e.target.elements.destination.value.toLowerCase();
    const date = e.target.elements.date.value;

    try {
      const params = { source, destination };
      if (date) params.dateTime = date;

      const response = await axios.get(`${BASE_URL}/rides`, { params });
      const rides = response.data.filter((ride) => ride.status === 'active');

      const ridesWithDetails = await Promise.all(
        rides.map(async (ride) => {
          let driver = null;
          let vehicle = null;

          if (ride.driverId) {
            try {
              const driverResponse = await axios.get(`${BASE_URL}/api/users/${ride.driverId}`);
              driver = driverResponse.data.data; // Adjust if necessary
            } catch (error) {
              console.error(`Error fetching driver details for driverId ${ride.driverId}:`, error);
            }

            try {
              const vehicleResponse = await axios.get(`${BASE_URL}/vehicle?driverId=${ride.driverId}`);
              vehicle = vehicleResponse.data;
            } catch (error) {
              console.error(`Error fetching vehicle details for driverId ${ride.driverId}:`, error);
            }
          }

          return {
            ...ride,
            driver,
            vehicle,
          };
        })
      );

      setSearchResults(ridesWithDetails);
    } catch (error) {
      console.error('Error searching rides:', error);
      setSearchResults([]);
    }
  };

  const handleBookRide = async (ride) => {
    if (!ride || !ride.rideId || !ride.price) {
      console.error('Invalid ride data:', ride);
      alert('Cannot book ride: Ride information is missing.');
      return;
    }
    if (!userId) {
      console.error('User ID is missing');
      alert('Cannot book ride: Please log in.');
      return;
    }

    try {
      const bookingData = {
        bookingId: `B${Date.now()}`,
        rideId: ride.rideId,
        passengerId: userId,
        seatsBooked: 1,
        totalFare: Number(ride.price), // Ensure it’s a number
      };
      await axios.post(`${BASE_URL}/booking`, bookingData);
      alert('Ride booked successfully!');
      await fetchBookings(); // Ensure bookings are fetched after successful booking
    } catch (error) {
      console.error('Error booking ride:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
        console.error('Status:', error.response.status);
        alert(`Failed to book ride: ${error.response.data.message || 'Internal Server Error'}`);
      } else {
        console.error('Error Message:', error.message);
        alert('Failed to book ride. Please check your internet connection or try again later.');
      }
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`${BASE_URL}/booking/${bookingId}`);
      alert('Booking cancelled successfully!');
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <style>{`
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
          align-items: center;
          justify-content: space-between;
          padding: 15px 30px;
          background: linear-gradient(90deg, #2ECC9B, #000000);
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
          height: 50px;
          transition: transform 0.3s;
        }
        .logo img:hover {
          transform: scale(1.1);
        }
        .logo span {
          font-size: 1.5rem;
          color: black;
          text-shadow: 0 0 5px rgba(46, 204, 155, 0.5);
          font-weight: bold;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .user-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #2ECC9B;
          transition: box-shadow 0.3s;
        }
        .user-icon:hover {
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
          color: #2ECC9B;
          font-size: 1.5rem;
          text-shadow: 0 0 5px #2ECC9B;
          margin-top: 10px;
        }
        .sidebar-menu a {
          display: flex;
          align-items: center;
          padding: 15px;
          margin: 10px 0;
          text-decoration: none;
          color: #fff;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          background: rgba(46, 204, 155, 0.1);
        }
        .sidebar-menu a i {
          margin-right: 15px;
          font-size: 1.3rem;
          color: #2ECC9B;
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
          margin: 20px;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(46, 204, 155, 0.3);
          overflow: hidden;
          position: relative;
        }
        .main-content::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
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
        .main-content h1 {
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
          color: #fff;
          background: ${isEditing ? 'rgba(46, 204, 155, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
          transition: all 0.3s ease;
        }
        .form-group input:focus {
          border-color: #3EEBB1;
          box-shadow: 0 0 10px #2ECC9B;
          outline: none;
        }
        .edit-btn, .search-btn, .book-btn, .cancel-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          cursor: pointer;
          margin-right: 10px;
          transition: all 0.3s ease;
        }
        .edit-btn, .search-btn, .book-btn {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
        }
        .cancel-btn {
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          color: #fff;
        }
        .edit-btn:hover, .search-btn:hover, .book-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.7);
          background: #27A583;
        }
        .cancel-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(231, 76, 60, 0.7);
          background: #c0392b;
        }
        .ride-results, .bookings-list {
          margin-top: 30px;
        }
        .ride-card, .booking-card {
          background: rgba(46, 204, 155, 0.1);
          padding: 25px;
          border-radius: 15px;
          border: 1px solid #2ECC9B;
          margin-bottom: 25px;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.3);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .ride-card:hover, .booking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(46, 204, 155, 0.5);
        }
        .ride-card p, .booking-card p {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 8px;
        }
        .ride-card strong, .booking-card strong {
          color: #2ECC9B;
          text-shadow: 0 0 3px rgba(46, 204, 155, 0.3);
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
          .header {
            flex-direction: column;
            padding: 10px;
          }
          .user-profile {
            margin-top: 10px;
          }
          .edit-btn, .search-btn, .book-btn, .cancel-btn {
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
          <img src={profilePicture} alt="User Icon" className="user-icon" style={{ width: '50px' }} />
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="profile-pic">
            <img src={profilePicture} alt="Profile Picture" style={{ width: '100px' }} />
            <h3>{`${firstName} ${lastName}`}</h3>
          </div>
          <nav className="sidebar-menu">
            <a className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
            <a className={activeTab === 'search-ride' ? 'active' : ''} onClick={() => handleTabChange('search-ride')}>
              <FontAwesomeIcon icon={faSearch} /> Search Ride
            </a>
            <a className={activeTab === 'bookings' ? 'active' : ''} onClick={() => handleTabChange('bookings')}>
              <FontAwesomeIcon icon={faBook} /> Bookings
            </a>
            <a onClick={logoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </a>
          </nav>
        </aside>

        <main className="main-content">
          {/* Profile Tab */}
          <section className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
            <h1>Passenger Profile</h1>
            <p className="subtext">Customize Your Journey</p>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email ID</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <button className="edit-btn" onClick={handleProfileEdit}>
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>
          </section>

          {/* Search Ride Tab */}
          <section className={`tab-content ${activeTab === 'search-ride' ? 'active' : ''}`}>
            <h1>Search for a Ride</h1>
            <p className="subtext">Find Your Perfect Route</p>
            <form className="form-section" onSubmit={handleSearchRide}>
              <div className="form-row">
                <div className="form-group">
                  <label>Source</label>
                  <input type="text" name="source" placeholder="Enter source" required />
                </div>
                <div className="form-group">
                  <label>Destination</label>
                  <input type="text" name="destination" placeholder="Enter destination" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" name="date" />
                </div>
              </div>
              <button className="search-btn" type="submit">Search Rides</button>
            </form>
            <div className="ride-results">
              {searchResults.length > 0 ? (
                searchResults.map((ride) => (
                  <div className="ride-card" key={ride.rideId}>
                    <p><strong>Ride ID:</strong> {ride.rideId}</p>
                    <p><strong>Source:</strong> {ride.source}</p>
                    <p><strong>Destination:</strong> {ride.destination}</p>
                    <p><strong>Date:</strong> {new Date(ride.dateTime).toLocaleDateString()}</p>
                    <p><strong>Price:</strong> ${ride.price}</p>
                    <p><strong>Vehicle Model:</strong> {ride.vehicle?.model || 'N/A'}</p>
                    <p><strong>Vehicle Color:</strong> {ride.vehicle?.color || 'N/A'}</p>
                    <p><strong>Vehicle License Plate:</strong> {ride.vehicle?.licensePlate || 'N/A'}</p>
                    <p><strong>Driver First Name:</strong> {ride.driver?.firstName || 'N/A'}</p>
                    <p><strong>Driver Last Name:</strong> {ride.driver?.lastName || 'N/A'}</p>
                    <p><strong>Driver Email:</strong> {ride.driver?.email || 'N/A'}</p>
                    <p><strong>Driver Phone:</strong> {ride.driver?.phone || 'N/A'}</p>
                    <button className="book-btn" onClick={() => handleBookRide(ride)}>Book Now</button>
                  </div>
                ))
              ) : (
                <p>No rides available. Try adjusting your search criteria!</p>
              )}
            </div>
          </section>

          {/* Bookings Tab */}
          <section className={`tab-content ${activeTab === 'bookings' ? 'active' : ''}`}>
            <h1>Your Bookings</h1>
            <p className="subtext">Manage Your Rides</p>
            <div className="bookings-list">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div className="booking-card" key={booking.bookingId}>
                    <p><strong>Ride ID:</strong> {booking.rideId}</p>
                    <p><strong>Source:</strong> {booking.ride?.source || 'N/A'}</p>
                    <p><strong>Destination:</strong> {booking.ride?.destination || 'N/A'}</p>
                    <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                    <p><strong>Total Fare:</strong> ${booking.totalFare}</p>
                    <p><strong>Status:</strong> {booking.status || 'Booked'}</p>
                    <p><strong>Driver First Name:</strong> {booking.driver?.firstName || 'N/A'}</p>
                    <p><strong>Driver Last Name:</strong> {booking.driver?.lastName || 'N/A'}</p>
                    <p><strong>Driver Email:</strong> {booking.driver?.email || 'N/A'}</p>
                    <p><strong>Driver Phone:</strong> {booking.driver?.phone || 'N/A'}</p>
                    {(!booking.status || booking.status !== 'Cancelled') && (
                      <button className="cancel-btn" onClick={() => handleCancelBooking(booking.bookingId)}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No bookings yet. Book a ride to get started!</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export { PassangerSidebar };