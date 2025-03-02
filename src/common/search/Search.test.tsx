import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchContainer, { Search } from "./Search";
import { createPromiseArray } from "./utils/netwrok";
import "@testing-library/jest-dom";

jest.mock("./helper", () => ({
  createPromiseArray: jest.fn(),
}));

describe("Search Component", () => {
  const handleSearchMock = jest.fn();
  const SEARCH_CRITERIA = [
    {
      query: "name_like",
      name: "name",
      api: "https://jsonplaceholder.typicode.com/comments",
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(
      <Search
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });


  test("populates search suggestions correctly", async () => {
    (createPromiseArray as jest.Mock).mockReturnValue([
      Promise.resolve({ key: "users", suggestions: ["Alice", "Bob"] }),
    ]);

    render(
      <Search
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  test("clears search suggestions when the query is empty", async () => {
    render(
      <Search
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });
  });

  test("opens suggestion dropdown when results exist", async () => {
    (createPromiseArray as jest.Mock).mockReturnValue([
      Promise.resolve({ key: "users", suggestions: ["Alice"] }),
    ]);

    render(
      <Search
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByRole("listbox")).toBeVisible(); // ✅ Ensure listbox role is set
    });
  });

  test("closes suggestion dropdown when clicking outside", async () => {
    (createPromiseArray as jest.Mock).mockReturnValue([
      Promise.resolve({ key: "users", suggestions: ["Alice"] }),
    ]);

    render(
      <Search
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    fireEvent.click(document.body); // ✅ Simulate clicking outside
    await waitFor(() => expect(screen.queryByText("Alice")).not.toBeInTheDocument());

  });

  test("handles multiple API calls correctly", async () => {
    (createPromiseArray as jest.Mock).mockReturnValue([
      Promise.resolve({ key: "users", suggestions: ["Alice"] }),
      Promise.resolve({ key: "projects", suggestions: ["Project X"] }),
    ]);

    render(
      <Search
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Project X")).toBeInTheDocument();
    });
  });

  test("SearchContainer provides context correctly", () => {
    render(
      <SearchContainer
        handleSearch={handleSearchMock}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "React" } });
    expect(input).toHaveValue("React");
  });
});
