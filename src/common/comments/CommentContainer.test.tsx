import CommentContainer from "./CommentContainer";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ERROR } from "./constant";

describe("CommentContainer", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches and displays comments based on the query prop", async () => {
    const fakeComments = [
      {
        id: 1,
        body: "Test comment 1",
        email: "test1@example.com",
        name: "Test comment1",
      },
      {
        id: 2,
        body: "Test comment 2",
        email: "test2@example.com",
        name: "Test comment2",
      },
    ];

    // Mock the fetch response for a successful request
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(fakeComments),
    });

    render(<CommentContainer query="test" />);

    // Verify fetch was called with the correct URL
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/comments?q=test"
      )
    );

    // Wait for the CommentList to render the comments
    await waitFor(() => {
      const commentList = screen.getByTestId("comment-list");
      expect(commentList).toHaveTextContent("Test comment 1");
      expect(commentList).toHaveTextContent("Test comment 2");
    });
  });

  it("handles fetch errors gracefully", async () => {
    // Spy on console.error to verify error logging
    console.error = jest.fn();

    // Force fetch to reject to simulate an error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    render(<CommentContainer query="error" />);

    // Wait for the fetch call to occur
    await waitFor(() => expect(global.fetch).toHaveBeenCalled);
    await waitFor(() => {
      const errorScreen = screen.getByTestId("error-state");
      expect(errorScreen).toHaveTextContent(ERROR);
    })
    // Verify that the error was caught and logged
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching comments:",
      expect.any(Error)
    );
  });
});
