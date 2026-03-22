import IssueDetails from "@/components/issue/IssueDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Issue Details",
	description:
		"Authenticated uses can get the details of the issue they have raised. They can also delete the issue",
};

interface ParamsProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function IssueDetailPage({ params }: ParamsProps) {
	const { id } = await params;
	return (
		<div>
			<IssueDetails id={id} />
		</div>
	);
}
