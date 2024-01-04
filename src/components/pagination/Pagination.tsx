/* eslint-disable jsx-a11y/anchor-is-valid */
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.scss";

interface PaginationProps {
  totalMemes: number; // Total number of memes
  currentPage: number; // Current active page
  paginate: (pageNumber: number) => void; // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({
  totalMemes,
  currentPage,
  paginate,
}) => {
  const MEMES_PER_PAGE = 5; // Number of memes per page

  const pageNumbers: number[] = [];
  // Calculating the total number of pages based on the total number of memes and memes per page
  for (let i = 1; i <= Math.ceil(totalMemes / MEMES_PER_PAGE); i++) {
    pageNumbers.push(i); // Storing page numbers in an array
  }

  return (
    <nav>
      <ul className="pagination">
        {/* Button for navigating to the previous page */}
        <li
          onClick={() => (currentPage > 1 ? paginate(currentPage - 1) : null)}
          aria-label="Previous page"
        >
          <FontAwesomeIcon className="pagination__arrow" icon={faArrowLeft} />
        </li>
        {/* Displaying page numbers and allowing navigation to specific pages */}
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
        {/* Button for navigating to the next page */}
        <li
          onClick={() =>
            currentPage < pageNumbers.length ? paginate(currentPage + 1) : null
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
