/**
 * @description Function to check for a valid email
 *
 * @param {string} phoneNumber The phone number to be checked
 *
 * @returns {Boolean} true or false
 */
const isValidPhoneNumber = phoneNumber => {
  const isValid = /^\+[1-9]\d{1,14}$/;
  return isValid.test(phoneNumber);
};

export default isValidPhoneNumber;
