import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ShowCandidate({ candidate }: any) {
    const datas = {
        breadCrumb: [
            {
                label: "Home",
                link: "/dashboard",
            },
            {
                label: "Candidates",
                link: "/candidates",
            },
            {
                label: "Rincian",
                link: "/candidates/view",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={datas.breadCrumb}>
            <Head title="Rincian Kandidat" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Rincian Kandidat</CardTitle>
                        <CardDescription>
                            Rincian Kandidat AHP adalah fitur dalam sistem
                            pendukung keputusan berbasis metode Analytic
                            Hierarchy Process (AHP) yang memungkinkan pengguna
                            melihat data kandidat untuk penilaian.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">
                                    Nama Lengkap:
                                </label>
                                <div className="col-span-3">
                                    {candidate.full_name}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">NPM:</label>
                                <div className="col-span-3">
                                    {candidate.npm}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">Jurusan:</label>
                                <div className="col-span-3">
                                    {candidate.jurusan}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">
                                    File Raport:
                                </label>
                                <div className="col-span-3">
                                    <a
                                        href={`/storage/${candidate.pdf_raport}`}
                                        download
                                    >
                                        Download Raport
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">File SKHU:</label>
                                <div className="col-span-3">
                                    <a
                                        href={`/storage/${candidate.pdf_skhu}`}
                                        download
                                    >
                                        Download SKHU
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">
                                    Peringkat (C1):
                                </label>
                                <div className="col-span-3">{candidate.c1}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">
                                    Nilai rata-rata (C2):
                                </label>
                                <div className="col-span-3">{candidate.c2}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">
                                    Akademik (C3):
                                </label>
                                <div className="col-span-3">{candidate.c3}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right">
                                    Non Akademik (C4):
                                </label>
                                <div className="col-span-3">{candidate.c4}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
