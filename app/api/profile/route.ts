import profileData from "@data/profile.json";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(profileData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 },
    );
  }
}
