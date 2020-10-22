import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.scss';

interface IPaginationProps {
  itemCount: number,
  limit: number,
}

type PageData = { selected: number };

const Pagination: React.FC<IPaginationProps> = ({ itemCount, limit }) => {
  const pageCount = Math.ceil(itemCount / limit);
  const totalCount = itemCount > 100 ? '100+' : itemCount.toString();

  const [currentRange, setCurrentRange] = useState([1, limit]);

  const handlePageClick = ({ selected }: PageData): void => {
    const fromItemCount = selected * limit + 1;
    const toItemCount = fromItemCount + limit - 1;

    setCurrentRange([fromItemCount, toItemCount]);
  };

  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel="arrow_back"
        nextLabel="arrow_forward"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination__wrapper"
        pageClassName="pagination__cell"
        breakClassName="pagination__cell"
        activeClassName="pagination__cell pagination__cell_active"
        nextClassName="pagination__cell pagination__cell_with-arrow"
        previousClassName="pagination__cell pagination__cell_with-arrow"
        pageLinkClassName="pagination__link"
        breakLinkClassName="pagination__link"
        activeLinkClassName="pagination__link pagination__link_active"
        previousLinkClassName="pagination__link pagination__link_with-arrow"
        nextLinkClassName="pagination__link pagination__link_with-arrow"
        disabledClassName="pagination__cell_disabled"
      />
      <span className="pagination__text">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {currentRange[0]}–{currentRange[1]} из {totalCount} вариантов аренды
      </span>
    </div>
  );
};

export default Pagination;
