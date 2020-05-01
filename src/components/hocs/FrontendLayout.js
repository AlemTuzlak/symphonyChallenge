import React from 'react';
import Header from '../Layout/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

const FrontendLayout = (Component) => {
    
    class Layout extends React.Component {
        render(){
            return (
                <React.Fragment>
                    <Header />
                    <div className="content-container">
                        <Component />
                        <ToastContainer position='bottom-center' />
                    </div>
                </React.Fragment>
            );
        }
    }
    
    return Layout;
}

export default FrontendLayout;