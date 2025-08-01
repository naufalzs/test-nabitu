"use client";
import React from "react";
import { IMaskInput } from "react-imask";

interface NumberFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormat = React.forwardRef<HTMLInputElement, NumberFormatProps>((props, ref) => {
  const { onChange, ...rest } = props;
  return (
    <IMaskInput
      {...rest}
      mask={Number}
      unmask={false}
      inputRef={ref}
      thousandsSeparator="."
      // eslint-disable-next-line
      onAccept={(value: any) => {
        onChange({ target: { name: props.name, value } });
      }}
      overwrite="shift"
    />
  );
});

export default NumberFormat;
