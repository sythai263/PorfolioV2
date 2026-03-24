// Standard API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
  timestamp: string;
  requestId?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Response Builder Class
export class ResponseBuilder {
  private static generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  // Success Response
  static success<T>(
    data: T,
    message?: string,
    statusCode: number = 200,
    requestId?: string
  ): ApiResponse<T> {
    return {
      success: true,
      data,
      message: message || 'Success',
      statusCode,
      timestamp: this.getTimestamp(),
      requestId: requestId || this.generateRequestId(),
    };
  }

  // Error Response
  static error(
    error: string,
    statusCode: number = 500,
    requestId?: string
  ): ApiResponse {
    return {
      success: false,
      error,
      statusCode,
      timestamp: this.getTimestamp(),
      requestId: requestId || this.generateRequestId(),
    };
  }

  // Paginated Response
  static paginated<T>(
    data: T[],
    meta: PaginationMeta,
    message?: string,
    requestId?: string
  ): PaginatedResponse<T> {
    return {
      success: true,
      data,
      message: message || 'Data retrieved successfully',
      statusCode: 200,
      timestamp: this.getTimestamp(),
      requestId: requestId || this.generateRequestId(),
      meta,
    };
  }

  // Created Response
  static created<T>(
    data: T,
    message?: string,
    requestId?: string
  ): ApiResponse<T> {
    return this.success(data, message || 'Resource created successfully', 201, requestId);
  }

  // No Content Response
  static noContent(requestId?: string): ApiResponse {
    return {
      success: true,
      statusCode: 204,
      timestamp: this.getTimestamp(),
      requestId: requestId || this.generateRequestId(),
    };
  }

  // Not Found Response
  static notFound(resource: string = 'Resource', requestId?: string): ApiResponse {
    return this.error(`${resource} not found`, 404, requestId);
  }

  // Bad Request Response
  static badRequest(message: string = 'Invalid request', requestId?: string): ApiResponse {
    return this.error(message, 400, requestId);
  }

  // Unauthorized Response
  static unauthorized(message: string = 'Unauthorized access', requestId?: string): ApiResponse {
    return this.error(message, 401, requestId);
  }

  // Forbidden Response
  static forbidden(message: string = 'Access forbidden', requestId?: string): ApiResponse {
    return this.error(message, 403, requestId);
  }

  // Conflict Response
  static conflict(message: string = 'Resource conflict', requestId?: string): ApiResponse {
    return this.error(message, 409, requestId);
  }

  // Unprocessable Entity Response
  static unprocessableEntity(
    errors: string | string[],
    requestId?: string
  ): ApiResponse {
    const errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
    return this.error(errorMessage, 422, requestId);
  }

  // Too Many Requests Response
  static tooManyRequests(
    message: string = 'Too many requests',
    requestId?: string
  ): ApiResponse {
    return this.error(message, 429, requestId);
  }

  // Internal Server Error Response
  static internalServerError(
    message: string = 'Internal server error',
    requestId?: string
  ): ApiResponse {
    return this.error(message, 500, requestId);
  }
}

// Response Helper Functions
export const createSuccessResponse = <T>(data: T, message?: string) => 
  ResponseBuilder.success(data, message);

export const createErrorResponse = (error: string, statusCode?: number) => 
  ResponseBuilder.error(error, statusCode);

export const createPaginatedResponse = <T>(
  data: T[],
  meta: PaginationMeta,
  message?: string
) => ResponseBuilder.paginated(data, meta, message);

// Validation Error Helper
export const createValidationErrorResponse = (errors: Record<string, string[]>) => {
  const flatErrors = Object.values(errors).flat();
  return ResponseBuilder.unprocessableEntity(flatErrors);
};
