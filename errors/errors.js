// eslint-disable-next-line max-classes-per-file
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

// eslint-disable-next-line max-classes-per-file


class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
};
