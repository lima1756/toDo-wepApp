import React from 'react';
import PropTypes from 'prop-types';
import Item from './common/Item';
import NewItem from './common/NewItem';

const ToDoList = ({list, newItem, removeItem, changeItemName, changeItemState, addItemFile, removeItemFile}) => {
    return(
        <div className='content resize'>
            {/* TODO map the list data and create container for each item and the new item*/}
            <NewItem newItem={newItem}/>
            {list.map((item)=><Item item={item} key={item.id} removeItem={removeItem} changeItemName={changeItemName} changeItemState={changeItemState} addItemFile={addItemFile} removeItemFile={removeItemFile}></Item>)}
        </div>
    );
}

ToDoList.propTypes = {
    list: PropTypes.array.isRequired,
    newItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    changeItemName: PropTypes.func.isRequired,
    changeItemState: PropTypes.func.isRequired,
    addItemFile: PropTypes.func.isRequired,
    removeItemFile: PropTypes.func.isRequired
};

export default ToDoList;