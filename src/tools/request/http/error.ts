export class HttpError<ErrorBody extends unknown> {
  constructor(
    public message: string,
    public body?: ErrorBody,
    public panic = false,
  ) {}
}
