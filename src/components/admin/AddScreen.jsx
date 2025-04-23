import React from 'react'
// // import "../../assets/adminlte.css"
// import "../../assets/adminlte.min.css"


export const AddScreen = () => {
  return (
    <>
    
    {/* Header Section */}
    <header className="header">
      <div className="logo">
        <img
          src="https://via.placeholder.com/150x50?text=GreenCar"
          alt="car pool"
        />
      </div>
      <nav className="nav-menu">
        <a href="#">About Us</a>
        <a href="#">Our Blog</a>
      </nav>
      <div className="user-profile">
        <img
          src="https://via.placeholder.com/30?text=User"
          alt="User Icon"
          className="user-icon"
        />
        <span>Admin</span>
      </div>
    </header>
    {/* Main Container */}
    <div className="container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="profile-pic">
          <img
            src="https://via.placeholder.com/80?text=Avatar"
            alt="Profile Picture"
          />
          <h3>Admin</h3>
        </div>
        <nav className="sidebar-menu">
          <a href="#" className="active">
            <i className="fas fa-tachometer-alt" /> Dashboard
          </a>
          <a href="#">
            <i className="fas fa-users" /> Manage Users
          </a>
          <a href="#">
            <i className="fas fa-car" /> Manage Rides
          </a>
          <a href="#">
            <i className="fas fa-chart-line" /> Analytics
          </a>
          <a href="#">
            <i className="fas fa-sign-out-alt" /> Logout
          </a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="main-content">
        <h1>Admin Dashboard</h1>
        <p className="subtext">Monitor and manage the carpool system below</p>
        {/* Overview Cards */}
        <div className="overview-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Active Rides</h3>
            <p>342</p>
          </div>
          <div className="card">
            <h3>Total Carpool Groups</h3>
            <p>89</p>
          </div>
        </div>
        {/* Manage Users Section */}
        <section className="table-section">
          <h2>Manage Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tirth Patel</td>
                <td>patel.tirth159@gmail.com</td>
                <td>User</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>jane.doe@example.com</td>
                <td>Driver</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* Manage Rides Section */}
        <section className="table-section">
          <h2>Manage Rides</h2>
          <table>
            <thead>
              <tr>
                <th>Ride ID</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1234</td>
                <td>Tirth Patel</td>
                <td>Downtown to Suburbs</td>
                <td>Active</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="cancel-btn">Cancel</button>
                </td>
              </tr>
              <tr>
                <td>#1235</td>
                <td>Jane Doe</td>
                <td>Suburbs to Downtown</td>
                <td>Completed</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="cancel-btn">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
    </>
  );
};