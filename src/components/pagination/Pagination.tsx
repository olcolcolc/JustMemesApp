/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.scss";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface PaginationProps {
  memesPerPage: number;
  totalMemes: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  memesPerPage,
  totalMemes,
  currentPage,
  paginate,
  setCurrentPage,
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li
          onClick={() =>
            currentPage > 1 ? setCurrentPage(currentPage - 1) : null
          }
          aria-label="Previous page"
        >
          <FontAwesomeIcon className="pagination__arrow" icon={faArrowLeft} />
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__page-item">
            <a
              onClick={() => paginate(number)}
              href="#"
              className={`pagination__page-link${
                currentPage === number ? " active" : ""
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          onClick={() =>
            currentPage < pageNumbers.length
              ? setCurrentPage(currentPage + 1)
              : null
          }
          aria-label="Next page"
        >
          <FontAwesomeIcon className="pagination__arrow" icon={faArrowRight} />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
