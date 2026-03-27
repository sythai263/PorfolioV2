import experienceData from "@data/experience.json";
import { ResponseBuilder, withMiddleware } from "@lib";
import { NextResponse } from "next/server";

export const GET = withMiddleware(
  async (_req, { requestId }) => {
    try {
      // Sort experiences by endDate (most recent first)
      const sortedExperiences = experienceData.sort((a, b) => {
        const dateA = a.endDate ? new Date(a.endDate) : new Date();
        const dateB = b.endDate ? new Date(b.endDate) : new Date();
        return dateB.getTime() - dateA.getTime();
      });

      const response = ResponseBuilder.success(
        sortedExperiences,
        "Experiences retrieved successfully",
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
      console.error("Error fetching experiences:", error);
      const response = ResponseBuilder.internalServerError(
        "Failed to fetch experiences data",
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
