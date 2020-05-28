import React, { useState } from 'react'
import { FirebaseContext } from '../../firebase';

const ForgotPassword = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error('Error sending email', err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div className="ui container">
      <div className="ui form">
        <div className="field">
          <input
            type="email"
            placeholder="Provide your account email"
            onChange={event => setResetPasswordEmail(event.target.value)}
          />
        </div>
        <div className="field">
          <button
            type="button"
            className="ui button"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
        {isPasswordReset && <p>Check email to reset password</p>}
        {passwordResetError && <p className="ui red header">{passwordResetError}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword
