import profileData from "@data/profile.json";
import { ResponseBuilder, withMiddleware } from "@lib";
import { NextResponse } from "next/server";

export const GET = withMiddleware(
  async (_req, { requestId }) => {
    try {
      // Simulate API delay (optional)
      // await new Promise(resolve => setTimeout(resolve, 500));

      const response = ResponseBuilder.success(
        profileData,
        "Profile retrieved successfully",
        200,
        requestId,
      );

      return NextResponse.json(response, {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      const response = ResponseBuilder.internalServerError(
        "Failed to fetch profile data",
        requestId,
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
  },
);
