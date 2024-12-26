import { AppSidebar } from "@/Components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { Button } from "@/Components/ui/button";
import { Bell, PanelLeft } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import axios from "axios";

export default function Authenticated({
    breadCrumb,
    children,
}: PropsWithChildren<{ breadCrumb?: any }>) {
    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        const res = await axios.get("/get-notifications");
        setNotifications(res.data);
    };

    useEffect(() => {
        getNotifications();
    }, []);
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger />
                        <div
                            data-orientation="vertical"
                            role="none"
                            className="shrink-0 bg-border w-[1px] mr-2 h-4"
                        ></div>
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadCrumb.map((data: any, index: number) => (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {index < breadCrumb.length - 1 ? (
                                                <BreadcrumbLink asChild>
                                                    <Link href={data.link}>
                                                        {data.label}
                                                    </Link>
                                                </BreadcrumbLink>
                                            ) : (
                                                data.label
                                            )}
                                        </BreadcrumbItem>
                                        {/* Render the separator only if it's not the last item */}
                                        {index < breadCrumb.length - 1 && (
                                            <BreadcrumbSeparator />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto me-5">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="relative" variant="ghost">
                                    <Bell />
                                    <span className="sr-only">
                                        Notification
                                    </span>
                                    {notifications.length > 0 && (
                                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-0">
                                <div className="p-4 border-b">
                                    <h3 className="text-sm font-semibold">
                                        Notifications
                                    </h3>
                                </div>
                                <ul className="max-h-60 overflow-auto">
                                    {notifications.map((notification: any) => (
                                        <li
                                            key={notification.id}
                                            className="px-4 py-2 hover:bg-gray-100"
                                        >
                                            <p className="text-sm capitalize">
                                                {notification.user.name}{" "}
                                                {notification.message}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {notification.time}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                {notifications.length === 0 && (
                                    <div className="p-4 text-center text-sm text-gray-500">
                                        No new notifications
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                </header>
                <div style={{ zoom: "92%" }}>{children}</div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
}
