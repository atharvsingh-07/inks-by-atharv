import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Story from "../../../../models/Story";

export async function GET() {
  try {
    await dbConnect();

    const newStory = await Story.create({
      title: "Whispers of Tomorrow",
      slug: "whispers-of-tomorrow",
      excerpt:
        "A story of emotions, struggles, friendships, and the silent battles of student life.",
      content:
        "This is the first chapter of Whispers of Tomorrow...",
      category: "Novel",
      coverImage:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      published: true,
    });

    return NextResponse.json(newStory);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create story",
        details: String(error),
      },
      { status: 500 }
    );
  }
}