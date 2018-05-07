import React from 'react';
import PropTypes from 'prop-types';
import UserData from './UserData';

const SideBar = ({newList, changeListName, removeList, profile, logOut}) => {
    return(
        <div className='sideBar sideBar-screenSize' id='sideBar'>
            <UserData profile={profile} logOut={logOut}/>
            <div className="divider text-center" data-content="Lists"></div>
            {/* TODO map the lists and create a container for every item and the new item*/}
        </div>
    );
}

SideBar.propTypes = {
    newList: PropTypes.func.isRequired,
    changeListName: PropTypes.func,
    removeList: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
};

export default SideBar;