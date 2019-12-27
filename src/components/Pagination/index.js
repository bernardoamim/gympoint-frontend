import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container, Button } from './styles';

export default function Pagination({
  currentPage,
  hasNextPage,
  handlePageChange,
}) {
  return (
    <Container>
      {currentPage > 1 && (
        <>
          <Button onClick={() => handlePageChange(currentPage - 1)}>
            <MdKeyboardArrowLeft size={20} />
          </Button>
          <Button onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </Button>
        </>
      )}
      <Button className="active">{currentPage}</Button>
      {hasNextPage && (
        <Button onClick={() => handlePageChange(currentPage + 1)}>
          {currentPage + 1}
        </Button>
      )}
      <Button
        disabled={!hasNextPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <MdKeyboardArrowRight size={20} />
      </Button>
    </Container>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  hasNextPage: PropTypes.bool,
  handlePageChange: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: 1,
  hasNextPage: false,
  handlePageChange() {},
};
