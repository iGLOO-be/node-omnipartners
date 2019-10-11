export class AuthenticationError extends Error {
  public message = "Not logged!";
  public code = "E_NOT_LOGGED";
}
