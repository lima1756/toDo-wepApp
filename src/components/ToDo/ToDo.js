import React from 'react';
import PropTypes from 'prop-types';

class ToDo extends React.Component {
    
    constructor(props){
        super(props);
        
    }

    goTo(route) {
        this.props.history.push(`/${route}`)
    }

    componentWillMount(){
        const { isAuthenticated } = this.props.auth;
        if(!isAuthenticated){
            this.goTo("");
        }
        else{
            // TODO get the info from firebase of the user
        }
            
    }

    render() {
        
        return (
            <div>Logged in</div>
        );
    }
}

ToDo.propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
}

export default ToDo;