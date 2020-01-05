import React, { useRef, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

export default function MaskedInput({ name, onChange, ...rest }) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      const parsed = defaultValue.toLocaleString('pt-BR', {
        minimumIntegerDigits: fieldName === 'weight' ? 3 : 1,
        maximumIntegerDigits: fieldName === 'weight' ? 3 : 1,
        minimumFractionDigits: fieldName === 'weight' ? 1 : 2,
        maximumFractionDigits: fieldName === 'weight' ? 1 : 2,
      });
      setValue(parsed);
    }
  }, [defaultValue, fieldName]); // eslint-disable-line

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
          onChange(e.target.value);
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
