// components/UserCard.js
import React from 'react';

const UserCard = ({ user, onSelect }) => {
  const { 
    id, 
    name, 
    username, 
    email, 
    phone, 
    website, 
    company, 
    address,
    profileImage,
    posts,
    followers,
    following,
    joinDate
  } = user;

  const handleClick = () => {
    onSelect(user);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="card-header">
        <div className="user-avatar-container">
          <img 
            src={profileImage} 
            alt={name}
            className="user-avatar"
            loading="lazy"
          />
          <div className="online-indicator"></div>
        </div>
        <div className="user-basic-info">
          <h3 className="user-name">{name}</h3>
          <p className="user-username">@{username}</p>
        </div>
        <button className="view-profile-btn">
          View Profile →
        </button>
      </div>

      <div className="card-body">
        <div className="user-contact">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <span className="contact-value">{email}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📱</span>
            <span className="contact-value">{phone}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🌐</span>
            <a 
              href={`http://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
              onClick={(e) => e.stopPropagation()}
            >
              {website}
            </a>
          </div>
        </div>

        <div className="user-company">
          <div className="company-icon">🏢</div>
          <div className="company-info">
            <span className="company-name">{company.name}</span>
            <span className="company-catchphrase">{company.catchPhrase}</span>
          </div>
        </div>

        <div className="user-location">
          <span className="location-icon">📍</span>
          <span className="location-text">
            {address.city}, {address.street}
          </span>
        </div>
      </div>

      <div className="card-footer">
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-number">{posts}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {followers >= 1000 ? `${(followers/1000).toFixed(1)}k` : followers}
            </span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
        
        <div className="user-meta">
          <span className="join-date">
            Joined: {joinDate}
          </span>
          <span className="user-id">ID: {id}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
