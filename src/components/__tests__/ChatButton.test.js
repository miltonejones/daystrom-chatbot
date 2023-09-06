// import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ChatButton from "../ChatButton";
// // import TinyButton from "../../styled/TinyButton";
// import { CopyAll } from "@mui/icons-material";

describe("ChatButton", () => {
  // it("displays the children prop", () => {
  //   const children = "Click me!";
  //   const { getByText } = render(
  //     <ChatButton onClick={() => {}}>{children}</ChatButton>
  //   );
  //   const buttonElement = getByText(children);
  //   expect(buttonElement).toBeInTheDocument();
  // });

  it("calls the onClick prop when clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ChatButton onClick={onClick}>Click me!</ChatButton>
    );
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });
});
