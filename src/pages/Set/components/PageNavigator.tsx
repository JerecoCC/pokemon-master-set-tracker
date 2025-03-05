import React from 'react';

type Props = {
  page: number,
  pageCount: number;
  toFirstPage: () => void;
  toBackPage: () => void;
  toNextPage: () => void;
  toLastPage: () => void;
}

const PageNavigator = (props: Props) => {
  const {
    page,
    pageCount,
    toFirstPage,
    toBackPage,
    toNextPage,
    toLastPage,
  } = props;

  return (
    <div className="page-navigator">
      <div
        className="page-buttons back"
        data-testid="page-buttons-back"
      >
        {page > 1 && (
          <>
            <button onClick={toFirstPage}>First</button>
            <button onClick={toBackPage}>Back</button>
          </>
        )}
      </div>
      <p className="pageCount">
        <b data-testid="page-count">{pageCount}</b> pages
      </p>
      <div
        className="page-buttons next"
        data-testid="page-buttons-next"
      >
        {page < pageCount && (
          <>
            <button onClick={toNextPage}>Next</button>
            <button onClick={toLastPage}>Last</button>
          </>
        )}
      </div>
    </div>
  )
}

export default PageNavigator;