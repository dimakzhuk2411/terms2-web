import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from "@/lib/navigation/types";
import type { Session } from "@/types/Session";
import { MENU_CONFIG } from "@/lib/navigation/menu-config";

async function getSession(): Promise<Session> {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/nextconnect/session`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    if (!res.ok) return null;

    return res.json();
}

function filterMenuByRoles(
  menu: MenuItem[],
  roles: string[]
): MenuItem[] {
  return menu
    .map((item): MenuItem | null => {
      const items = item.items
        ? filterMenuByRoles(item.items, roles)
        : undefined;

      const canSee =
        item.permission &&
        roles.includes(item.permission);

      const hasChildren = items && items.length > 0;

      if (!canSee && !hasChildren) return null;

      return {
        ...item,
        items,
      };
    })
    .filter((item): item is MenuItem => item !== null);
}

async function prepareSidebar() {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/nextconnect/roles`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            }
        }
    );

    const roles = await res.json();

    const menu = filterMenuByRoles(MENU_CONFIG, roles);
    
    return menu
}

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    if (!session) redirect("/login");
    
    await prepareSidebar();

    const menu = await prepareSidebar();

    return (
        <div className="min-h-0 h-full">
            <SidebarProvider>
                <AppSidebar menu={menu} session={session}/>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex w-full items-center gap-2 px-4">
                            <SidebarTrigger size={"icon-lg"} variant="secondary" />
                            <Separator
                                orientation="vertical"
                                className="data-[orientation=vertical]:h-10"
                            />
                            <div className="flex flex-1 w-full h-10 justify-stretch">
                                <div id="module-name" className="h-full w-full"/>
                                <div id="action-pack-1" className="h-full w-full"/>
                                <div id="action-pack-2" className="h-full w-full"/>
                            </div>
                        </div>
                    </header>
                    <div className="px-4 py-2 min-h-0 h-full">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}