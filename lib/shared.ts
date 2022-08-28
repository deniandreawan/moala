import { StylesConfig, ThemeConfig } from "react-select";
import { FieldError } from "react-hook-form";

export const theme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#2563eb",
    primary75: "#2563eb",
    primary50: "#dbeafe",
    primary25: "#eff6ff",
  },
});

export const styles = <T, M extends boolean>(
  error: FieldError | undefined
): StylesConfig<T, M> => ({
  control: (p, { isFocused }) => ({
    ...p,
    background: isFocused ? "#dbeafe" : error ? "#fef2f2" : undefined,
    borderColor: isFocused ? "#3b82f6" : error ? "#fecaca" : "#e5e7eb",
    borderWidth: "2px",
    fontSize: "0.875rem",
    boxShadow: "none",
    transition: "border-color 150ms 100ms",
    ":hover": {
      borderColor: isFocused ? "#3b82f6" : "#e5e7eb",
    },
  }),
  option: (p) => ({
    ...p,
    fontWeight: "500",
    fontSize: "0.875rem",
  }),
  input: (p) => ({
    ...p,
    input: {
      boxShadow: "none !important",
    },
  }),
});
