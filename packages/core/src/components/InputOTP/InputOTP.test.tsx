import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./InputOTP";

describe("InputOTP component", () => {
  it("renders OTP slots and receives typed input", () => {
    const onChange = vi.fn();
    const onComplete = vi.fn();

    render(
      <InputOTP maxLength={6} onChange={onChange} onComplete={onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = screen.getByLabelText("One-Time Password code");
    expect(input).toBeInTheDocument();

    // Type 123456
    fireEvent.change(input, { target: { value: "123456" } });
    expect(onChange).toHaveBeenCalledWith("123456");
    expect(onComplete).toHaveBeenCalledWith("123456");

    // The slots should display characters 1, 2, 3, 4, 5, 6
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("filters non-digit characters by default", () => {
    const onChange = vi.fn();

    render(
      <InputOTP maxLength={4} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = screen.getByLabelText("One-Time Password code");
    fireEvent.change(input, { target: { value: "1a2b" } });

    // Only "12" should be kept
    expect(onChange).toHaveBeenCalledWith("12");
  });

  it("respects disabled state", () => {
    const onChange = vi.fn();

    render(
      <InputOTP disabled onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = screen.getByLabelText("One-Time Password code");
    expect(input).toBeDisabled();
  });

  it("applies corner radius styling based on radius prop", () => {
    const { rerender } = render(
      <InputOTP maxLength={4} radius="none" data-testid="otp-root">
        <InputOTPGroup data-testid="otp-group">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    );

    const group = screen.getByTestId("otp-group");
    expect(group).toHaveClass("rounded-none");

    rerender(
      <InputOTP maxLength={4} radius="full" data-testid="otp-root">
        <InputOTPGroup data-testid="otp-group">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    );

    expect(group).toHaveClass("rounded-full");
  });
});
