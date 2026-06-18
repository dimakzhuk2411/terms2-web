'use client'

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { UserListIcon, ListChecksIcon } from "@phosphor-icons/react";
import type { MenuItem } from "@/lib/navigation/types";
import type { Session } from "@/types/Session"
import { ICON_REGISTRY } from "@/lib/navigation/icon-registry";
import Link from "next/link";
import { Empty, EmptyHeader, EmptyContent, EmptyMedia, EmptyTitle, EmptyDescription } from "./ui/empty";
import { NavUser } from "./nav-user";
import { Badge } from "./ui/badge";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    menu: MenuItem[] | null;
    session: Session;
};

export function AppSidebar({ menu, session, ...props }: AppSidebarProps) {
    return (
        <Sidebar variant="floating" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu className="select-none">
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} asChild>
                            <Link href={"/"}>
                                <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                                    <UserListIcon />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold">Сроки</span>
                                    {/* <span className="truncate text-xs">РИЦ</span> */}
                                </div>
                                <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                    v2.0
                                </Badge>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="select-none">
                        {menu && menu.map((item) => {
                            const Icon = item.icon ? ICON_REGISTRY[item.icon] : null
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link href={item.url}>
                                            {Icon && <Icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        {item.items?.map((i) => {
                                            const SubIcon = i.icon ? ICON_REGISTRY[i.icon] : null;
                                            return (
                                                <SidebarMenuSubItem key={i.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={i.url}>
                                                            {SubIcon && <SubIcon />}
                                                            <span>{i.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            )
                                        })}
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            )
                        })}
                        {(!menu || menu.length == 0) &&
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <ListChecksIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>Нет модулей!</EmptyTitle>
                                    <EmptyDescription>Для появления модулей в данном меню необходимо обратиться к администратору для назначения соответствующих ролей!</EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>

                                </EmptyContent>
                            </Empty>
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser session={session}/>
            </SidebarFooter>
        </Sidebar>
    )
}