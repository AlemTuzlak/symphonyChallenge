import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import debounce from "lodash.debounce";
import { getHotels, getMoreHotels, setHotelPage } from '../../store/actions/hotelActions';
import HotelCard from '../Global/HotelCard';

class DashboardPage extends Component {
  
    componentDidMount(){
        if(!this.props.hotels.length){
            this.props.getHotels();
        }
        window.addEventListener('scroll', this.handleScroll, true)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll, true);
    }
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    handleScroll = debounce(async () => {
        const wrappedElement = document.getElementById('hotels');
            
            if (this.isBottom(wrappedElement)) {
                await this.props.setHotelPage(this.props.page + 1);
                this.props.getMoreHotels(this.props.filters);
            }
    }, 200)

    render(){
       
        const { hotels } = this.props;

        return (
            <React.Fragment>
                
                <div id="hotels" className="hotels">
                    {/* I added a dummy card here just to show what it would look like */}
                    <HotelCard />
                        { hotels && hotels.length ?
                        hotels.map(hotel => {
                            return <HotelCard key={hotel.id} hotel={hotel} />
                        })
                        : null}                        
                    
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        hotels: state.hotels.hotels,
        fetchingHotels: state.hotels.fetchingHotels,
        page: state.hotels.page,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHotels: () => { dispatch(getHotels()) },
        setHotelPage: (page) => { dispatch(setHotelPage(page)) },
        getMoreHotels: () => { dispatch(getMoreHotels()) },
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(DashboardPage));