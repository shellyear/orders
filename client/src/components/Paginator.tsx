import React, { useState } from "react";
import { Link } from "react-router-dom";

function createRange(num: number) {
  const range = [];

  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
}

type PaginatorProps = {
  total: number;
  limit: number;
  currentPage?: number;
};

export const Paginator = ({
  total,
  limit,
  currentPage = 1,
}: PaginatorProps) => {
  const pageAmount = Math.ceil(total / limit);
  const visiblePages = 10;

  const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  const endPage = Math.min(startPage + visiblePages - 1, pageAmount);
  const range = createRange(endPage - startPage + 1).map(
    (value) => startPage + value - 1
  );

  return (
    <nav aria-label="pagination">
      <ul className="inline-flex -space-x-px text-sm">
        <li key="prev">
          <Link
            to={currentPage - 1 > 0 ? `/orders/${currentPage - 1}`: '#'}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </Link>
        </li>
        {range.map((rangeValue) => (
          <li key={rangeValue}>
            <Link
              to={`/orders/${rangeValue}`}
              className={
                rangeValue === currentPage
                  ? "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
            >
              {rangeValue}
            </Link>
          </li>
        ))}
        <li key="next">
          <Link
            to={currentPage + 1 < total ? `/orders/${currentPage + 1}`: '#'}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
