import PlacementApplyContent from "@/components/portal/PlacementApplyContent";

export const metadata = {
  title: "Apply for Placement — Student Portal",
};

export default async function PlacementApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ company?: string }>;
}) {
  const params = await searchParams;
  return <PlacementApplyContent initialCompany={params.company} />;
}
