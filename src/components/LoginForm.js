import React from 'react'
import PropTypes from 'prop-types'

const loginForm = ({ handleSubmit, handleChange, username, password }) => (
    <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={handleSubmit}>
            <div>
                käyttäjätunnus
          <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
            </div>
            <div>
                salasana
          <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <button>kirjaudu</button>
        </form>
    </div>
)
loginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default loginForm