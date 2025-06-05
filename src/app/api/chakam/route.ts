import { uploadImage, uploadTweet } from "@/actions/lighthouse";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session)
      return NextResponse.json(
        { error: "You are not signed in and cannot access this page" },
        { status: 401 }
      );
    const chakams = await prisma.chakam.findMany({
      where: { userId: session.user.id },
    });
    return NextResponse.json({ data: chakams });
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
    const [session, formData] = await Promise.all([
      auth.api.getSession({ headers: req.headers }),
      req.formData(),
    ]);

    if (!session)
      return NextResponse.json(
        { error: "No active session found" },
        { status: 401 }
      );

    const tweet = formData.get("tweet") as string | null;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    if (!description && !image) {
      return NextResponse.json(
        { error: "No proof provided with description" },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const [tweetHash, imageHash] = await Promise.all([
      tweet ? uploadTweet(tweet) : null,
      uploadImage(buffer),
    ]);

    const chakam = await prisma.chakam.create({
      data: {
        description,
        image: imageHash,
        tweet: tweetHash,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ data: chakam });
  } catch (error) {
    console.error("Error in Chakam POST", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
