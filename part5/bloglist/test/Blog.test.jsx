import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../src/components/Blog";

const blog = {
  title: "You are not gonna need it",
  author: "Ron Jeffries",
  url: "www.yagni.com",
  likes: 34,
  user: {
    username: "edvin",
    name: "edvin",
    id: "656886687b0db41698c66f25",
  },
  id: "656d81f5f8f3cd40d693cc0a",
};

describe("<Blog/>", () => {
  test("renders title and author by default", () => {
    const { container } = render(
      <Blog blog={blog} handleLikeUpdate={() => {}} />
    );

    const div = container.querySelector(".blogItem");

    expect(div).toHaveTextContent("You are not gonna need it");
    expect(div).toHaveTextContent("Ron Jeffries");
    expect(div).not.toHaveTextContent("www.yagni.com");
    expect(div).not.toHaveTextContent("34");
  });

  test("shows url and likes when show-button is clicked", async () => {
    const { container } = render(
      <Blog blog={blog} handleLikeUpdate={() => {}} />
    );

    const div = container.querySelector(".blogItem");
    const user = userEvent.setup();

    const showButton = screen.getByText("view");
    await user.click(showButton);

    expect(div).toHaveTextContent("www.yagni.com");
    expect(div).toHaveTextContent("34");
  });

  test("every click on like button is registered", async () => {
    const mockHandler = jest.fn();

    const { container } = render(
      <Blog blog={blog} handleLikeUpdate={mockHandler} />
    );

    const user = userEvent.setup();
    const showButton = screen.getByText("view");
    await user.click(showButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
