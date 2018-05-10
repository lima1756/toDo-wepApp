import React from 'react';
import PropTypes from 'prop-types';

const Item = ({item, changeItemName, changeItemState, addItemFile, removeItemFile, removeItem}) => {
    return(
        <div className='item-container'>
            <div className='item'>
                <label className="label">
                    <input type='checkbox' className="label__checkbox" onClick={(event)=>{changeItemState(item.id, event.target.checked);}} checked={item.state}/>
                    <span className="label__text">
                        <span className="label__check">
                            <i className="icon icon-check"></i>
                        </span>
                    </span>
                </label>
                <input type='text' value={item.name} id={item.id} onChange={(event)=>changeItemName(item.id, event.target.value)}/>
                <div className="button-group">
                    <button type="button" className="btn btn--danger btn--inside" onClick={()=>removeItem(item.id)}>Remove Item</button>
                </div>
            </div>
            <p>Files</p>
            {item.gif && <div><h2>Your Gif, congrats!</h2><img src={item.gif}/></div>}
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    changeItemName: PropTypes.func.isRequired,
    changeItemState: PropTypes.func.isRequired,
    addItemFile: PropTypes.func.isRequired,
    removeItemFile: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
};

export default Item;