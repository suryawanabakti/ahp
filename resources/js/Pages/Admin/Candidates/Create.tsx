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
import { FormEventHandler, useState } from "react";
import InputError from "@/Components/InputError";
import { ListPeringkat } from "@/Components/list-peringkat";
import { ListJurusan } from "@/Components/list-jurusan";

export default function CreateCandidate({ dataUsers }: any) {
    const { toast } = useToast();

    const { data, setData, processing, post, reset, errors } = useForm({
        full_name: "",
        npm: "",
        jurusan: "",
        jumlah_prestasi_akademik: 0,
        jumlah_prestasi_non_akademik: 0,
        c1: "",
        c2: "",
        c3: "",
        c4: "",
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
    type User = {
        id: number;
        npm: string;
        name: string;
    };

    const users: User[] = dataUsers;

    const [user, setUser] = useState<{ npm: string; name: string }>({
        npm: "",
        name: "",
    });
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = (value: string) => {
        setData("npm", value);
        if (value.length == 10) {
            const filtered = users.filter(
                (user) =>
                    user.npm.includes(value) ||
                    user.name.toLowerCase().includes(value.toLowerCase())
            );
            if (filtered.length > 0) {
                setData({
                    ...data,
                    full_name: filtered[0].name,
                    npm: filtered[0].npm,
                });
            }
        } else {
            setData({
                ...data,
                full_name: "",
                npm: value,
            });
        }
        // if (value.trim()) {
        //     const filtered = users.filter(
        //         (user) =>
        //             user.npm.includes(value) ||
        //             user.name.toLowerCase().includes(value.toLowerCase())
        //     );
        //     setFilteredUsers(filtered);
        //     setShowDropdown(filtered.length > 0);
        // } else {
        //     setShowDropdown(false);
        // }
    };

    const handleSelect = (user: User) => {
        setData({
            ...data,
            full_name: user.name,
            npm: user.npm,
        });

        setShowDropdown(false);
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
                                <Label htmlFor="npm" className="text-right">
                                    NPM
                                </Label>
                                <div className="relative w-full max-w-md">
                                    <Input
                                        id="npm"
                                        value={data.npm}
                                        onChange={(e) =>
                                            handleInputChange(e.target.value)
                                        }
                                        placeholder="Masukkan NPM..."
                                        autoComplete="off"
                                    />
                                    {showDropdown && (
                                        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                                            {filteredUsers.map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() =>
                                                        handleSelect(user)
                                                    }
                                                >
                                                    {user.npm} - {user.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.full_name}
                                />
                            </div>
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
                                <Label htmlFor="jurusan" className="text-right">
                                    Jurusan
                                </Label>
                                <ListJurusan setData={setData} />

                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.jurusan}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="academic_performance"
                                    className="text-right"
                                >
                                    Peringkat (C1)
                                </Label>
                                <ListPeringkat setData={setData} />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.c1}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="family_income"
                                    className="text-right"
                                >
                                    Nilai rata-rata (C2)
                                </Label>
                                <Input
                                    id="family_income"
                                    value={data.c2}
                                    onChange={(e) =>
                                        setData("c2", e.target.value)
                                    }
                                    type="number"
                                    placeholder="Masukkan nilai rata-rata "
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.c2}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="jumlah_prestasi_akademik"
                                    className="text-right"
                                >
                                    Jumlah Prestasi Akademik
                                </Label>
                                <Input
                                    id="jumlah_prestasi_akademik"
                                    onChange={(e: any) =>
                                        setData(
                                            "jumlah_prestasi_akademik",
                                            e.target.value
                                        )
                                    }
                                    value={data.jumlah_prestasi_akademik}
                                    type="number"
                                    placeholder="Masukkan Jumlah Prestasi Akademik "
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.c3}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="c3" className="text-right">
                                    Prestasi Akademik (C3)
                                </Label>
                                <Input
                                    id="c3"
                                    onChange={(e) =>
                                        setData("c3", e.target.value)
                                    }
                                    value={data.c3}
                                    type="number"
                                    placeholder="Masukkan Nilai Prestasi Akademik "
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.c3}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="jumlah_prestasi_non_akademik"
                                    className="text-right"
                                >
                                    Jumlah Prestasi Non Akademik
                                </Label>
                                <Input
                                    id="jumlah_prestasi_non_akademik"
                                    onChange={(e: any) =>
                                        setData(
                                            "jumlah_prestasi_non_akademik",
                                            e.target.value
                                        )
                                    }
                                    value={data.jumlah_prestasi_non_akademik}
                                    type="number"
                                    placeholder="Masukkan Jumlah Non Prestasi Akademik "
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.c3}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="c4" className="text-right">
                                    Prestasi Non Akademik (C4)
                                </Label>
                                <Input
                                    id="c4"
                                    onChange={(e) =>
                                        setData("c4", e.target.value)
                                    }
                                    value={data.c4}
                                    type="number"
                                    max={100}
                                    placeholder="Masukkan Nilai Prestasi Non AKademik "
                                    className="col-span-3"
                                />
                                <InputError
                                    className="col-span-2 text-right"
                                    message={errors.c4}
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
                            Save
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
