/**
 * @description Function to check for a valid email
 *
 * @param {string} address The phone number to be checked
 *
 * @returns {Boolean} true or false
 */
const isValidAddress = addy => {
  const isValid = /^[a-zA-Z0-9,.-\s]+$/;
  return isValid.test(addy);
};

export default isValidAddress;
