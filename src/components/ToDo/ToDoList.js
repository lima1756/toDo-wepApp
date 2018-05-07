import React from 'react';
import PropTypes from 'prop-types';

const ToDoList = ({list, newItem, removeItem, changeItem}) => {
    return(
        <div className='content resize'>
            {/* TODO map the list data and create container for each item and the new item*/}
            <div>Logged in {list.sub}<div>{list.picture}</div><h3>{list.nickname}</h3><pre>{JSON.stringify(list, null, 2)}</pre></div>
        </div>
    );
}

ToDoList.propTypes = {
    list: PropTypes.object.isRequired,
    newItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    changeItem: PropTypes.func.isRequired
};

export default ToDoList;