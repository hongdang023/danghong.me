import { getCourses } from "@/lib/content";

export const dynamic = "force-static";

// Public shape documented at /api-docs, generated from the same courses as /list/collection.
export async function GET() {
  const courses = await getCourses();
  return Response.json(
    courses.map((c) => ({
      name: c.name,
      provider: c.provider,
      keywords: c.tags,
      review_link: c.reviewUrl,
      course_link: c.courseUrl,
    })),
  );
}
