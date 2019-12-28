export const selectStyles = {
  container: styles => ({ ...styles, marginBottom: '20px' }),
  valueContainer: styles => ({
    ...styles,
    padding: '0 8px',
    height: '42px',
  }),
  control: (styles, { menuIsOpen }) => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: '16px',
    border: menuIsOpen ? '2px solid #ccc' : '1px solid #ddd',
    boxShadow: menuIsOpen ? '#ccc' : '#ddd',

    ':hover': {
      border: menuIsOpen ? '2px solid #ccc' : '1px solid #ddd',
      boxShadow: menuIsOpen ? '#ccc' : '#ddd',
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: isSelected
        ? 'rgba(0,0,0,0.1)'
        : isFocused
        ? '#eee'
        : null,
      fontSize: '16px',
      color: isSelected ? '#666' : '#999',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({
    ...styles,
    color: '#999',
    margin: '0',
    fontSize: '16px',
    height: '40px',
    padding: '0',
  }),
  placeholder: styles => ({
    ...styles,
    color: '#999',
    fontSize: '16px',
    paddingLeft: '4px',
    width: 'fit-content',
    fontWeight: '300',
    margin: 'auto 0',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#999',
    margin: 'auto 0',
    fontWeight: '300',
    paddingLeft: '4px',
    width: 'fit-content',
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
};
