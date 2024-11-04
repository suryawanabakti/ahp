import { DataTableUsers } from "@/Components/datable-users";
import { DataTableCandidates } from "@/Components/datatable-candidates";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";

export default function CreateCandidate({}: any) {
    const { toast } = useToast();

    const { data, setData, processing, post, reset, errors } = useForm({
        full_name: "",
        academic_performance: "",
        family_income: "",
        extracurricular_activities: "",
        attendance: "",
    });
    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(route("candidates.store"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Berhasil ✅",
                    description: "Berhasil tambah kandidat ." + data.full_name,
                }),
                    reset();
            },
        });
    };
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
                label: "Create",
                link: "/candidates/create",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={datas.breadCrumb}>
            <Head title="Tambah Kandidat" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Tambah Kandidat</CardTitle>
                        <CardDescription>
                            Tambah Kandidat AHP adalah fitur dalam sistem
                            pendukung keputusan berbasis metode Analytic
                            Hierarchy Process (AHP) yang memungkinkan pengguna
                            menambahkan calon penerima beasiswa atau alternatif
                            lain yang akan dievaluasi. Pada tahap ini, pengguna
                            dapat mengisi data kandidat, seperti nama,
                            identitas, dan informasi lainnya yang relevan untuk
                            penilaian.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="">
                        <div className="grid gap-4 py-4">
                            {" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="full_name"
                                    className="text-right"
                                >
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="full_name"
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData("full_name", e.target.value)
                                    }
                                    placeholder="Masukkan nama lengkap..."
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.full_name}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="academic_performance"
                                    className="text-right"
                                >
                                    Prestasi Akademik
                                </Label>
                                <Input
                                    id="academic_performance"
                                    value={data.academic_performance}
                                    onChange={(e) =>
                                        setData(
                                            "academic_performance",
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    placeholder="Masukkan prestasi akademik antara 1-100"
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.academic_performance}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="family_income"
                                    className="text-right"
                                >
                                    Pendapatan Keluarga
                                </Label>
                                <Input
                                    id="family_income"
                                    value={data.family_income}
                                    onChange={(e) =>
                                        setData("family_income", e.target.value)
                                    }
                                    type="number"
                                    placeholder="Masukkan pendapatan keluarga antara 1-100"
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.family_income}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="extracurricular_activities"
                                    className="text-right"
                                >
                                    Ekstrakurikuler
                                </Label>
                                <Input
                                    id="extracurricular_activities"
                                    onChange={(e) =>
                                        setData(
                                            "extracurricular_activities",
                                            e.target.value
                                        )
                                    }
                                    value={data.extracurricular_activities}
                                    type="number"
                                    placeholder="Masukkan Ekstrakurikuler antara 1-100"
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.extracurricular_activities}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="attendance"
                                    className="text-right"
                                >
                                    Kehadiran
                                </Label>
                                <Input
                                    id="attendance"
                                    onChange={(e) =>
                                        setData("attendance", e.target.value)
                                    }
                                    value={data.attendance}
                                    type="number"
                                    max={100}
                                    placeholder="Masukkan Kehadiran antara 1-100"
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.attendance}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                        <Button
                            type="submit"
                            onClick={submit}
                            disabled={processing}
                        >
                            Save changes
                        </Button>
                        <Button
                            type="submit"
                            onClick={submit}
                            variant={"secondary"}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
