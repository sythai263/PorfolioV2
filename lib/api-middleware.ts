import { NextRequest, NextResponse } from "next/server";
import { ResponseBuilder } from "./api-response";

// Middleware Types
export interface ApiMiddleware {
  (req: NextRequest, res: NextResponse): Promise<NextResponse | void>;
}

export interface MiddlewareConfig {
  enableCORS?: boolean;
  enableRateLimit?: boolean;
  enableLogging?: boolean;
  enableValidation?: boolean;
  rateLimit?: {
    windowMs: number;
    maxRequests: number;
  };
}

// Helper function to get client IP
function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

// Rate Limiting Store (In-memory for demo)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// CORS Middleware
export const corsMiddleware = (
  req: NextRequest,
  res: NextResponse,
): NextResponse => {
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://yourdomain.com",
  ];

  if (allowedOrigins.includes(origin || "")) {
    res.headers.set("Access-Control-Allow-Origin", origin || "");
  }

  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
};

// Rate Limiting Middleware
export const rateLimitMiddleware = (
  req: NextRequest,
  config: MiddlewareConfig["rateLimit"],
): NextResponse | void => {
  if (!config) return;

  const clientId = getClientIP(req);
  const now = Date.now();
  const windowMs = config.windowMs;
  const maxRequests = config.maxRequests;

  const clientData = rateLimitStore.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetTime: now + windowMs,
    });
    return;
  }

  if (clientData.count >= maxRequests) {
    const response = ResponseBuilder.tooManyRequests(
      `Rate limit exceeded. Try again in ${Math.ceil((clientData.resetTime - now) / 1000)} seconds`,
    );
    return NextResponse.json(response, {
      status: 429,
      headers: {
        "X-RateLimit-Limit": maxRequests.toString(),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": clientData.resetTime.toString(),
      },
    });
  }

  clientData.count++;
};

// Logging Middleware
export const loggingMiddleware = (req: NextRequest): void => {
  const start = Date.now();
  const method = req.method;
  const url = req.url;
  const userAgent = req.headers.get("user-agent") || "unknown";
  const ip = getClientIP(req);

  // Log request
  console.log(`📝 ${method} ${url} - ${ip} - ${userAgent}`);

  // Note: Response logging would need to be handled at the route level
  // due to NextResponse limitations with method overriding
};

// Validation Middleware
export const validationMiddleware = (
  req: NextRequest,
  schema?: any,
): NextResponse | void => {
  // Basic validation example
  const contentType = req.headers.get("content-type");

  if (req.method === "POST" || req.method === "PUT") {
    if (!contentType?.includes("application/json")) {
      const response = ResponseBuilder.badRequest(
        "Content-Type must be application/json",
      );
      return NextResponse.json(response, { status: 400 });
    }
  }

  // Add custom schema validation here if needed
  if (schema) {
    // Implement schema validation logic
  }
};

// Error Handling Middleware
export const errorHandlerMiddleware = (
  error: Error,
  req: NextRequest,
): NextResponse => {
  console.error("❌ API Error:", error);

  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV === "development";

  if (error.name === "ValidationError") {
    const response = ResponseBuilder.unprocessableEntity(error.message);
    return NextResponse.json(response, { status: 422 });
  }

  if (error.name === "UnauthorizedError") {
    const response = ResponseBuilder.unauthorized(error.message);
    return NextResponse.json(response, { status: 401 });
  }

  // Generic error
  const message = isDevelopment ? error.message : "Internal server error";
  const response = ResponseBuilder.internalServerError(message);
  return NextResponse.json(response, { status: 500 });
};

// Request ID Middleware
export const requestIdMiddleware = (
  req: NextRequest,
  res: NextResponse,
): string => {
  const requestId =
    req.headers.get("x-request-id") ||
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

  res.headers.set("X-Request-ID", requestId);
  return requestId;
};

// Security Headers Middleware
export const securityHeadersMiddleware = (res: NextResponse): NextResponse => {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return res;
};

// Main Middleware Chain
export const applyMiddleware = (
  req: NextRequest,
  config: MiddlewareConfig = {},
): { requestId: string; headers: Record<string, string> } => {
  const requestId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const headers: Record<string, string> = {
    "X-Request-ID": requestId,
  };

  try {
    // Apply security headers
    headers["X-Content-Type-Options"] = "nosniff";
    headers["X-Frame-Options"] = "DENY";
    headers["X-XSS-Protection"] = "1; mode=block";
    headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";

    // Apply CORS if enabled
    if (config.enableCORS !== false) {
      const origin = req.headers.get("origin");
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://yourdomain.com",
      ];

      if (allowedOrigins.includes(origin || "")) {
        headers["Access-Control-Allow-Origin"] = origin || "";
      }
      headers["Access-Control-Allow-Methods"] =
        "GET, POST, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization, X-Requested-With";
      headers["Access-Control-Allow-Credentials"] = "true";
    }

    // Apply logging if enabled
    if (config.enableLogging !== false) {
      const method = req.method;
      const url = req.url;
      const userAgent = req.headers.get("user-agent") || "unknown";
      const ip = getClientIP(req);

      console.log(`📝 ${method} ${url} - ${ip} - ${userAgent}`);
    }

    // Apply rate limiting if enabled
    if (config.enableRateLimit && config.rateLimit) {
      const clientId = getClientIP(req);
      const now = Date.now();
      const windowMs = config.rateLimit.windowMs;
      const maxRequests = config.rateLimit.maxRequests;

      const clientData = rateLimitStore.get(clientId);

      if (!clientData || now > clientData.resetTime) {
        rateLimitStore.set(clientId, {
          count: 1,
          resetTime: now + windowMs,
        });
      } else if (clientData.count >= maxRequests) {
        headers["X-RateLimit-Limit"] = maxRequests.toString();
        headers["X-RateLimit-Remaining"] = "0";
        headers["X-RateLimit-Reset"] = clientData.resetTime.toString();

        throw new Error(
          `Rate limit exceeded. Try again in ${Math.ceil((clientData.resetTime - now) / 1000)} seconds`,
        );
      } else {
        clientData.count++;
        headers["X-RateLimit-Limit"] = maxRequests.toString();
        headers["X-RateLimit-Remaining"] = (
          maxRequests - clientData.count
        ).toString();
        headers["X-RateLimit-Reset"] = clientData.resetTime.toString();
      }
    }

    // Apply validation if enabled
    if (config.enableValidation !== false) {
      const contentType = req.headers.get("content-type");

      if (req.method === "POST" || req.method === "PUT") {
        if (!contentType?.includes("application/json")) {
          throw new Error("Content-Type must be application/json");
        }
      }
    }

    return { requestId, headers };
  } catch (error) {
    throw error;
  }
};

// Higher-order function for API routes
export const withMiddleware = (
  handler: (
    req: NextRequest,
    context: { requestId: string },
  ) => Promise<NextResponse>,
  config: MiddlewareConfig = {},
) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Apply middleware chain
      const { requestId, headers } = applyMiddleware(req, config);

      // Call the actual handler
      const handlerResponse = await handler(req, { requestId });

      // Apply headers to response
      Object.entries(headers).forEach(([key, value]) => {
        handlerResponse.headers.set(key, value);
      });

      return handlerResponse;
    } catch (error) {
      console.error("❌ API Error:", error);

      // Don't expose internal errors in production
      const isDevelopment = process.env.NODE_ENV === "development";
      const message = isDevelopment
        ? (error as Error).message
        : "Internal server error";

      const response = ResponseBuilder.internalServerError(message);
      return NextResponse.json(response, { status: 500 });
    }
  };
};
