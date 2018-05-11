import React from 'react';
import PropTypes from 'prop-types';
import UserData from './UserData';
import List from './List';
import NewList from './NewList';

const SideBar = ({newList, changeListName, removeList, profile, logOut, lists, selectList, selectedList}) => {
    return(
        <div className='sideBar sideBar-screenSize' id='sideBar'>
            <UserData profile={profile} logOut={logOut}/>
            <div className="divider text-center"></div>
            <NewList newList={newList}/>
            <div className="divider text-center" data-content="Your lists"></div>
            
            { lists.map(list=><div key={list.id} ><List list={list} changeListName={changeListName} selectList={selectList} selectedList={selectedList} removeList={removeList}/><div className="divider"></div></div>)}
            
        </div>
    );
}

SideBar.propTypes = {
    newList: PropTypes.func.isRequired,
    changeListName: PropTypes.func,
    removeList: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    selectList: PropTypes.func.isRequired,
    selectedList: PropTypes.number
};

export default SideBar;