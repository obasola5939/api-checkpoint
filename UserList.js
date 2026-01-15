
// components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [sortBy, setSortBy] = useState('name');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        
        // Add additional mock data for better visualization
        const enhancedUsers = response.data.map(user => ({
          ...user,
          profileImage: `https://i.pravatar.cc/150?img=${user.id}`,
          joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          posts: Math.floor(Math.random() * 50) + 1,
          followers: Math.floor(Math.random() * 1000) + 100,
          following: Math.floor(Math.random() * 500) + 50
        }));
        
        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
        
        // Simulate network delay for better UX
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to fetch users. Please check your connection and try again.');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, users]);

  // Sort users
  useEffect(() => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'username':
          return a.username.localeCompare(b.username);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'company':
          return a.company.name.localeCompare(b.company.name);
        case 'followers':
          return b.followers - a.followers;
        case 'posts':
          return b.posts - a.posts;
        default:
          return 0;
      }
    });
    setFilteredUsers(sortedUsers);
  }, [sortBy]);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle close details
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const enhancedUsers = response.data.map(user => ({
        ...user,
        profileImage: `https://i.pravatar.cc/150?img=${user.id}`,
        joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
          .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        posts: Math.floor(Math.random() * 50) + 1,
        followers: Math.floor(Math.random() * 1000) + 100,
        following: Math.floor(Math.random() * 500) + 50
      }));
      
      setUsers(enhancedUsers);
      setFilteredUsers(enhancedUsers);
      setSearchTerm('');
      setCurrentPage(1);
      
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to refresh users. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className="retry-btn">
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      {/* Header Section */}
      <header className="user-list-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">👥</span>
            User Directory
          </h1>
          <p className="app-subtitle">
            Discover and connect with users from around the world
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-value">{users.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-info">
              <span className="stat-value">
                {[...new Set(users.map(user => user.address.city))].length}
              </span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <span className="stat-value">
                {[...new Set(users.map(user => user.company.name))].length}
              </span>
              <span className="stat-label">Companies</span>
            </div>
          </div>
        </div>
      </header>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search users by name, email, or company..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="clear-search"
              >
                ✕
              </button>
            )}
          </div>
          <div className="search-hint">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <div className="controls-right">
          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              <span className="sort-icon">📊</span>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="username">Username</option>
              <option value="email">Email</option>
              <option value="company">Company</option>
              <option value="followers">Followers</option>
              <option value="posts">Posts</option>
            </select>
          </div>

          <button onClick={handleRefresh} className="refresh-btn">
            <span className="refresh-icon">🔄</span>
            Refresh
          </button>
        </div>
      </div>

      {/* User Details Modal */}
      {showDetails && selectedUser && (
        <div className="user-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>User Details</h2>
              <button onClick={handleCloseDetails} className="close-modal">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-header">
                <img 
                  src={selectedUser.profileImage} 
                  alt={selectedUser.name}
                  className="detail-avatar"
                />
                <div className="detail-title">
                  <h3>{selectedUser.name}</h3>
                  <p className="detail-username">@{selectedUser.username}</p>
                </div>
              </div>
              
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedUser.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedUser.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Website:</span>
                  <a 
                    href={`http://${selectedUser.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    {selectedUser.website}
                  </a>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Company:</span>
                  <span className="detail-value">{selectedUser.company.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Catchphrase:</span>
                  <span className="detail-value">{selectedUser.company.catchPhrase}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">
                    {selectedUser.address.street}, {selectedUser.address.city}
                  </span>
                </div>
              </div>
              
              <div className="detail-stats">
                <div className="detail-stat">
                  <span className="stat-number">{selectedUser.posts}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="detail-stat">
                  <span className="stat-number">{selectedUser.followers.toLocaleString()}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="detail-stat">
                  <span className="stat-number">{selectedUser.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="detail-stat">
                  <span className="stat-number">{selectedUser.joinDate}</span>
                  <span className="stat-label">Joined</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Grid */}
      <div className="users-grid">
        {currentUsers.length > 0 ? (
          currentUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onSelect={handleUserSelect}
            />
          ))
        ) : (
          <div className="no-users">
            <div className="no-users-icon">👤</div>
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="reset-search-btn"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn prev"
          >
            ← Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Show first, last, current, and adjacent pages
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .map((page, index, array) => {
                // Add ellipsis for skipped pages
                const prevPage = array[index - 1];
                if (prevPage && page - prevPage > 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="pagination-ellipsis">...</span>
                      <button
                        onClick={() => paginate(page)}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                );
              })}
          </div>
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn next"
          >
            Next →
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="user-list-footer">
        <p>
          Showing {currentUsers.length} of {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
        <p className="api-credit">
          Data from <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer">
            JSONPlaceholder API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default UserList;
