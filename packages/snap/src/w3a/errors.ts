export class SnapRenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SnapRenderError";
  }
}

export class SnapApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SnapApiError";
  }
}
