import React, { Component } from 'react';
import Input from '../Global/Input';
import Button from '../Global/Button';
import TextArea from '../Global/TextArea';

import FormValidator from '../../validation/validator';
import { notEmpty, isNumericRule, validStars } from '../../validation/validationRules';
import { createValidationObject } from '../../helpers/validationHelpers';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { createImageUrl } from '../../helpers/commonHelpers';
import Stars from '../Global/Stars';


import { editHotel } from '../../store/actions/hotelActions';

class HotelForm extends Component {

    constructor(props) {
        super(props);

        this.initializeValidator();

        this.state = {
            name: '',
            nameVisited: false,
            stars: '',
            starsVisited: false,
            city: '',
            cityVisited: false,
            country: '',
            countryVisited: false,
            description: '',
            descriptionVisited: false,
            price: '',
            priceVisited: false,
            firstSubmit: true,
            validation: this.validator.valid()
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.props.history.replace('/dashboard');
            window.location.reload();
        }
    }

    render(){
        const { validation, name, nameVisited, stars, starsVisited, city,  cityVisited, country,  countryVisited, description, descriptionVisited, price, priceVisited, firstSubmit } = this.state;
        const {  hotel, editingHotel } = this.props;
        
        const validationFields = createValidationObject(
            validation, 
            firstSubmit, 
            ['name', 'stars','city', 'country', 'description', 'price'], 
            [nameVisited, starsVisited, cityVisited, countryVisited, descriptionVisited, priceVisited]
        );
        return (
            <div className="hotel-card">
                <div className="hotel-card__triangle hotel-card__triangle--top" />
                <div className="hotel-card__triangle hotel-card__triangle--bottom" />
    
                <div className="hotel-card__top-content">
                    <img alt="hotel" src={hotel && hotel.image ? createImageUrl(hotel.image) : ''} className="hotel-card__image" />
                    <div className="hotel-card__content">
                        <div className="hotel-card__name-stars">
                            <h1 className="hotel-card__name"> 
                                <Input
                                changeHandler={this.onChange}
                                blurHandler={this.onBlur}
                                inputInvalid={validationFields.name}
                                validationMessage={validationFields.name ? validation.name.message : null}
                                name="name"
                                value={name}
                                type="text"
                                containerClasses="hotel-card__name-input"
                                placeholder="Name*"/>
                            </h1>
                            <div className="hotel-card__stars">
                                <div>
                                <Input
                                    changeHandler={this.onChange}
                                    blurHandler={this.onBlur}
                                    inputInvalid={validationFields.stars}
                                    validationMessage={validationFields.stars ? validation.stars.message : null}
                                    name="stars"
                                    value={stars}
                                    containerClasses="hotel-card__star-input" 
                                    type="number" 
                                    placeholder="Stars*"/>
                                </div>
                                    
                                <Stars stars={parseInt(stars)} />
                            </div>
                        
                        </div>
                        <h4 className="hotel-card__cc-main">
                           <div className="hotel-card__cc-container">
                           <Input 
                                changeHandler={this.onChange}
                                blurHandler={this.onBlur}
                                inputInvalid={validationFields.city}
                                validationMessage={validationFields.city ? validation.city.message : null}
                                name="city"
                                value={city} 
                                containerClasses="hotel-card__cc" 
                                type="text" 
                                placeholder="City*"/> 
                           </div>
                                <span className="hotel-card__bullet">
                                &bull; 
                                </span>
                                
                            <div className="hotel-card__cc-container">
                            <Input 
                                changeHandler={this.onChange}
                                blurHandler={this.onBlur}
                                inputInvalid={validationFields.country}
                                validationMessage={validationFields.country ? validation.country.message : null}
                                name="country"
                                value={country}  
                                containerClasses="hotel-card__cc" 
                                type="text" 
                                placeholder="Country*"/>
                            </div>
                        </h4>
                        <p className="hotel-card__description">
                            <TextArea  
                                changeHandler={this.onChange}
                                blurHandler={this.onBlur}
                                inputInvalid={validationFields.description}
                                validationMessage={validationFields.description ? validation.description.message : null} 
                                name="description" 
                                value={description} 
                                placeholder="Enter hotel description" />
                        </p>
        
                        <div className="hotel-card__stats">
                            <h1 className="hotel-card__stats__title">
                                Price: 
                                <Input
                                 changeHandler={this.onChange}
                                 blurHandler={this.onBlur}
                                 inputInvalid={validationFields.price}
                                 validationMessage={validationFields.price ? validation.price.message : null}
                                 name="price"
                                 value={price}  
                                 type="text" 
                                 placeholder="Price*" />
                            </h1>
                        </div>
                        <div className="hotel-card__buttons"> 
                            
                            <Button loading={editingHotel} disabled={!validationFields.isValid && !firstSubmit} name={hotel ? hotel.id : 1} onClick={this.saveHotel} classes="hotel-card__button" color={'yellow-gradient'} text={'Create hotel'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    saveHotel = (event) => {
        event.preventDefault();
        this.setState({
            firstSubmit: false
        }, () => {
            const isValid = this.validateForm();
            if(isValid){
                const { stars, country, city, name, description, price  } = this.state;
                this.props.editHotel(stars, country, city, name, description, '', price, this.props.userId );
            }
        })
    }

    onChange = (event) => {
        if(this.props.error){
            this.props.removeAuthErrors();
        }
        this.setState({
            [event.target.name]: event.target.value,
            [`${event.target.name}Visited`]: true
        }, () => {
            this.validateForm();
        })
    }

    onBlur = (event) => {
        if(this.props.error){
            this.props.removeAuthErrors();
        }
        this.setState({
            [event.target.name]: event.target.value,
            [`${event.target.name}Visited`]: true
        }, () => {
            this.validateForm();
        })
    }

    initializeValidator = () => {
        this.validator = new FormValidator([
            notEmpty('name', 'Name can\'t be empty!'),
            notEmpty('stars', 'Stars cant\'t be empty!'),
            notEmpty('price', 'Price can\'t be empty'),
            notEmpty('description', 'Description can\'t be empty'),
            notEmpty('city', 'City can\'t be empty'),
            notEmpty('country', 'Country can\'t be empty'),
            validStars('stars', 'Stars have to be a number between 1 and 5'),
            isNumericRule('price', 'Price has to be a number'),

        ])
    }

    validateForm = () => {
        const validation = this.validator.validate(this.state);
        this.setState({
            validation: validation
        })
        return validation.isValid;
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        editingHotel: state.hotels.editingHotel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editHotel: (stars, country, city, name, description, location, price, user ) => { dispatch(editHotel(stars, country, city, name, description, location, price, user )) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HotelForm));