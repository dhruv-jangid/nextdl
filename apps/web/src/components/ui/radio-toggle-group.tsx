"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

type RadioToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroup>,
  "type" | "value" | "defaultValue" | "onValueChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

function RadioToggleGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  ...props
}: RadioToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  function handleChange(val: string | null) {
    if (!val) return;
    if (isControlled) {
      onValueChange?.(val);
    } else {
      setUncontrolledValue(val);
      onValueChange?.(val);
    }
  }

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={value}
      onValueChange={handleChange}
      {...props}
    >
      {children}
    </ToggleGroup>
  );
}

export { RadioToggleGroup, ToggleGroupItem };
