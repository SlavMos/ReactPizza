import React from "react";
import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss";
export const Pagination = (props) => {
  return (
    <div>
      <ReactPaginate
        className={s.root}
        breakLabel="..."
        nextLabel=" >"
        onPageChange={(event) => props.setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
