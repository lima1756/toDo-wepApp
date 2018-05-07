import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({showSideBar}) => {
    return(
        <div className='topBar topBar-screenSize'>
            <button className="btn" onClick={showSideBar}>
                <i className="icon icon-menu"></i>
            </button>
        </div>
    );
}

NavBar.propTypes = {
    showSideBar: PropTypes.func.isRequired
};

export default NavBar;