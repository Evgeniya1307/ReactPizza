import React from 'react'
import styles from "./Pagination.module.scss"
import ReactPaginate from "react-paginate";

const Pagination = ({ onChangePage }) => {
    return (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}//ко-во пицц
        pageCount={3}// ко-во страниц
        renderOnZeroPageCount={null}
      />
    );
  };


export default Pagination;
