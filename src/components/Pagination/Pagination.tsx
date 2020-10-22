import ReactPaginate from 'react-paginate';

interface IPagination {
  itemCount: number,
  limit: number,
}

const Pagination: React.FC<IPagination> = ({ itemCount, limit }) => {
  const pageCount = Math.ceil(itemCount / limit);

  return (
    <ReactPaginate
      previousLabel="previous"
      nextLabel="next"
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      // onPageChange={this.handlePageClick}
      containerClassName="pagination"
      // subContainerClassName={'pages pagination'}
      activeClassName="active"
    />
  );
};

export default Pagination;
