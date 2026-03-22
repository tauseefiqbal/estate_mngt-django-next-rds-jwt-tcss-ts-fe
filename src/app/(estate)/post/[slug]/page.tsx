import PostDetails from "@/components/post/PostDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Post Details",
	description: "Authenticated users can see the details of a post",
};

interface ParamsProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function PostDetailPage({ params }: ParamsProps) {
	const { slug } = await params;
	return (
		<>
			<PostDetails slug={slug} />
		</>
	);
}
