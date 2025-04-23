import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faRoad, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import carLogo from '../../../image/navbarlogo.png';
import axios from 'axios';

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Profile state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  // Manage users state
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Manage rides state
  const [rides, setRides] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  // Fetch profile data on mount
  useEffect(() => {
    if (userId) {
      fetchAdminProfile();
    }
  }, [userId]);

  // Fetch data based on active tab
  useEffect(() => {
    if (userId) {
      if (activeTab === 'manage-users') {
        fetchUsers();
      } else if (activeTab === 'manage-rides') {
        fetchRides();
      }
    }
  }, [activeTab, userId]);

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      const user = response.data.data;
      setFirstName(user.firstName || 'AdminFirst');
      setLastName(user.lastName || 'AdminLast');
      setEmail(user.email || 'admin@example.com');
      setPhone(user.phone || '987-654-3210');
      setProfilePicture(user.profilePicture || 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg');
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data.data); // Ensure this matches the backend response
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rides');
      const ridesWithDriverNames = await Promise.all(
        response.data.map(async (ride) => {
          try {
            const driverResponse = await axios.get(`http://localhost:3000/api/users/${ride.driverId}`);
            return { ...ride, driverName: `${driverResponse.data.data.firstName} ${driverResponse.data.data.lastName}` };
          } catch (error) {
            console.error(`Error fetching driver for ride ${ride.rideId}:`, error);
            return { ...ride, driverName: 'N/A' };
          }
        })
      );
      setRides(ridesWithDriverNames);
    } catch (error) {
      console.error('Error fetching rides:', error);
      setRides([]);
    }
  };

  const handleProfileEdit = async () => {
    if (isEditing) {
      try {
        const updatedData = { firstName, lastName, email, phone };
        await axios.put(`http://localhost:3000/api/users/${userId}`, updatedData);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user, id: user._id }); // Ensure _id is preserved
  };

  const saveUserEdit = async () => {
    try {
      const { id, ...userData } = editingUser; // Extract id and rest of the data
      await axios.put(`http://localhost:3000/api/users/${id}`, userData);
      alert('User updated successfully!');
      setUsers(users.map(u => (u._id === id ? { ...editingUser } : u)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${userId}`);
        alert('User deleted successfully!');
        setUsers(users.filter(u => u._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteRide = async (rideId) => {
    if (window.confirm('Are you sure you want to delete this ride?')) {
      try {
        await axios.delete(`http://localhost:3000/rides/${rideId}`);
        alert('Ride deleted successfully!');
        setRides(rides.filter(r => r.rideId !== rideId));
      } catch (error) {
        console.error('Error deleting ride:', error);
      }
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
     <style>{`
        /* Global Styles (Reused from RiderSidebar with minor tweaks) */
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
        }

        .user-profile span {
          font-size: 1.2rem;
          color: #fff;
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
        }

        .profile-pic h3 {
          font-size: 1.5rem;
          color: #2ECC9B;
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
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
          animation: fadeIn 0.5s ease-in-out;
        }

        h1 {
          font-size: 2.5rem;
          color: #2ECC9B;
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
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #2ECC9B;
          border-radius: 8px;
          font-size: 1rem;
          background: ${isEditing ? 'rgba(46, 204, 155, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
          color: #fff;
        }

        .edit-btn, .save-btn, .delete-btn {
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.9rem; 
          cursor: pointer;
          transition: all 0.3s ease;
          width: 80px; 
          height: 30px; 
          text-align: center;
        }

        .edit-btn, .save-btn {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
        }

        .delete-btn {
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          color: #fff;
        }

        .edit-btn:hover, .save-btn:hover {
          transform: scale(1.05);
          background: #27A583;
        }

        .delete-btn:hover {
          transform: scale(1.05);
          background: #c0392b;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
          background: rgba(46, 204, 155, 0.1);
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(46, 204, 155, 0.3);
          table-layout: fixed; /* Ensures columns are evenly spaced */
        }

        th, td {
          padding: 15px;
          text-align: left;
          font-size: 1rem;
          color: #fff;
          word-wrap: break-word; /* Ensures text wraps within cells */
        }

        th {
          background: linear-gradient(45deg, #2ECC9B, #27A583);
          color: #000000;
        }

        td {
          border-bottom: 1px solid rgba(46, 204, 155, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        }
      `}</style>

     

      <header className="header">
        <div className="logo">
          <img src={carLogo} alt="Car Pool" style={{ width: '63px' }} />
          <span>GreenFuture</span>
        </div>
        <div className="user-profile">
          <img src={profilePicture} alt="User Icon" style={{ width: '50px' }} />
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="profile-pic">
            <img src={profilePicture} alt="Profile Picture" />
            <h3>{`${firstName} ${lastName}`}</h3>
          </div>
          <nav className="sidebar-menu">
            <a className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
            <a className={activeTab === 'manage-users' ? 'active' : ''} onClick={() => setActiveTab('manage-users')}>
              <FontAwesomeIcon icon={faUsers} /> Manage Users
            </a>
            <a className={activeTab === 'manage-rides' ? 'active' : ''} onClick={() => setActiveTab('manage-rides')}>
              <FontAwesomeIcon icon={faRoad} /> Manage Rides
            </a>
            <a onClick={logoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </a>
          </nav>
        </aside>

        <main className="main-content">
          {/* Profile Tab */}
          <section className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
            <h1>Admin Profile</h1>
            <p className="subtext">Manage Your Admin Settings</p>
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

          {/* Manage Users Tab */}
          <section className={`tab-content ${activeTab === 'manage-users' ? 'active' : ''}`}>
            <h1>Manage Users</h1>
            <p className="subtext">View and Edit User Accounts</p>
            {editingUser ? (
              <div className="form-section">
                <h2>Edit User</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={editingUser.firstName}
                      onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={editingUser.lastName}
                      onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={editingUser.phone}
                      onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    />
                  </div>
                </div>
                <button className="save-btn" onClick={saveUserEdit}>Save</button>
                <button className="delete-btn" onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || 'N/A'}</td>
                      <td>{user.roleId?.role_name || 'N/A'}</td> {/* Access role_name from roleId */}
                      <td>
                        <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Manage Rides Tab */}
          <section className={`tab-content ${activeTab === 'manage-rides' ? 'active' : ''}`}>
            <h1>Manage Rides</h1>
            <p className="subtext">Oversee All Active Rides</p>
            <table>
              <thead>
                <tr>
                  <th>Driver Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Date & Time</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rides.map(ride => (
                  <tr key={ride.rideId}>
                    <td>{ride.driverName || 'N/A'}</td>
                    <td>{ride.source}</td>
                    <td>{ride.destination}</td>
                    <td>{new Date(ride.dateTime).toLocaleString()}</td>
                    <td>${ride.price}</td>
                    <td>{ride.status}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDeleteRide(ride.rideId)}>Delete</button>
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

export { AdminSidebar };