import {
    Folder,
    GalleryVerticalEnd,
    Home,
    HomeIcon,
    LayoutDashboard,
    User,
} from "lucide-react";
import * as React from "react";

import { NavMaster } from "@/Components/nav-master";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/Components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { NavMain } from "./nav-main";
import { usePage } from "@inertiajs/react";
import { NavMainUser } from "./nav-main-user";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;
    const data = {
        user: {
            name: user.name,
            email: user.email,
            avatar: "/avatars/shadcn.jpg",
        },
        teams: [
            {
                name: "AHP",
                logo: GalleryVerticalEnd,
                plan: "Yayasan dr. H. Alifuddinn",
            },
        ],
        navMaster: [
            {
                title: "Master Data",
                url: "#",
                icon: Folder,
                isActive: true,
                items: [
                    {
                        title: "Pengguna",
                        url: "/users",
                        name: "users",
                    },
                    {
                        title: "Kandidat",
                        url: "/candidates",
                        name: "candidates",
                    },
                    {
                        title: "Kriteria",
                        url: "/criterias",
                        name: "criterias",
                    },
                ],
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            {user.level == "admin" && (
                <SidebarContent>
                    <NavMain />
                    <NavMaster items={data.navMaster} />
                </SidebarContent>
            )}
            {user.level == "maba" && (
                <SidebarContent>
                    <NavMainUser />
                </SidebarContent>
            )}
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
