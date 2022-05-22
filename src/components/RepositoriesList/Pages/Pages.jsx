import React, { useCallback } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import { updateRepoTC } from "../../../redux/app-reducer";

import "./Pages.css";

const leftIcon = (
  <svg
    className="left-svg"
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.41436 6.00008L7.70726 1.70718L6.29304 0.292969L0.585938 6.00008L6.29304 11.7072L7.70726 10.293L3.41436 6.00008Z"
      fill="#808080"
    />
  </svg>
);

const rightIcon = (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L6 6L1 11" stroke="#808080" strokeWidth="2" />
  </svg>
);

export const Pages = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const perPage = useSelector((state) => state.perPage);
  const currentPage = useSelector((state) => state.currentPage);

  const pageChangeHandler = useCallback(
    (data) => {
      let currentPage = data.selected + 1;
      dispatch(updateRepoTC(user.login, currentPage, perPage));
    },
    [user]
  );

  return (
    <div className="pages">
      <div className="pages-description">
        {`${perPage * currentPage - 3}-${perPage * currentPage} of ${
          props.repoCount
        } items`}
      </div>
      <ReactPaginate
        previousLabel={leftIcon}
        nextLabel={rightIcon}
        breakLabel={"..."}
        pageCount={props.repoCount / perPage}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        onPageChange={pageChangeHandler}
        containerClassName={"paginator"}
        pageClassName={"page-item"}
        previousClassName={"previous"}
        nextClassName={"next"}
        breakClassName={"break"}
        activeClassName={"page-item-selected"}
      />
    </div>
  );
};
