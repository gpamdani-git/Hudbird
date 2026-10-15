import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form";

type TestFormValues = {
  username: string;
};

const TestFormComponent = ({
  onSubmit = vi.fn(),
}: {
  onSubmit?: (data: TestFormValues) => void;
}) => {
  const form = useForm<TestFormValues>({
    defaultValues: {
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input placeholder="Enter username" className="test-input" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit Form</button>
      </form>
    </Form>
  );
};

describe("Form Orchestration Primitives", () => {
  it("renders form elements with proper ARIA accessibility bindings", () => {
    render(<TestFormComponent />);

    const label = screen.getByText("Username");
    const input = screen.getByPlaceholderText("Enter username");
    const description = screen.getByText("This is your public display name.");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // label htmlFor should match input id
    expect(label).toHaveAttribute("for", input.getAttribute("id"));
    // input should have aria-describedby pointing to description
    expect(input).toHaveAttribute("aria-describedby", description.getAttribute("id"));
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("triggers validation errors on empty submit and displays error message", async () => {
    const handleSubmit = vi.fn();
    render(<TestFormComponent onSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole("button", { name: "Submit Form" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Enter username");
    const label = screen.getByText("Username");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(label).toHaveClass("text-rose-600");
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("successfully validates and submits valid data", async () => {
    const handleSubmit = vi.fn();
    render(<TestFormComponent onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Enter username");
    const submitBtn = screen.getByRole("button", { name: "Submit Form" });

    fireEvent.change(input, { target: { value: "johndoe" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ username: "johndoe" }, expect.anything());
    });

    expect(screen.queryByText("Username is required")).toBeNull();
  });
});
