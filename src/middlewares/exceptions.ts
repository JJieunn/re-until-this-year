export class BadRequestException extends Error {
  statusCode: number = 400

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export class EmptyException extends BadRequestException {

  constructor(message: string) {
    super(400, message)
    this.name = "Empty Keys Exception"
  }
}

export class RegExpException extends BadRequestException {

  constructor(message: string) {
    super(400, message)
    this.name = "RegExp Validate Exception"
  }
}

export class DuplicateException extends BadRequestException {

  constructor(message: string) {
    super(409, message)
    this.name = "Duplicate Exception"
  }
}

export class NotFoundException extends BadRequestException {

  constructor(message: string) {
    super(404, message)
    this.name = "Not Found Exception"
  }
}