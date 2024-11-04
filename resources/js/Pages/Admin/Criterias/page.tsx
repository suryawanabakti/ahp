import { DataTableUsers } from "@/Components/datable-users";
import { DataTableCandidates } from "@/Components/datatable-candidates";
import { DataTableCriterias } from "@/Components/datatable-criterias";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Criterias({ criterias }: any) {
    const data = {
        breadCrumb: [
            {
                label: "Home",
                link: "/dashboard",
            },
            {
                label: "criterias",
                link: "/criterias",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={data.breadCrumb}>
            <Head title="Kriteria" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <DataTableCriterias data={criterias} />
            </div>
        </AuthenticatedLayout>
    );
}
