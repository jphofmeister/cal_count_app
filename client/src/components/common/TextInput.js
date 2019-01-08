import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const TextInput = ({
  name,
  labelText,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  step,
  divClass
}) => {
  return (
    <FormGroup className={divClass}>
      {labelText && <Label htmlFor={name}>{labelText}</Label>}
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        step={step}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </FormGroup>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextInput.defaultProps = {
  type: 'text'
};

export default TextInput;