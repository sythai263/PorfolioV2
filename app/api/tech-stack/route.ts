import techStackData from "@data/tech-stack.json";
import { NextResponse } from "next/server";
import { withMiddleware } from "@lib/api-middleware";
import { ResponseBuilder } from "@lib/api-response";

export const GET = withMiddleware(
  async (req, { requestId }) => {
    try {
      const response = ResponseBuilder.success(
        techStackData,
        "Tech stack data retrieved successfully",
        200,
        requestId
      );

      return NextResponse.json(response, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    } catch (error) {
      console.error("Error fetching tech stack:", error);
      const response = ResponseBuilder.internalServerError(
        "Failed to fetch tech stack data",
        requestId
      );
      return NextResponse.json(response, { status: 500 });
    }
  },
  {
    enableCORS: true,
    enableLogging: true,
    enableRateLimit: true,
    enableValidation: false,
    rateLimit: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 100, // 100 requests per minute
    },
  }
);
