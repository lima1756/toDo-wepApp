import React from 'react';
import PropTypes from 'prop-types';

const UserData = ({profile, logOut}) => {
    return(
        <div className='userData'>

            <figure className="avatar avatar-xl">
                <img src={profile.picture}/>
            </figure>
            <p className="text-bold text-large">
            {profile.name}
            </p>
            <button className="btn" onClick={logOut}>
                LogOut
            </button>
            
        </div>
    );
}

UserData.propTypes = {
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
};

export default UserData;