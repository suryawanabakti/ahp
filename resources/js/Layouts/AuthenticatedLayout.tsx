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
import React, { PropsWithChildren } from "react";
import { Toaster } from "@/Components/ui/toaster";

export default function Authenticated({
    breadCrumb,
    children,
}: PropsWithChildren<{ breadCrumb?: any }>) {
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
                </header>
                <div style={{ zoom: "92%" }}>{children}</div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
}
