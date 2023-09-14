/**
 * inputChecks - A utility function for defining validation rules for input fields.
 *
 * @param {string} type - The type of input field (e.g., "text", "email", "number").
 * @param {string} name - The name of the input field.
 * @returns {object} - An object containing validation rules based on the input type and name.
 */

const inputChecks = (type, name) => {
  const checks = { required: "*Please fill this field" };

  if (type === "email") {
    checks.pattern =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  } else if (type === "number") {
    if (name === "mobile") {
      checks.minLength = { value: 10, message: "*Invalid mobile number " };
      checks.maxLength = { value: 12, message: "*Invalid mobile number" };
    } else if (name === "postalCode") {
      checks.minLength = { value: 6, message: "*Invalid postal code" };
      checks.maxLength = { value: 6, message: "*Invalid postal code" };
    }
  }

  return checks;
};
export { inputChecks };
