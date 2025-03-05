import { useMemo, useState } from "react";
import { PageSize } from "../types";

type ReturnType = {
  page: number,
  pageCount: number;
  toFirstPage: () => void;
  toBackPage: () => void;
  toNextPage: () => void;
  toLastPage: () => void;
}

const usePageNavigator = (cardsCount: number, pageSize: PageSize): ReturnType => {
  const [page, setPage] = useState<number>(1);

  const pageCount = useMemo(() => (
    Math.ceil(cardsCount / pageSize)
  ), [cardsCount, pageSize]);

  const toFirstPage = () => {
    if (page > 1) {
      setPage(1)
    }
  }

  const toBackPage = () => {
    if (page > 1) {
      setPage(page - 2);
    }
  }

  const toNextPage = () => {
    if (page < pageCount) {
      setPage(page + 2);
    }
  }

  const toLastPage = () => {
    if (page < pageCount) {
      let newPage: number = pageCount;

      if(pageCount % 2 === 0) {
        newPage += 1;
      }

      setPage(newPage);
    }
  }

  return {
    page,
    pageCount,
    toFirstPage,
    toBackPage,
    toNextPage,
    toLastPage,
  }
}

export default usePageNavigator;