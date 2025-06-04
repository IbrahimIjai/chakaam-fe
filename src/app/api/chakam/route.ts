import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json(
        { error: "No active session found" },
        { status: 401 }
      );
    return NextResponse.json({ data: session });
  } catch (error) {
    console.error("Error in Chakam GET", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json(
        { error: "No active session found" },
        { status: 401 }
      );
    return NextResponse.json({ data: session });
  } catch (error) {
    console.error("Error in Chakam GET", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
