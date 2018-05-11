import React from 'react';
import PropTypes from 'prop-types';
import SideBar from './common/SideBar';
import NavBar from './common/NavBar';
import ToDoList from './ToDoList';
import {FireBase} from '../../services/FireBase';
import GphApiClient from 'giphy-js-sdk-core';
class ToDo extends React.Component {
    

    constructor(props){
        super(props);
        this.state = {profile:{}, data:{}, userId:"", listId:""};
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
        this.getItemsArray = this.getItemsArray.bind(this);
        this.firstList = this.firstList.bind(this);
        this.getListArray = this.getListArray.bind(this);
        this.selectList = this.selectList.bind(this);
        this.client = GphApiClient("MimXRX9ee3mwSRs7p49L9w79iegso7dg");
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

    

    render() {
        const {profile} = this.state;
        return (
            <div className='fullHeight mainContainer'>
                <NavBar showSideBar={this.showSideBar}/>
                <a className="closeSideBar" href="" id="closeSideBar" onClick={this.hideSideBar}></a>
                
                <SideBar selectedList={Number(this.state.listId)} profile={profile} newList={this.newList} removeList={this.removeList} changeListName={this.changeListName} logOut={this.logOut} lists={this.getListArray()} selectList={this.selectList}/>
                <div className='sideBar sideBar-screenSize non-fixed' ></div>
                <div className="list">
                    { this.state.data && this.state.data[this.state.listId] && <h1>{this.state.data[this.state.listId].name} List</h1>}
                    <div className="divider"></div>
                    <ToDoList list={this.getItemsArray()} newItem={this.newItem} removeItem={this.removeItem} changeItemName={this.changeItemName} changeItemState={this.changeItemState} addItemFile={this.addItemFile} removeItemFile={this.removeItemFile}/>
                </div>
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
        this.setState({listId:id});
    }

    firstList(){
        const data = Object.assign({}, this.state.data);
        const id = 0;
        data[id] = {
            id: id,
            name: "To-Do",
            items: {}
        };
        this.setState({data});
    }


    removeList(id){
        const data = Object.assign({}, this.state.data);
        data[id] = null;
        this.setState({data});
        for(let key in this.state.data){
            this.setState({listId:key});
            break;
        }
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

    newItem(name){
        const data = Object.assign({}, this.state.data);
        const itemId = Date.now();
        data[this.state.listId][itemId] = {
            id: itemId,
            name: name,
            state: false
        };
        this.setState({data}, ()=>{window.scrollTo(0,document.body.scrollHeight)});
        
    }

    removeItem(itemId){
        const data = Object.assign({}, this.state.data);
        data[this.state.listId][itemId] = null;
        this.setState({data});
    }

    changeItemName(itemId, newName){
        const data = Object.assign({}, this.state.data);
        data[this.state.listId][itemId].name = newName;
        this.setState({data});
    }

    addItemFile(itemId, fileName, fileDirectory)
    {
        const data = Object.assign({}, this.state.data);
        const fileId = Date.now();
        data[this.state.listId][itemId][fileId] = {
            id: fileId,
            fileDirectory: fileDirectory,
            fileName: fileName
        };
        this.setState({data});
    }

    removeItemFile(itemId, fileId){
        const data = Object.assign({}, this.state.data);
        data[this.state.listId][itemId][fileId] = null;
        this.setState({data});
    }

    changeItemState(itemId, state)
    {
        const data = Object.assign({}, this.state.data);
        data[this.state.listId][itemId].state = state;
        if(state)
        {
            this.client.random('gifs', {"tag":"cats", "rating":"pg"})
            .then((response) => {
                data[this.state.listId][itemId].gif = response.data.images.fixed_height_downsampled.gif_url;
                this.setState({data});       
            })   
        
        }
        else{
            data[this.state.listId][itemId].gif = null;
            this.setState({data});
        }
        
        
    }

    logOut(){
        this.props.auth.logout();
    }

    startFireBase(userId){
        this.data = FireBase.syncState(userId, {
            context: this,
            state: "data",
            defaultValue: null,
            then: ()=>{
                if(this.state.data==null)
                    this.firstList();
                this.setState({listId:this.state.data[0].id})
            }
        });        
    }

    getItemsArray(){
        let arr = [];
        if(this.state.data!=null){
            for(let key in this.state.data[this.state.listId]){
                if(key!="id" && key!="name")
                {
                    arr.push(this.state.data[this.state.listId][key]);
                }
            }
        }
        return arr;
    }
    
    getListArray(){
        let arr = [];
        if(this.state.data!=null){
            for(let key in this.state.data){
                arr.push(this.state.data[key]);
            }
        }
        return arr;
    }

    selectList(id){
        this.setState({listId:id});
    }
}

ToDo.propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
}

export default ToDo;