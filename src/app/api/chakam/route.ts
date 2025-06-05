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

    const formData = await req.formData();

    const tweet = formData.get("tweet") as string | null;
    const description = formData.get("description") as string | null;
    const image = formData.get("image") as File | null;

    if (!description && !image) {
      return NextResponse.json(
        { error: "No proof provided with description" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({ data: session });
  } catch (error) {
    console.error("Error in Chakam POST", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
