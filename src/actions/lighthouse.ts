"use server";
import lighthouse from "@lighthouse-web3/sdk";

const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;

if (!LIGHTHOUSE_API_KEY) throw new Error("LIGHTHOUSE_API_KEY not defined");

export async function uploadImage(image: Buffer<ArrayBuffer>) {
  const { data } = await lighthouse.uploadBuffer(image, LIGHTHOUSE_API_KEY!);
  return data.Hash;
}

export async function uploadTweet(tweet: string) {
  const { data } = await lighthouse.uploadText(tweet, LIGHTHOUSE_API_KEY!);
  return data.Hash as string;
}
