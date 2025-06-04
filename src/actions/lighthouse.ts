"use server";
import lighthouse from "@lighthouse-web3/sdk";

const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;

if (!LIGHTHOUSE_API_KEY) throw new Error("LIGHTHOUSE_API_KEY not defined");

export async function uploadImage(image: File) {
  const { data } = await lighthouse.upload(image, LIGHTHOUSE_API_KEY!);
  return data.Hash;
}

export async function uploadTweet(tweet: string) {
  const { data } = await lighthouse.uploadText(tweet, LIGHTHOUSE_API_KEY!);
  return data.Hash;
}
