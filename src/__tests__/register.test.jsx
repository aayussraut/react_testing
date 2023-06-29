import { render, screen } from "@testing-library/react";
import Register from "../component/register/Register.jsx";
import userEvent from "@testing-library/user-event";

describe("Register Component", () => {
  //using getByTestId
  it("should render the Register component", () => {
    //arrange
    render(<Register />);
    //act
    const registerElement = screen.getByTestId("register");
    //assert
    expect(registerElement).toBeInTheDocument();
  });

  //using getByRole
  it("should render the Register component", () => {
    //arrange
    render(<Register />);
    //act
    // const registerElement=screen.getByRole("heading",{name:"Aayush",level:2}) //fails because name is not Aayush
    const registerElement = screen.getByRole("heading", {
      name: "Register",
      level: 2,
    });
    //assert
    expect(registerElement).toBeInTheDocument();
  });

  //using getByRole but without using screen
  it("should render the Register component", () => {
    const { getByRole } = render(<Register />);
    const registerElement = getByRole("heading", {
      name: "Register",
      level: 2,
    });
    expect(registerElement).toBeInTheDocument();
  });

  // it("should show error message when all the fields are not entered", () => {
  //         const {getByRole} = render(<Register/>)
  //         const registerElement = getByRole("button", {name: "Register"})
  //         fireEvent.click(registerElement)
  //         const errorMessageElement = getByRole("alert")
  //         expect(errorMessageElement).toBeInTheDocument()
  //     }
  // )

  it("should show error message when all the fields are not entered", async () => {
    render(<Register />);
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
    // screen.debug(); //to see the dom
    const errorMessageElement = screen.getByRole("alert");
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("should not show any error message when the component is loaded", () => {
    render(<Register />);
    // const alertElement = screen.getByRole("alert"); //getBy method throws an error if it does not fund the matching element
    const alertElement = screen.queryByRole("alert"); //queryBy method returns null if it does not fund the matching element
    expect(alertElement).not.toBeInTheDocument();
  });

  it("should show success message when the form is submitted with all the fields entered", async () => {
    const name = "test name";
    const email = "test@email.com";
    const password = "testpassword";

    const { container } = render(<Register />);
    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    const skillDropDownElement = container.querySelector(
      " div > div > form > div:nth-child(5) > div > div > div:nth-child(1)"
    );
    const subscribeElement = screen.getByRole("checkbox", {
      name: /subscribe to our newsletter/i,
    });

    await userEvent.type(nameElement, name);
    await userEvent.type(emailElement, email);
    await userEvent.type(passwordElement, password);
    // await userEvent.selectOptions(selectElement,["Javascript"])
    await userEvent.click(skillDropDownElement);
    await userEvent.keyboard("{enter}");
    await userEvent.click(subscribeElement);

    expect(nameElement.value).toBe(name);
    expect(emailElement.value).toBe(email);
    expect(passwordElement.value).toBe(password);
    expect(skillDropDownElement.value).toBe("React");

    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
    screen.debug(); //to see the dom
    // const alertMessageElement=screen.getByText(/You have been successfully registered/i)
    const errorMessageElement = screen.getByRole("alert");
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("should test for presence of subheading in the component", () => {
    render(<Register />);
    const element = screen.getByRole("heading", {
      name: /please enter your details below to register yourself\./i,
    });
    expect(element).toBeInTheDocument();
  });
});
