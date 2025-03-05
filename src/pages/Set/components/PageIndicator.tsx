import React from "react";
import { ERROR_MESSAGES } from "../../../constants";

type Props = {
  page: number;
  pageCount: number;
}

const PageIndicator = (props: Props) => {
  const {page, pageCount} = props;
  return (
    <div className="page-indicator">
      {page % 2 === 1 ? (
        <>
          <b data-testid="left-page-number">{page > 1 ? page - 1 : ""}</b>
          <b data-testid="right-page-number">{page < pageCount ? page : ""}</b>
        </>
      ) : (
        <p className="error-message">{ERROR_MESSAGES.INVALID_PAGE}</p>
      )}
      
    </div>
  );
}

export default PageIndicator