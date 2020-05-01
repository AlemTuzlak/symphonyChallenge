import React from 'react';

const TextArea = (props) => {
    return (
        <React.Fragment>
            <textarea 
                name={props.name} 
                onChange={props.changeHandler} 
                onBlur={props.blurHandler} 
                autoFocus={props.autofocus} 
                placeholder={props.placeholder ? props.placeholder : 'Enter text..'} 
                className={`textarea ${props.inputInvalid ? 'input__error' : ''}`} 
                rows={props.rows ? props.rows : null}>
                {props.value}
            </textarea>
            {props.inputInvalid ? <span className="input__error__span">
                {props.validationMessage}
            </span> : null}
        </React.Fragment>
    );
}

export default TextArea;