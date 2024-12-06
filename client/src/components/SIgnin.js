import React, { useState } from 'react';
import { userPool } from '../aws-cognito'; // Cognito User Pool configuration
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const Signin = () => {
  // State for Sign-In
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signInMessage, setSignInMessage] = useState('');

  // Handle Sign-In
  const handleSignIn = (e) => {
    e.preventDefault();

    // Create a CognitoUser instance with the username (email or phone number)
    const cognitoUser = new CognitoUser({
      Username: username, // This should be the email/phone number used during sign-up
      Pool: userPool,
    });

    // Prepare the AuthenticationDetails
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    // Authenticate the user
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setSignInMessage('Sign-in successful! Access Token: ' + result.getAccessToken().getJwtToken());
        setSignInError('');
      },
      onFailure: (err) => {
        setSignInError('Error during sign-in: ' + err.message);
        setSignInMessage('');
      },
    });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username (email/phone)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {signInError && <p>{signInError}</p>}
      {signInMessage && <p>{signInMessage}</p>}
    </div>
  );
};

export default Signin;
