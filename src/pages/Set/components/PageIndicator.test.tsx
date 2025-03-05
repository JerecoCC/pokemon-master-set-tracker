import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import PageIndicator from "./PageIndicator";
import "@testing-library/jest-dom/vitest";
import { ERROR_MESSAGES } from "../../../constants";

describe("PageIndicator component", () => {
  afterEach(() => {
    cleanup();
  });

  describe("page prop is even number", () => {
    it("renders error message", () => {
      render(<PageIndicator page={2} pageCount={6} />);
      expect(screen.getByText(ERROR_MESSAGES.INVALID_PAGE));
    });
  });

  describe("page prop is odd number", () => {
    describe("left side", () => {
      it("renders blank on first page", () => {
        render(<PageIndicator page={1} pageCount={6} />);
        expect(screen.getByTestId('left-page-number')).toBeEmptyDOMElement();
      });

      it("renders even page number", () => {
        render(<PageIndicator page={3} pageCount={6} />);
        expect(screen.getByTestId('left-page-number')).toHaveTextContent('2');
      });
    });

    describe("right side", () => {
      it("renders odd page number", () => {
        render(<PageIndicator page={1} pageCount={6} />);
        expect(screen.getByTestId('right-page-number')).toHaveTextContent('1');
      });
  
      it("renders blank on last page when even number of pages", () => {
        render(<PageIndicator page={7} pageCount={6} />);
        expect(screen.getByTestId('right-page-number')).toBeEmptyDOMElement();
      });
    })
  });
})