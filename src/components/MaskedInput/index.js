import React, { useRef, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

export default function MaskedInput({ name, onChange, ...rest }) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
        clearValue: propRef => {
          propRef.clearValue();
        },
      });
    }
  }, [ref.current]); // eslint-disable-line

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    value,
  };

  return (
    <>
      <InputMask
        {...props}
        onChange={e => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

MaskedInput.defaultProps = {
  onChange() {},
};
