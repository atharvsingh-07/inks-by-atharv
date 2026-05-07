import dbConnect from "../lib/mongodb";
import Story from "../models/Story";

async function getStories() {
  await dbConnect();

  const stories = await Story.find({ published: true });

  return stories;
}

export default async function Home() {
  const stories = await getStories();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Inks by Atharv
      </h1>

      <div className="space-y-6">
        {stories.map((story: any) => (
          <div
            key={story._id.toString()}
            className="border border-white/10 p-6 rounded-2xl"
          >
            <h2 className="text-3xl font-bold">
              {story.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {story.excerpt}
            </p>

            <p className="text-yellow-400 mt-4">
              {story.category}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}