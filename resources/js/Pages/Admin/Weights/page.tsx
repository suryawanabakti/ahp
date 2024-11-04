import { DataTableUsers } from "@/Components/datable-users";
import { DataTableRankings } from "@/Components/datatable-rankings";
import { DataTableWeghts } from "@/Components/datatable-weights";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Weight({ weights }: any) {
    const data = {
        breadCrumb: [
            {
                label: "Home",
                link: "/dashboard",
            },
            {
                label: "Bobot",
                link: "/weights",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={data.breadCrumb}>
            <Head title="Bobot" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <DataTableWeghts data={weights} />
            </div>
        </AuthenticatedLayout>
    );
}
