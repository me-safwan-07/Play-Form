class ResourceNotFoundError extends Error {
  statusCode = 404;
  constructor(resource: string, id: string) {
    super(`${resource} with ID ${id} not found`);
    this.name = "ResourceNotFoundError";
  }
}

class InvalidInputError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

class ValidationError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class DatabaseError extends Error {
  statusCode = 500;
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export {
    ResourceNotFoundError,
    InvalidInputError,
    ValidationError,
    DatabaseError,
}