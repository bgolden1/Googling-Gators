const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.URL_Link = !isEmpty(data.URL_Link) ? data.URL_Link : "";
    data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
    data.price = !isEmpty(data.price) ? data.price : "";


  // Name checks
    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
    }

  // Description checks
    if (Validator.isEmpty(data.description)) {
      errors.email = "Item description is required";
    } 

  // URL link checks
    if (Validator.isEmpty(data.URL_Link)) {
      errors.URL_Link = "URL Link field is required";
    }

    //Quantity check
  if (Validator.isEmpty(data.quantity)) {
      errors.quantity= "Quantity field is required";
    }

      //Price check
  if (Validator.isEmpty(data.price)) {
    errors.price = "Total Price field is required";
  }


  return {
      errors,
      isValid: isEmpty(errors)
    };
  };