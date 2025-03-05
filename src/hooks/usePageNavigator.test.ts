import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { act, renderHook } from "@testing-library/react";
import usePageNavigator from "./usePageNavigator";

describe("usePageNavigator hook", () => {
  it("initial page is 1", () => {
    const { result } = renderHook(() => usePageNavigator(6, 4));
    expect(result.current.page).toBe(1);
  });

  it("returns correct page count", () => {
    const hook1 = renderHook(() => usePageNavigator(1, 4));
    expect(hook1.result.current.pageCount).toBe(1);

    const hook2 = renderHook(() => usePageNavigator(6, 4));
    expect(hook2.result.current.pageCount).toBe(2);

    const hook3 = renderHook(() => usePageNavigator(0, 4));
    expect(hook3.result.current.pageCount).toBe(0);

    const hook4 = renderHook(() => usePageNavigator(436, 9));
    expect(hook4.result.current.pageCount).toBe(49);
  });

  it("toNextPage()", () => {
    const {result} = renderHook(() => usePageNavigator(436, 9));

    expect(result.current.page).toBe(1);
    act(() => {
      result.current.toNextPage();
    })
    expect(result.current.page).toBe(3);
    act(() => {
      result.current.toNextPage();
    })
    expect(result.current.page).toBe(5);
  });
  it("toBackPage()", () => {
    const {result} = renderHook(() => usePageNavigator(436, 9));

    expect(result.current.page).toBe(1);
    act(() => {
      result.current.toNextPage();
    })
    expect(result.current.page).toBe(3);
    act(() => {
      result.current.toBackPage();
    })
    expect(result.current.page).toBe(1);
  });

  it("toLastPage()", () => {
    const {result} = renderHook(() => usePageNavigator(436, 9));

    expect(result.current.page).toBe(1);
    act(() => {
      result.current.toLastPage();
    })
    expect(result.current.page).toBe(49);
    act(() => {
      result.current.toBackPage();
    })
    expect(result.current.page).toBe(47);
  });

  it("toFirstPage()", () => {
    const {result} = renderHook(() => usePageNavigator(436, 9));

    expect(result.current.page).toBe(1);
    act(() => {
      result.current.toNextPage();
    })
    act(() => {
      result.current.toNextPage();
    })
    expect(result.current.page).toBe(5);
    act(() => {
      result.current.toFirstPage();
    })
    expect(result.current.page).toBe(1);
  });
})