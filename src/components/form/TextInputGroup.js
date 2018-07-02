import React from 'react';
import { func, bool, string } from 'prop-types';
import classnames from 'classnames';

import { FormGroup } from 'reactstrap';

// proptypes
TextInputGroup.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  label: string,
  id: string,
  placeholder: string,
  onChange: func.isRequired,
  required: bool,
  info: string,
  error: string,
  displayError: bool,
  disabled: bool
};

TextInputGroup.defaultProps = {
  type: 'text',
  required: false,
  displayError: true,
  disabled: false
};

function TextInputGroup({
  type,
  name,
  value,
  id,
  label,
  placeholder,
  onChange,
  required,
  info,
  error,
  displayError,
  disabled
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="lead" for={id}>
          {label}
        </label>
      )}
      <FormGroup>
        <input
          type={type}
          className={classnames('form-control form-control-lg', { 'is-invalid': error })}
          name={name}
          value={value}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
        {displayError && error && <div className="invalid-feedback">{error}</div>}
      </FormGroup>
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
}

export default TextInputGroup;
