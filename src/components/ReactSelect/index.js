import React, { useRef, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { selectStyles } from './styles';

export default function ReactSelect({
  name,
  initialOptions,
  onChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [selected, setSelected] = useState('');
  const [inputName, setInputName] = useState('');

  function parseSelectValue(selectRef) {
    console.log('function', selectRef);
    const selectValue = selectRef.select.state.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.select.select',
        parseValue: parseSelectValue,
        clearValue: selectRef => {
          console.log('object', selectRef);
          selectRef.clearValue();
        },
      });
    }
  }, [ref.current]); // eslint-disable-line

  return (
    <>
      <AsyncSelect
        styles={selectStyles}
        name={fieldName}
        selected={selected}
        className="react-select"
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        cacheOptions
        inputValue={inputName}
        defaultOptions={initialOptions || true}
        onInputChange={newValue => setInputName(newValue)}
        onChange={option => {
          setSelected(option.id);
          onChange(option, name);
        }}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,

  initialOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

ReactSelect.defaultProps = {
  onChange() {},
  initialOptions: [
    {
      id: 0,
      title: '',
    },
  ],
};
