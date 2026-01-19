// =============================================================================
// Jibal Adventures — Error Handling Utilities
// =============================================================================

import { NextResponse } from "next/server";

/**
 * Standard error codes used across the API
 * These are machine-readable (for frontend logic)
 */
export const ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * Custom API Error class
 * Extends built-in Error with status code and error code
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = "ApiError";
  }
}

/**
 * Pre-built error factories for common cases
 * Usage: throw notFound('Trip')
 */
export function badRequest(
  message: string,
  details?: Record<string, unknown>
): ApiError {
  return new ApiError(400, ERROR_CODES.BAD_REQUEST, message, details);
}

export function unauthorized(message = "Authentication required"): ApiError {
  return new ApiError(401, ERROR_CODES.UNAUTHORIZED, message);
}

export function forbidden(message = "Access denied"): ApiError {
  return new ApiError(403, ERROR_CODES.FORBIDDEN, message);
}

export function notFound(resource: string): ApiError {
  return new ApiError(404, ERROR_CODES.NOT_FOUND, `${resource} not found`);
}

export function validationError(
  message: string,
  details?: Record<string, unknown>
): ApiError {
  return new ApiError(400, ERROR_CODES.VALIDATION_ERROR, message, details);
}

export function internalError(message = "Something went wrong"): ApiError {
  return new ApiError(500, ERROR_CODES.INTERNAL_ERROR, message);
}

/**
 * Format an error for API response
 * Always returns consistent shape: { error: { code, message, details? } }
 */
export function formatErrorResponse(error: unknown): {
  status: number;
  body: {
    error: { code: string; message: string; details?: Record<string, unknown> };
  };
} {
  // Handle our custom ApiError
  if (error instanceof ApiError) {
    return {
      status: error.statusCode,
      body: {
        error: {
          code: error.code,
          message: error.message,
          ...(error.details && { details: error.details }),
        },
      },
    };
  }

  // Handle standard Error
  if (error instanceof Error) {
    return {
      status: 500,
      body: {
        error: {
          code: ERROR_CODES.INTERNAL_ERROR,
          message: error.message,
        },
      },
    };
  }

  // Handle unknown errors (strings, objects, etc.)
  return {
    status: 500,
    body: {
      error: {
        code: ERROR_CODES.INTERNAL_ERROR,
        message: "An unexpected error occurred",
      },
    },
  };
}

/**
 * Helper to use in API route catch blocks
 * Usage: catch (error) { return errorResponse(error) }
 */
export function errorResponse(error: unknown): NextResponse {
  const { status, body } = formatErrorResponse(error);
  return NextResponse.json(body, { status });
}
