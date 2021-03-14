const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePOInput(data) {
    let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
    data.company.name = !isEmpty(data.company.name) ? data.company.name : "";
    data.company.url = !isEmpty(data.company.url) ? data.company.url: "";
    data.purpose = !isEmpty(data.purpose) ? data.purpose : "";
    data.owner = !isEmpty(data.owner) ? data.owner : "";

  // Company checks
    if (Validator.isEmpty(data.company.name)) {
      errors.company_name = "Company name field is required";
    }
    if (Validator.isEmpty(data.company.url)) {
      errors.company_url = "Company url field is required";
    }

     //Purpose check
  if (Validator.isEmpty(data.purpose)) {
    errors.purpose= "Purpose field is required";
  }

    //Price check
if (Validator.isEmpty(data.owner)) {
  errors.owner = "Owner field is required";
}

  return {
      errors,
      isValid: isEmpty(errors)
    };
  };