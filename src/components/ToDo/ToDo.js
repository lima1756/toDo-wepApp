import React from 'react';
import PropTypes from 'prop-types';
import SideBar from './common/SideBar';
import NavBar from './common/NavBar';
import ToDoList from './ToDoList';
import {FireBase} from '../../services/FireBase';

class ToDo extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {profile:{}, data:{}, userId:""};
        this.logOut = this.logOut.bind(this);
        this.newList = this.newList.bind(this);
        this.changeListName = this.changeListName.bind(this);
        this.removeList = this.removeList.bind(this);
        this.newItem = this.newItem.bind(this);
        this.changeItemName = this.changeItemName.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.changeItemState = this.changeItemState.bind(this);
        this.addItemFile = this.addItemFile.bind(this);
        this.removeItemFile = this.removeItemFile.bind(this);
    }

    goTo(route) {
        this.props.history.push(`/${route}`)
    }

    componentWillMount(){
        const { isAuthenticated } = this.props.auth;
        if(!isAuthenticated()){
            this.goTo("");
        }
        else{
            const { userProfile, getProfile } = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.setState({ profile:profile, userId:profile.sub });
                    this.startFireBase(profile.sub);
                });
            } else {
                this.setState({ profile: userProfile, userId: userProfile.sub });
                this.startFireBase(userProfile.sub);
            }
            
        }
    }

    componentWillUnmount(){
        FireBase.removeBinding(this.data);
    }

    componentDidMount(){
    }

    render() {
        const {profile} = this.state;
        return (
            <div className='fullHeight mainContainer'>
                <NavBar showSideBar={this.showSideBar}/>
                <a className="closeSideBar" href="" id="closeSideBar" onClick={this.hideSideBar}></a>
                <SideBar profile={profile} newList={this.newList} removeList={this.removeList} changeListName={this.changeListName} logOut={this.logOut}/>
                <ToDoList list={profile} newItem={this.newItem} removeItem={this.removeItem} changeItem={this.changeItem}/>
            </div>
        );
    }

    showSideBar(){
        document.getElementById('sideBar').classList.add("isVisible");
        document.getElementById('closeSideBar').classList.add("isVisible");
    }

    hideSideBar(event){
        event.preventDefault();
        document.getElementById('sideBar').classList.remove("isVisible");
        document.getElementById('closeSideBar').classList.remove("isVisible");
    }

    newList(name){
        const data = Object.assign({}, this.state.data);
        const id = Date.now();
        data[id] = {
            id: id,
            name: name,
            items: {}
        };
        this.setState({data});
    }

    removeList(id){
        const data = Object.assign({}, this.state.data);
        data[id] = null;
        this.setState({data});
    }

    changeListName(id, name){
        const data = Object.assign({}, this.state.data);
        data[id] = {
            id: id,
            name: name,
            items: {}
        };
        this.setState({data});
    }

    newItem(listId, name){
        const data = Object.assign({}, this.state.data);
        const itemId = Date.now();
        data[listId][itemId] = {
            id: itemId,
            name: name,
            state: false
        };
        this.setState({data});
    }

    removeItem(listId, itemId){
        const data = Object.assign({}, this.state.data);
        data[listId][itemId] = null;
        this.setState({data});
    }

    changeItemName(listId, itemId, newName){
        const data = Object.assign({}, this.state.data);
        data[listId][itemId].name = newName;
        this.setState({data});
    }

    addItemFile(listId, itemId, fileDirectory)
    {
        const data = Object.assign({}, this.state.data);
        const fileId = Date.now();
        data[listId][itemId][fileId] = {
            id: fileId,
            fileDirectory: fileDirectory
        };
        this.setState({data});
    }

    removeItemFile(listId, itemId, fileId){
        const data = Object.assign({}, this.state.data);
        data[listId][itemId][fileId] = null;
        this.setState({data});
    }

    changeItemState(listId, itemId)
    {
        const data = Object.assign({}, this.state.data);
        data[listId][itemId].state = !data[listId][itemId].state;
        this.setState({data});
    }

    logOut(){
        this.props.auth.logout();
    }

    startFireBase(userId){
        this.data = FireBase.syncState(userId, {
            context: this,
            state: "data",
            defaultValue: null
        });
    }
    
}

ToDo.propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
}

export default ToDo;