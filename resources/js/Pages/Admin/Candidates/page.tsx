import { DataTableUsers } from "@/Components/datable-users";
import { DataTableCandidates } from "@/Components/datatable-candidates";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Users({ candidates }: any) {
    const data = {
        breadCrumb: [
            {
                label: "Home",
                link: "/dashboard",
            },
            {
                label: "Candidates",
                link: "/candidates",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={data.breadCrumb}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <DataTableCandidates data={candidates} />
            </div>
        </AuthenticatedLayout>
    );
}
