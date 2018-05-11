import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {editing:false, value:this.props.list.name};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.edit = this.edit.bind(this);
    }

    onChange(event){
        this.setState({value:event.target.value});
    }

    onSubmit(){
        this.props.changeListName(this.props.list.id, this.state.value);
        this.setState({editing:false});
        return false;
    }

    edit(){
        this.setState({editing:true});
    }

    render()
    {
        const {list, selectList, removeList, selectedList} = this.props;
        const selected = selectedList==list.id ? (<strong>{list.name}</strong>) : list.name;
        let body;
        if(this.state.editing){
            body = 
                <form onSubmit={this.onSubmit} action="#" className="list-item">
                        <label className="field field_animated field_a2 page__field">
                            <input className="field__input" placeholder="e.g. To-Do" onChange={this.onChange} value={this.state.value}/>
                            <span className="field__label-wrap">
                            <span className="field__label">{list.name}</span>
                            </span>
                        </label>    
                    <input type="submit" className="hidden" value=""/>
                </form>;
        }
        else{
            body = 
            <div className="list-item">
                <a href="" onClick={event=>{selectList(list.id); event.preventDefault(); return false;}}>{selected}</a>
                {list.id!=0 && <span>
                    <a href="" onClick={event=>{this.edit(); event.preventDefault();  return false;}}><i className="icon icon-edit"></i></a>
                    <a href="" onClick={event=>{removeList(list.id); event.preventDefault();  return false;}}><i className="icon icon-cross"></i></a>
                </span>}
                
            </div>
        }
        return body;
    }
}

List.propTypes = {
    list: PropTypes.object.isRequired,
    selectList: PropTypes.func.isRequired,
    removeList: PropTypes.func.isRequired,
    changeListName: PropTypes.func.isRequired,
    selectedList: PropTypes.number
};

export default List;