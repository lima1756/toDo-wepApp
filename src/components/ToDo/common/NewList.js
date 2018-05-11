import React from 'react';
import PropTypes from 'prop-types';

class NewList extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:""};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({value:event.target.value});
    }

    onSubmit(){
        this.props.newList(this.state.value);
        this.setState({value:""});
        return false;
    }

    render(){
        return(
            <form onSubmit={this.onSubmit} action="#" className="new-list">
                    <label className="field field_animated field_a2 page__field">
                        <input className="field__input" placeholder="e.g. To-Do" onChange={this.onChange} value={this.state.value}/>
                        <span className="field__label-wrap">
                        <span className="field__label">New List</span>
                        </span>
                    </label>    
                <input type="submit" className="hidden" value=""/>
            </form>
        );
    }
}

NewList.propTypes = {
    newList: PropTypes.func.isRequired,
};

export default NewList;