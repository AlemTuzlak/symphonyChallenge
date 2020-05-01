import React, { Component } from 'react';
import Button from './Button';
import { createImageUrl } from '../../helpers/commonHelpers';
import Stars from '../Global/Stars';
import Review from '../Global/Review';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHotelReviews, addOrRemoveHotelFromFavorites } from '../../store/actions/hotelActions';
import loader from '../../assets/animations/loader-b.svg';

class HotelCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviewsShown: false
        }
    }
    render(){
        const { fetchingHotelReviews, settingHotelToFavorite, hotel } = this.props;
        return (
            <div className="hotel-card">
                <div className="hotel-card__triangle hotel-card__triangle--top" />
                <div className="hotel-card__triangle hotel-card__triangle--bottom" />
    
                <div className="hotel-card__top-content">
                    <img alt="hotel" src={hotel && hotel.image ? createImageUrl(hotel.image) : ''} className="hotel-card__image" />
                    <div className="hotel-card__content">
                        <h1 className="hotel-card__name"> 
                            {hotel ? hotel.name : 'Hotel name'}
                            <span className="hotel-card__stars">
                                <Stars stars={hotel ? hotel.stars : 3} />
                            </span>
                        </h1>
                        <h4>
                            {hotel ? hotel.city : 'City'} &bull; {hotel ? hotel.country : 'Country'} &bull; {hotel && hotel.created_at ? moment(hotel.created_at).format('D/M/Y') : moment().format('D/M/Y')}
                        </h4>
                        <p className="hotel-card__description">
                            {hotel ? hotel.description : 'Incididunt cillum nisi non excepteur nostrud est ea exercitation nulla occaecat sint. Est qui ipsum nostrud aliquip labore excepteur voluptate culpa non aliquip. Qui Lorem elit laborum sint magna mollit dolore exercitation. Tempor pariatur magna magna cillum tempor Lorem in voluptate sit. Adipisicing quis est tempor culpa. Dolor voluptate minim veniam laboris. Magna consequat aliquip aliqua cillum labore id ut ullamco eiusmod. Cillum commodo fugiat quis elit do ea aute mollit ipsum sint non qui id. Adipisicing tempor velit ipsum cillum ut. Esse aliquip deserunt qui pariatur esse aliqua aliqua ad proident excepteur sit culpa. Id quis ut do eiusmod sunt et ipsum. Velit aliquip sit magna esse et commodo. Adipisicing tempor et in nulla pariatur veniam duis.'}
                        </p>
        
                        <div className="hotel-card__stats">
                            <h1 className="hotel-card__stats__title">
                                Price: 
                                <span className="yellow-dark-text block"> 
                                    {hotel ? hotel.price : '99'}$
                                </span>
                            </h1>
                        </div>
                        <div className="hotel-card__buttons"> 
                            
                            <Button disabled={settingHotelToFavorite} name={hotel ? hotel.id : 1} onClick={this.addOrRemoveHotelFromFavorites} classes="hotel-card__button" color={hotel && hotel.is_favorite ? 'black' : 'yellow-gradient'} text={hotel && hotel.is_favorite ? 'Remove from favorites' : 'Add to favorites'} />
                            <Button disabled={fetchingHotelReviews} name={hotel ? hotel.id : 1} onClick={this.toggleReviews} classes="hotel-card__button" color={this.state.reviewsShown ? 'black' : 'yellow-gradient'} text={this.state.reviewsShown ? 'Hide Reviews' : 'Show Reviews'} />
                            {this.props.history.location.pathname.startsWith('/hotel') ? null : <Button name={hotel ? hotel.id : 1} onClick={this.goToHotelDetails} classes="hotel-card__button" color={'yellow-gradient'} text="Hotel Details" />}
                        </div>
                    </div>
                </div>
            
                {this.state.reviewsShown ? (
                    this.props.fetchingHotelReviews ? 
                    <div >
                        <img src={loader} alt="loader" />
                    </div> : 
                    <div className="hotel-card__reviews">
                        <Review review={{image: '', description: '', stars: 3, first_name: 'nesto', last_name: 'nesto'}} />
                        <Review review={{image: '', description: '', stars: 3, first_name: 'nesto', last_name: 'nesto'}} />
                        {
                            this.props.hotel && this.props.hotel.reviews ?
                            this.props.hotel.reviews.map((review) => {
                                return <Review review={review} />
                            }) : null
                        }
                    </div>
                ) : null}
            </div>
        );
    }

    addOrRemoveHotelFromFavorites = () => {
        const { hotel } = this.props;
        if(!hotel) return;
        const id = hotel.id;
        const is_favorite = !hotel.is_favorite;
        this.props.addOrRemoveHotelFromFavorites(id, is_favorite)
    }
    toggleReviews = () => {
        const { hotel } = this.props;
        if(!hotel) return;
        this.setState({
            reviewsShown: !this.state.reviewsShown
        }, () => {
            if(hotel && !hotel.reviews){
                this.props.getHotelReviews(hotel.id);
            }
        })
    }
    goToHotelDetails = () => {
        const { hotel } = this.props;
        if(!hotel){
            this.props.history.push('/hotel',{id: 1});
        }
        else {
            this.props.history.push('/hotel',{id: hotel.id});
        }
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingHotelReviews: state.hotels.fetchingHotelReviews,
        settingHotelToFavorite: state.hotels.settingHotelToFavorite,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHotelReviews: (id) => { dispatch(getHotelReviews(id)) },
        addOrRemoveHotelFromFavorites: (id, is_favorite) => { dispatch(addOrRemoveHotelFromFavorites(id, is_favorite))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(HotelCard));