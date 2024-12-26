"use client";

import {
    AwardIcon,
    Home,
    LucideGitCompare,
    UserIcon,
    Weight,
} from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";

export function NavMainUser({}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={route().current("rankings*")}
                        >
                            <Link href={route("rankings")}>
                                <AwardIcon />
                                <span>Perankingan</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={route().current("profile*")}
                        >
                            <Link href={route("profile.edit")}>
                                <UserIcon />
                                <span>My Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>{" "}
        </SidebarGroup>
    );
}
