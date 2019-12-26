import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { darken } from 'polished';
import { Container } from './styles';

const selectStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: darken(0.03, '#ccc'),
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      padding: 0,
      backgroundColor: darken(0.03, '#ccc'),
      color: '#999',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isFocused ? darken(0.03, '#ccc') : '#ccc'),
      },
    };
  },
};

export default function ReactSelect({ name, options, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <Container>
      <Select
        name={fieldName}
        className="react-select"
        aria-label={fieldName}
        options={options}
        isMulti={false}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        styles={selectStyles}
        {...rest}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
  }),
};

ReactSelect.defaultProps = {
  options: {
    id: 0,
    title: '',
  },
};
