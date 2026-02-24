export async function generateMetadata({ params }) {
  const course = await getCourse(params.slug);

  return {
    title: course.title,
    description: course.description,
  };
}
