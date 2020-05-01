import React from 'react';

const Input = ({containerClasses, icon, iconClasses, inputClasses, placeholder, inputInvalid, validationMessage, changeHandler, blurHandler, type, name, id}) => {
    return (
        <React.Fragment>
            <div className={`input ${containerClasses ? containerClasses : ''} ${inputInvalid ? 'input__error__container' : ''}`}>
            {icon && <img src={icon} alt="input-icon" className={`input__icon ${iconClasses ? iconClasses : ''}`} />}
                <input 
                onChange={changeHandler ? changeHandler : () => {}} 
                onBlur={blurHandler ? blurHandler : () => {}} 
                type={type ? type : 'text'} 
                name={name ? name : ''}
                id={id ? id : Math.random()}
                className={`input__main ${inputClasses ? inputClasses : ''} ${inputInvalid ? 'input__error' : ''}`} 
                placeholder={placeholder} />
            </div>
            {inputInvalid ? <span className="input__error__span">
                {validationMessage}
            </span> : null}
        </React.Fragment>
    );
}

export default Input;