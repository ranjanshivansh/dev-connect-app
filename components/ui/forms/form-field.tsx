import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../input";
import { Textarea } from "../textarea";

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  error: string[];
  helperText?: string;
  textarea?: boolean;
}

export default function FormField({
  label,
  id,
  name,
  placeholder,
  required,
  onChange,
  error,
  helperText,
  textarea,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="font-medium mt-32" htmlFor={id}>
        {label}
      </Label>
      {textarea ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
        />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
        />
      )}
      {helperText && <p className="text-xs text-foreground">{helperText}</p>}
      {error && error.length > 0 && (
        <p className="text-destructive text-xs">{error.join(", ")}</p>
      )}
    </div>
  );
}
