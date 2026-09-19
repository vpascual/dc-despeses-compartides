import { createClient } from "@/lib/supabase/server";
import { getActiveProjects, getClosedProjects } from "@/lib/ledger";
import { getUsers } from "@/lib/users";
import ProjectsView from "@/components/projects-view";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const users = await getUsers();
  const me = users.find((u) => u.id === user?.id) ?? users[0];

  const [active, closed] = await Promise.all([
    getActiveProjects(me.id),
    getClosedProjects(me.id),
  ]);

  return <ProjectsView active={active} closed={closed} />;
}
