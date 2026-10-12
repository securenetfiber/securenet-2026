/**
 * Site-wide switch for the live address lookup (/api/address-check, Sonar).
 *
 * enabled: false skips the lookup everywhere it's used:
 * - /switch: the visitor's address goes straight into the signup form,
 *   marked AddressVerified = "no", and the CSR confirms it by hand.
 * - AvailabilityCheck (home, residential, coverage pages): the visitor sees
 *   a "we'll check it for you" message with Sign Up and phone numbers.
 *
 * Set enabled: true once the API is returning the right data. Nothing else
 * needs to change. The /api/address-check route keeps working either way,
 * so it can be tested directly while the flag is off.
 */
export const ADDRESS_CHECK = {
  enabled: false,
};
