import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z-.\s]+$/, "Name must contain only letters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/,
      "Password must be 8-12 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  age: yup
    .string()
    .matches(/^\d{2,3}$/, "Age must be between 2 and 3 digits (e.g., 18, 32, 150)")
    .required("Age is required"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{8}$/, "Phone must be exactly 8 digits and contain only numbers"),

  address: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Address must contain only letters")
    .required("Address is required"),
});
