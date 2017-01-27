// components/ResetMailSent.js

import React, { Component, PropTypes } from 'react'

export default class ResetMailSent extends Component {

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <h2> Mail Sent </h2>
        A mail has been sent to the email address you provided on registration.
        {errorMessage}
      </div>
    )
  }

  
}

ResetMailSent.propTypes = {
  
  errorMessage: PropTypes.string
}
