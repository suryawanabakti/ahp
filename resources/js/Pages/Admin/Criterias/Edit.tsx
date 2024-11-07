import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";

import InputError from "@/Components/InputError";
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

export default function EditCriteria({ criteria }: any) {
    const { toast } = useToast();
    console.log("CANDIDAE", criteria);
    const { data, setData, processing, patch, reset, errors } = useForm({
        name: criteria.name,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        patch(route("criterias.update", criteria.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Berhasil Ubah ✅",
                    description: "Berhasil ubah kandidat ." + data.name,
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
                label: "Kriteria",
                link: "/criterias",
            },
            {
                label: "Edit",
                link: "/criterias/edit",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={datas.breadCrumb}>
            <Head title="Edit Kriteria" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Edit Kriteria</CardTitle>
                        <CardDescription>
                            Edit Kriteria AHP adalah fitur dalam sistem
                            pendukung keputusan berbasis metode Analytic
                            Hierarchy Process (AHP) yang memungkinkan pengguna
                            mengedit nama kriteria.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="">
                        <div className="grid gap-4 py-4">
                            {" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nama Kriteria
                                </Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Masukkan nama kriteria..."
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.name}
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
                            type="button"
                            onClick={() => reset()}
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
