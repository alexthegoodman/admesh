"use client";

import * as React from "react";

import { FormInputProps } from "./FormInput.d";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";

import styles from "./FormInput.module.scss";
import { Flex, TextField } from "@adobe/react-spectrum";
import { useFormContext } from "react-hook-form";

const FormInput: React.FC<FormInputProps> = ({
  //   name = "",
  //   type = "text",
  validation = {},
  errors = null,
  register = null,
  ...fieldProps
}) => {
  const { setValue } = useFormContext();
  const { name, onBlur, onChange, ref } = register(fieldProps.name, validation);

  return (
    <Flex direction="column">
      <TextField
        {...fieldProps}
        name={name}
        onBlur={onBlur}
        onChange={(value) => {
          setValue(name, value);
        }}
        ref={ref}
      />
      <SimpleErrorMessage errors={errors} fieldProps={fieldProps} />
    </Flex>
  );
};

export default FormInput;
