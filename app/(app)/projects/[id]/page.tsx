import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProjectDetail } from "@/lib/ledger";
import { getUsers } from "@/lib/users";
import ProjectDetailView from "@/components/project-detail-view";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const users = await getUsers();
  const me = users.find((u) => u.id === user?.id) ?? users[0];
  const partner = users.find((u) => u.id !== user?.id) ?? users[1];

  const project = await getProjectDetail(id, me.id, partner.name);
  if (!project) notFound();

  return (
    <ProjectDetailView
      project={project}
      meId={me.id}
      partnerId={partner.id}
      partnerName={partner.name}
    />
  );
}
