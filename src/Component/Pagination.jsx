// src/components/Pagination.js

import React from "react";

const getPageNumbers = (totalPages, currentPage) => {
  const pages = [];

  // Always show the first page
  pages.push(1);

  // Show current page and the next page, if applicable
  if (currentPage < totalPages - 1) {
    pages.push(currentPage);
    if (currentPage + 1 < totalPages - 1) {
      pages.push(currentPage + 1);
    }
  }

  // Show ellipses if there are more pages between the current page and the last page
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // Always show the last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  // Filter out any duplicates
  return [...new Set(pages)];
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-controls border d-flex justify-content-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="page-link p-2 px-3 m-1 mx-1 rounded-circle"
        style={{ borderColor: "coral", color: "coral", fontSize: "0.75rem" }}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {getPageNumbers(totalPages, currentPage).map((page, index) => (
        page === "..." ? (
          <button
            key={index}
            className="pagination-button p-2 px-3 m-1 mx-1 rounded-circle border"
            style={{ color: "coral", fontSize: "0.75rem" }}
            disabled
          >
            ...
          </button>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`border pagination-button p-2 px-3 m-1 mx-1 rounded-circle ${
              currentPage === page ? "active" : ""
            }`}
            style={{
              borderColor: "coral",
              backgroundColor: currentPage === page ? "coral" : "transparent",
              color: currentPage === page ? "white" : "coral",
              fontSize: "0.75rem",
            }}
          >
            {page}
          </button>
        )
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="page-link p-2 px-3 m-1 mx-1 rounded-circle"
        style={{ borderColor: "coral", color: "coral", fontSize: "0.75rem" }}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
