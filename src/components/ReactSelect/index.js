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
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [selected, setSelected] = useState('');
  const [inputName, setInputName] = useState(
    defaultValue && defaultValue.title
  );

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.select.state.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.select',
        parseValue: parseSelectValue,
        clearValue: selectRef => {
          selectRef.clear();
        },
      });
    }
  }, [ref.current, fieldName]); // eslint-disable-line

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
      id: PropTypes.number,
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
