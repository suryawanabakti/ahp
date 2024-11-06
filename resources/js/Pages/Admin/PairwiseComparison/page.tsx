import { DataTableRankings } from "@/Components/datatable-rankings";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function PairwiseComparison({
    criterias,
    comparisons,
    versus,
}: any) {
    const formatNumber = (num: any) => {
        // Mengecek apakah angka adalah bilangan bulat
        if (Number.isInteger(num) || num % 1 === 0) {
            return num; // Mengembalikan angka asli jika bilangan bulat
        }
        return num.toFixed(2); // Mengonversi ke format 2 desimal jika bukan bilangan bulat
    };

    function convertDecimalToFraction(decimal: any) {
        const tolerance = 1.0e-6; // Tingkat toleransi untuk membulatkan
        let numerator = 1;
        let denominator = 1;

        // Menghitung pembilang dan penyebut menggunakan rasio mendekati desimal
        while (Math.abs(numerator / denominator - decimal) > tolerance) {
            if (numerator / denominator < decimal) {
                numerator++;
            } else {
                denominator++;
            }
        }

        return `${numerator}/${denominator}`;
    }

    const { data, setData, patch, errors, reset, processing } = useForm({
        c1c2: versus.c1c2.comparison_value,
        c1c3: versus.c1c3.comparison_value,
        c1c4: versus.c1c4.comparison_value,
        c2c3: versus.c2c3.comparison_value,
        c4c2: versus.c4c2.comparison_value,
        c4c3: versus.c4c3.comparison_value,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        patch(route("pairwise-comparison.update"), {
            onSuccess: (res) => {},
            onError: (err) => {},
            preserveScroll: true,
            preserveState: true,
        });
    };

    const datas = {
        breadCrumb: [
            {
                label: "Home",
                link: "/dashboard",
            },
            {
                label: "Perbandingan Berpasangan",
                link: "/pairwise-comparison",
            },
        ],
    };

    return (
        <AuthenticatedLayout breadCrumb={datas.breadCrumb}>
            <Head title="Perbandingan Berpasangan" />

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ps-5 pe-5">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Perbandingan Berpasangan</CardTitle>
                        <CardDescription>
                            Pairwise comparison atau perbandingan berpasangan
                            adalah teknik untuk membandingkan dua item atau
                            kriteria secara langsung guna menentukan mana yang
                            lebih penting atau lebih besar pengaruhnya terhadap
                            tujuan tertentu. Dalam metode AHP (Analytic
                            Hierarchy Process), teknik ini digunakan untuk
                            menilai tingkat kepentingan atau prioritas relatif
                            dari beberapa kriteria atau alternatif.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Kriteria</TableHead>
                                    {criterias.map((data: any) => {
                                        return (
                                            <TableHead key={data.id}>
                                                {data.code}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {criterias.map((criterion: any, i: any) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <strong> {criterion.code} </strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>{criterion.name}</strong>
                                        </TableCell>
                                        {comparisons[i].map(
                                            (value: any, j: any) => (
                                                <TableCell key={j}>
                                                    {formatNumber(value)}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Ubah Perbandingan Berpasangan</CardTitle>
                        <CardDescription>
                            1: sama pentingnya 3: sedikit lebih penting 5: lebih
                            penting 7: jauh lebih penting 9: sangat jauh lebih
                            penting
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="full_name"
                                    className="text-right"
                                >
                                    C1 vs C2
                                </Label>
                                <Input
                                    value={data.c1c2}
                                    onChange={(e) =>
                                        setData("c1c2", e.target.value)
                                    }
                                    id="c1c2"
                                    placeholder="..."
                                    className="col-span-3"
                                />
                                <InputError className="col-span-2 text-right" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="c1c3" className="text-right">
                                    C1 vs C3
                                </Label>
                                <Input
                                    id="c1c3"
                                    value={data.c1c3}
                                    onChange={(e) =>
                                        setData("c1c3", e.target.value)
                                    }
                                    placeholder="..."
                                    className="col-span-3"
                                />
                                <InputError className="col-span-2 text-right" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="c1c4" className="text-right">
                                    C1 vs C4
                                </Label>
                                <Input
                                    id="c1c4"
                                    value={data.c1c4}
                                    onChange={(e) =>
                                        setData("c1c4", e.target.value)
                                    }
                                    placeholder="..."
                                    className="col-span-3"
                                />
                                <InputError className="col-span-2 text-right" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="full_name"
                                    className="text-right"
                                >
                                    C2 vs C3
                                </Label>
                                <Input
                                    value={data.c2c3}
                                    onChange={(e) =>
                                        setData("c2c3", e.target.value)
                                    }
                                    id="full_name"
                                    placeholder="..."
                                    className="col-span-3"
                                />
                                <InputError className="col-span-2 text-right" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="full_name"
                                    className="text-right"
                                >
                                    C4 vs C2
                                </Label>
                                <Input
                                    value={data.c4c2}
                                    onChange={(e) =>
                                        setData("c4c2", e.target.value)
                                    }
                                    id="full_name"
                                    placeholder="..."
                                    className="col-span-3"
                                />
                                <InputError className="col-span-2 text-right" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="full_name"
                                    className="text-right"
                                >
                                    C4 vs C3
                                </Label>
                                <Input
                                    value={data.c4c3}
                                    onChange={(e) =>
                                        setData("c4c3", e.target.value)
                                    }
                                    id="full_name"
                                    placeholder="..."
                                    className="col-span-3"
                                />
                                <InputError className="col-span-2 text-right" />
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
