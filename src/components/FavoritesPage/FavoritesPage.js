import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { getFavoriteHotels, addOrRemoveHotelFromFavorites } from '../../store/actions/hotelActions';
import HotelCard from '../Global/HotelCard';

class FavoritesPage extends Component {
  
    componentDidMount(){
        if(!this.props.hotels.length){
            this.props.getFavoriteHotels();
        }
    }

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
        hotels: state.hotels.favoriteHotels,
        fetchingHotels: state.hotels.fetchingHotels,
        page: state.hotels.page,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteHotels: () => { dispatch(getFavoriteHotels()) },
        addOrRemoveHotelFromFavorites: (id, is_favorite) => { dispatch(addOrRemoveHotelFromFavorites(id, is_favorite))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(FavoritesPage));