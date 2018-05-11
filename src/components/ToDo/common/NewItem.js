import React from 'react';
import PropTypes from 'prop-types';

class NewItem extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {value:""};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({value:event.target.value});
    }

    onSubmit(){
        this.props.newItem(this.state.value);
        this.setState({value:""});
        return false;
    }
    render(){
        return(
            <div className='item-container'>
                <form className='item' onSubmit={this.onSubmit} action="#">
                    <input type='text' value={this.state.value} onChange={this.onChange}/>
                    <div className="button-group">
                        <button type="button" className="btn btn--success btn--inside" onClick={this.onSubmit}>New Item</button>
                    </div>
                </form>
            </div>
        );
    }
}

NewItem.propTypes = {
    newItem: PropTypes.func.isRequired
};

export default NewItem;