import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    candidate,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
    candidate?: any;
}) {
    console.log(candidate);
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            pdf_raport: candidate?.pdf_raport,
            pdf_skhu: candidate?.pdf_skhu,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="pdf_raport" value="PDF Raport" />

                    <TextInput
                        id="pdf_raport"
                        type="file"
                        className="mt-1 block w-full mb-3"
                        onChange={(e: any) =>
                            setData("pdf_raport", e.target.files[0])
                        }
                        required
                        isFocused
                        autoComplete="pdf_raport"
                    />
                    {candidate.pdf_raport && (
                        <a
                            href={`/storage/${candidate.pdf_raport}`}
                            className="mt-5"
                        >
                            Download
                        </a>
                    )}
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="pdf_skhu" value="PDF SKHU" />

                    <TextInput
                        id="pdf_skhu"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e: any) =>
                            setData("pdf_skhu", e.target.files[0])
                        }
                        required
                        isFocused
                        autoComplete="pdf_skhu"
                    />
                    {candidate.pdf_skhu && (
                        <a
                            href={`/storage/${candidate.pdf_skhu}`}
                            className="mt-5"
                        >
                            Download
                        </a>
                    )}

                    <InputError className="mt-2" message={errors.name} />
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
