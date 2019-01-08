import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import styled from 'styled-components';

const RadioInput = styled.input`
  opacity: 0;
  position: absolute;

  :focus + label {
    outline: rgba(77, 97, 171, 0.5) auto 3px;
  }

  :checked + label {
    background-color: #3981ea;
    color: #fff;
  }
`;

const RadioLabel = styled.label`
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  text-align: center;
  border-radius: 5px;

  :hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.3);
    cursor: pointer;
  }

  img {
    width: 75px;
    height: 75px;
    display: block;
  }
`;

const RadioButtons = ({
  legend,
  error,
  info,
  options,
  divClass
}) => {

  const radioOptions = options.map((option, i) => (
    <span key={i}>
      <RadioInput
        type="radio"
        name={option.name}
        id={option.value}
        value={option.value}
        onChange={option.onChange}
        checked={option.checked}
        disabled={option.disabled} />
      <RadioLabel htmlFor={option.value} onClick={option.onClick}>
        <img key={option.image} src={option.image} alt="" />
        {option.value}
      </RadioLabel>
    </span >
  ));

  return (
    <FormGroup tag="fieldset" className={divClass}>

      {legend && <legend>{legend}</legend>}

      <div className="radio-buttons">
        {radioOptions}
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>

    </FormGroup>
  );
};

RadioButtons.propTypes = {
  legend: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default RadioButtons;