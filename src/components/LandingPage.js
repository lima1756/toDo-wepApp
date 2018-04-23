import React from 'react';
import Auth from '../services/Auth.js';

class LandingPage extends React.Component {
    
    constructor(props){
        super(props);
        this.enterButton = this.enterButton.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    enterButton(){
        //TODO if already login enter home, if not show modal
        //console.log("Login");
        const auth = new Auth();
        auth.login();
        // Show modal
        //document.getElementById("logModal").classList.add("active");
    }

    closeModal(){
        document.getElementById("logModal").classList.remove("active");
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
            <div className="modal" id="logModal">
                <a href="#close" className="modal-overlay" aria-label="Close"></a>
                <div className="modal-container">
                    <div className="modal-header">
                        <a href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={this.closeModal}></a>

                    </div>
                    <div className="modal-body">
                        <div className="content">
                            <div className="columns">
                                <div className="column">
                                    
                                </div>
                                <div className="divider-vert" data-content="OR"></div>
                                <div className="column">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        
                    </div>
                </div>
            </div>
        </div>
    );
    }
}
  
export default LandingPage;