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
      color: isSelected ? '#666' : '#999',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({
    ...styles,
    color: '#999',
    margin: '0',
    height: '40px',
    padding: '0',
  }),
  placeholder: styles => ({
    ...styles,
    color: '#999',
    fontWeight: '300',
    margin: 'auto 0',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#999',
    margin: 'auto 0',
    fontWeight: '300',
  }),
};
