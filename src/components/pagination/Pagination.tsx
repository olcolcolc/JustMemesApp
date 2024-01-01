/* eslint-disable jsx-a11y/anchor-is-valid */
interface PaginationProps {
  memesPerPage: number;
  totalMemes: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  memesPerPage,
  totalMemes,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__page-item">
            <a
              onClick={() => paginate(number)}
              href=""
              className="pagination___page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
