import { DataTableRankings } from "@/Components/datatable-rankings";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function PairwiseComparison({ criterias, comparisons }: any) {
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

    const data = {
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
        <AuthenticatedLayout breadCrumb={data.breadCrumb}>
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
                                            <TableHead>{data.code}</TableHead>
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
            </div>
        </AuthenticatedLayout>
    );
}
