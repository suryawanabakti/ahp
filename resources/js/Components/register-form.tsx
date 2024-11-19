import { Link, useForm } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { FormEventHandler } from "react";
import InputError from "./InputError";

export function RegisterForm({}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        pdf_raport: null,
        pdf_skhu: null,
        npm: "",
        jurusan: "",
        email: "",
        password: "",
        password_confirmation: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Daftar</CardTitle>
                <CardDescription>
                    Masukkan data anda di bawah untuk masuk ke halaman utama
                    aplikasi.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="npm">NPM</Label>
                        <Input
                            id="npm"
                            type="text"
                            placeholder="Masukkan npm..."
                            required
                            value={data.npm}
                            onChange={(e) => setData("npm", e.target.value)}
                        />
                        <InputError message={errors.npm} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nama lengkap..."
                            required
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jurusan">Jurusan</Label>
                        <Input
                            id="jurusan"
                            type="text"
                            placeholder="Masukkan jurusan..."
                            required
                            value={data.jurusan}
                            onChange={(e) => setData("jurusan", e.target.value)}
                        />
                        <InputError message={errors.jurusan} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="pdf_raport">PDF Raport</Label>
                        <Input
                            id="pdf_raport"
                            type="file"
                            required
                            onChange={(e: any) =>
                                setData("pdf_raport", e.target.files[0])
                            }
                        />
                        <InputError
                            message={errors.pdf_raport}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="pdf_skhu">PDF Skhu</Label>
                        <Input
                            id="pdf_skhu"
                            type="file"
                            required
                            onChange={(e: any) =>
                                setData("pdf_skhu", e.target.files[0])
                            }
                        />
                        <InputError
                            message={errors.pdf_skhu}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">
                                Password Konfirmasi
                            </Label>
                        </div>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={submit}
                        disabled={processing}
                    >
                        Register
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="underline">
                        Login disini.
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
