import React, { useState } from 'react';
import { userPool } from '../aws-cognito'; // Cognito User Pool configuration
import { CognitoUser } from 'amazon-cognito-identity-js';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Step 1: Forgot Password (Send reset code)
  const handleForgotPassword = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email, // Email or phone number
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setIsCodeSent(true);
        setMessage('A verification code has been sent to your email/phone. Please enter the code below.');
        setError('');
      },
      onFailure: (err) => {
        setError('Error during password reset: ' + err.message);
        setMessage('');
      },
    });
  };

  // Step 2: Reset Password (Confirm with verification code)
  const handleResetPassword = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email, // Email or phone number
      Pool: userPool,
    });

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        setMessage('Password successfully reset! You can now sign in with your new password.');
        setError('');
      },
      onFailure: (err) => {
        setError('Error resetting password: ' + err.message);
        setMessage('');
      },
    });
  };

  return (
    <div>
      <h2>Password Recovery</h2>

      {/* Forgot Password (Request reset code) */}
      {!isCodeSent ? (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email/phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Code</button>
        </form>
      ) : (
        // Reset Password (Enter verification code and new password)
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordRecovery;
