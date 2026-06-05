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
import { ModeToggle } from "@/components/custom/themeModeToggler";
import { IconBase, UserListIcon, UsersThreeIcon } from "@phosphor-icons/react";
import type { MenuItem } from "@/lib/navigation/types";
import { ICON_REGISTRY } from "@/lib/navigation/icon-registry";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    menu: MenuItem[];
};

export function AppSidebar({ menu, ...props }: AppSidebarProps) {
    return (
        <Sidebar variant="floating" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} >
                            <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                                <UserListIcon />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-bold">Сроки</span>
                                {/* <span className="truncate text-xs">РИЦ</span> */}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menu.map((item) => {
                            const Icon = item.icon ? ICON_REGISTRY[item.icon] : null
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <a href={item.url}>
                                            {Icon && <Icon />}
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        {item.items?.map((i) => {
                                            const SubIcon = i.icon ? ICON_REGISTRY[i.icon] : null;
                                            return (
                                            <SidebarMenuSubItem key={i.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a href={i.url}>
                                                        {SubIcon && <SubIcon />}
                                                        <span>{i.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )})}
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <ModeToggle />
            </SidebarFooter>
        </Sidebar>
    )
}