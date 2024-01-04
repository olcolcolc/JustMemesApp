import { useMemo } from "react";

interface PaginationData {
  currentMemes: any[]; // Array of memes for the current page
}

const usePagination = (
  memes: any[], // Array of memes to paginate through
  currentPage: number, // Current active page
  paginate: (pageNumber: number) => void // Function to handle page changes
): PaginationData => {
  // Calculate the index of the last meme on the current page

  // Hardcoded number of memes that display on each page
  const MEMES_PER_PAGE = 5;
  const indexOfLastMeme = currentPage * MEMES_PER_PAGE;

  // Calculate the index of the first meme on the current page
  const indexOfFirstMeme = indexOfLastMeme - MEMES_PER_PAGE;

  // Use useMemo to memoize the subset of memes for the current page
  const currentMemes = useMemo(
    () => memes.slice(indexOfFirstMeme, indexOfLastMeme),
    [memes, indexOfFirstMeme, indexOfLastMeme]
  );

  // Return the currentMemes and index information for pagination
  return {
    currentMemes,
  };
};

export default usePagination;
