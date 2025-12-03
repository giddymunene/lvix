import React, { useState } from 'react';
import './AuthModal.css';

const LoginModal = ({ isOpen, onClose, onLogin, error, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Login to IVIX</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>
            
            <button type="submit" className="auth-button login-button">
              Login
            </button>
            
            <div className="auth-divider">
              <span>or</span>
            </div>
            
            <button type="button" className="auth-button social-button google-button">
              <span className="social-icon">G</span>
              Continue with Google
            </button>
            
            <button type="button" className="auth-button social-button twitter-button">
              <span className="social-icon">𝕏</span>
              Continue with Twitter
            </button>
          </form>
        </div>
        
        <div className="modal-footer">
          <p>
            Don't have an account?{' '}
            <button type="button" className="switch-auth" onClick={onSwitchToSignup}>
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;