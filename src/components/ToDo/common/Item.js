import React from 'react';
import PropTypes from 'prop-types';
import Uploader from './Uploader';
import File from './File';

class Item extends React.Component {
    
    constructor(props){
        super(props);
        this.filesAsArray = this.filesAsArray.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }

    render(){
        const {item, changeItemName, changeItemState, addItemFile, removeItem } = this.props;
        return(
            <div className='item-container'>
                <div className='item'>
                    <label className="label">
                        <input type='checkbox' className="label__checkbox" onClick={(event)=>{changeItemState(item.id, event.target.checked);}} defaultChecked={item.state}/>
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
                <div className='uploader'>
                    <h5>Upload an image to task:</h5>
                    <Uploader 
                        name='file'
                        onChange={() => {
                        }}
                        onUploadComplete={info => addItemFile(item.id, info.name, info.cdnUrl) }/>
                    {this.getFiles()}
                    
                </div>
                {item.gif && <div><h2>Your Gif, congrats!</h2><img src={item.gif}/></div>}
            </div>
        );
    }

    filesAsArray(){
        let arr = []
        for(let key in this.props.item){
            if(key!="id" && key!="name" && key!="state" && key!="gif"){
                arr.push(this.props.item[key]);
            }
        }
        return arr;
    }

    getFiles(){
        const arr = this.filesAsArray();
        if(arr.length>0)
            return(
                <div>
                    <h5>Files in task:</h5>
                    <ul>
                        {arr.map(file=><File file={file} removeFile={()=>this.props.removeItemFile(this.props.item.id, file.id)} key={file.id}/>)}
                    </ul>
                </div>
            );
    }
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