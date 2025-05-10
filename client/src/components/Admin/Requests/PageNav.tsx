import React from "react";

interface Props {
  currPage: number;
  numOfPages: number;
  setPage: (page: number) => void;
}

const PageNav: React.FC<Props> = ({ currPage, numOfPages, setPage }) => {
  const precisePage = Math.trunc(numOfPages);

  return (
    <div>
      <div className="flex justify-center gap-2">
        {Array.from({ length: precisePage }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={i}
              onClick={() => setPage(page)}
              className={currPage === page ? "bg-gray-300" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="flex w-fit grow-0 gap-2">
        <button
          onClick={() => setPage(currPage - 1)}
          className={currPage === 1 ? "hidden" : ""}
        >
          prev
        </button>
        <button
          onClick={() => setPage(currPage + 1)}
          className={currPage === precisePage ? "hidden" : ""}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PageNav;
