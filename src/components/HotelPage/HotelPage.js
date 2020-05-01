import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HotelCard from '../Global/HotelCard';
import { getHotel } from '../../store/actions/hotelActions';
import HotelForm from './HotelForm';

class HotelPage extends Component {
   
    componentDidMount() {
        console.log(this.props.history);
        if(this.props.history.location.state && this.props.history.location.state.id){
            this.props.getHotel(this.props.history.location.state.id)
        }
        else {
            this.props.history.replace('/dashboard')
        }
    }
   
    render() {
        const { isAdmin, hotel } = this.props;

        return (
            <div className="hotels">
                {isAdmin ? <HotelForm hotel={hotel} /> : <HotelCard hotel={hotel} />}
            </div>
        );
    }

    
}
const mapStateToProps = (state) => {
    return {
        hotel: state.hotels.hotel,
        isAdmin: state.auth.isAdmin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => { dispatch(getHotel(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelPage));