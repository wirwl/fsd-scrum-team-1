import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import block from 'bem-cn';

import './Pagination.scss';

interface IPaginationProps {
  totalItemCount: number,
  limitPerPage: number,
  initialPage?: number,
  onChange?: (pageNumber: number) => void,
}

type PageData = { selected: number };

const b = block('pagination');

const Pagination: React.FC<IPaginationProps> = ({
  totalItemCount,
  limitPerPage,
  initialPage = 1,
  onChange,
}) => {
  const pageCount = Math.ceil(totalItemCount / limitPerPage);
  const countRepresentation = totalItemCount > 100 ? '100+' : totalItemCount.toString();

  const [currentRange, setCurrentRange] = useState([1, limitPerPage]);

  const handlePageClick = ({ selected }: PageData): void => {
    onChange && onChange(selected + 1);

    const fromItemCount = selected * limitPerPage + 1;
    const toItemCount = fromItemCount + limitPerPage - 1;

    toItemCount < totalItemCount
      ? setCurrentRange([fromItemCount, toItemCount])
      : setCurrentRange([fromItemCount, totalItemCount]);
  };

  return (
    <div className="pagination">
      <ReactPaginate
        initialPage={initialPage - 1}
        previousLabel="arrow_back"
        nextLabel="arrow_forward"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={b('wrapper')}
        pageClassName={b('cell')}
        breakClassName={b('cell')}
        activeClassName={b('cell', { active: true })}
        nextClassName={b('cell', { 'with-arrow': true })}
        previousClassName={b('cell', { 'with-arrow': true })}
        pageLinkClassName={b('link')}
        breakLinkClassName={b('link')}
        activeLinkClassName={b('link', { active: true })}
        previousLinkClassName={b('link', { 'with-arrow': true })}
        nextLinkClassName={b('link', { 'with-arrow': true })}
        disabledClassName={b('cell', { disabled: true })}
      />
      <span className="pagination__text">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {currentRange[0]}–{currentRange[1]} из {countRepresentation} вариантов аренды
      </span>
    </div>
  );
};

export default Pagination;
