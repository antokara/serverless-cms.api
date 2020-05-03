/**
 * for use in httpCode fields
 */
enum EHttpCode {
  /**
   * Clients with link-editing capabilities ought to automatically re-link references.
   *
   * A user agent MAY change the request method from POST to GET for the subsequent request.
   * If this behavior is undesired, the 307 Temporary Redirect status code can be used instead.
   *
   * cacheable by default
   * @see https://httpstatuses.com/301
   */
  MOVED_PERMANENTLY = 301,
  /**
   * The target resource resides temporarily under a different URI.
   * A user agent MAY change the request method from POST to GET for the subsequent request.
   *
   * @see https://httpstatuses.com/302
   */
  FOUND = 302,
  /**
   * The target resource resides temporarily under a different URI and the user agent
   * MUST NOT change the request method if it performs an automatic redirection to that URI.
   *
   * @see https://httpstatuses.com/307
   */
  TEMP_REDIRECT = 307,
  /**
   * The target resource has been assigned a new permanent URI and
   * any future references to this resource ought to use one of the enclosed URIs.
   * Does not allow changing the request method from POST to GET.
   *
   * cacheable by default
   * @see https://httpstatuses.com/308
   */
  PERM_REDIRECT = 308,
}

export { EHttpCode };
