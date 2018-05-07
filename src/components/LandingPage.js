import React from 'react';
import Auth from '../services/Auth.js';
import PropTypes from 'prop-types';

class LandingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.enterButton = this.enterButton.bind(this);
        this.state = {auth:new Auth()};
    }

    enterButton(){
        const { userProfile } = this.state.auth;
        if (!userProfile) {
            this.state.auth.login();
        } else {
            this.props.history.push(`/ToDO`)
        }
    }

    render() {
        return (
        <div className='fullHeight'>
            <div className='bg'>
                <div className='centered-table'>
                    <div className='content-table'>
                        <h1 className="text-primary text-uppercase mainTitle">To-Do list web App</h1>
                        <button className="btn btn-primary btn-lg" id='EnterBtn' onClick={this.enterButton}>Enter</button>
                    </div>
                </div>
            </div>
            {/* TODO enter more content to the landing page */}
        </div>
    );
    }
}
  
LandingPage.propTypes = {
    history: PropTypes.object,
    auth: PropTypes.object,
}

export default LandingPage;