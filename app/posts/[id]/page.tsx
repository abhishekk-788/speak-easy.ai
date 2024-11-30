import ContentEditor from "@/components/content/content-editor";
import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const sql = await getDbConnection();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any =
    await sql`SELECT * from posts where user_id = ${user.id} and id = ${id}`;

  return (
    <div className="mx-auto w-full max-w-screen px-6 lg:px-16 my-12">
      <ContentEditor posts={posts} />
    </div>
  );
}

{/* <div className="mx-20 w-full max-w-full px-2.5 lg:px-0 mb-12 mt-28">
  <ContentEditor posts={posts} />
</div>; */}