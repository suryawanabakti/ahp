"use client";

import { AwardIcon, Home, LucideGitCompare, Weight } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";

export function NavMain({}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={route().current("dashboard")}
                        >
                            <Link
                                href={route("dashboard")}
                                preserveScroll={true}
                            >
                                <Home />
                                <span>Home</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={route().current("rankings*")}
                        >
                            <Link
                                href={route("rankings")}
                                preserveScroll={true}
                            >
                                <AwardIcon />
                                <span>Perankingan</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={route().current("weights*")}
                        >
                            <Link href={route("weights")}>
                                <Weight />
                                <span>Bobot</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={route().current("pairwise-comparison*")}
                        >
                            <Link href={route("pairwise-comparison")}>
                                <LucideGitCompare />
                                <span>Perbandingan Berpasangan</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>{" "}
        </SidebarGroup>
    );
}
