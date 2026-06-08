import type { Session } from "@/types/Session"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "./ui/dropdown-menu"
import { CaretUpDownIcon, UserCircleIcon, SignOutIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

type Props = {
    session: Session;
};

export function NavUser({ session }: Props) {
    const router = useRouter();

    const logOut = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/logout`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (res && res.ok) {
            router.push("/login");
        }
        else console.log(`${res.status} + ${res.statusText}`);
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size={"lg"} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="grid flex-1 text-left text-sm leading-tight break-normal">
                                <span className="font-medium text-sm">{session?.user.employee.fullname}</span>
                                <span className="text-xs">{session?.user.email}</span>
                            </div>
                            <CaretUpDownIcon className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 p-2"
                        side="right"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <div className="grid flex-1 text-left text-sm leading-tight break-normal">
                                    <span className="font-bold">{session?.user.employee.fullname}</span>
                                    <span className="text-sm">{session?.user.email}</span>
                                    <span className="text-xs">{session?.user.employee.department.clientName}</span>
                                    <span className="text-xs">{session?.user.employee.position.clientName}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => {router.push("/account")}}>
                                <UserCircleIcon />
                                Ученая запись
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={async () => {await logOut()}}>
                                <SignOutIcon />
                                Выйти
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}