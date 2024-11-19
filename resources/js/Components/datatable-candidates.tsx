"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    Download,
    Import,
    MoreHorizontal,
    Plus,
    Upload,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import moment from "moment";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { router } from "@inertiajs/react";

export type Users = {
    id: string;
    full_name: string;
    user: {
        level: string;
    };
    jumlah_prestasi_akademik: number;
    jumlah_prestasi_non_akademik: number;
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    created_at: string;
    updated_at: string;
};

export function DataTableCandidates({ data }: { data: Users[] }) {
    const [rowsSelected, setRowsSelected] = React.useState([]);
    const convertPeringkatToValue = (peringkat: number) => {
        if (peringkat == 1) {
            return 100;
        }
        if (peringkat == 2) {
            return 80;
        }
        if (peringkat == 3) {
            return 60;
        }
        if (peringkat == 4) {
            return 40;
        }
        if (peringkat == 5) {
            return 20;
        }
        if (peringkat > 5) {
            return 0;
        }
    };

    const columns: ColumnDef<Users>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    value={row.getValue("id")}
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);

                        setRowsSelected((prevSelected): any =>
                            prevSelected.includes(row.getValue("id"))
                                ? prevSelected.filter(
                                      (rowId) => rowId !== row.getValue("id")
                                  )
                                : [...prevSelected, row.getValue("id")]
                        );
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
            enableSorting: true,
        },
        {
            accessorKey: "full_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nama Lengkap
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="">{row.getValue("full_name")}</div>
            ),
        },

        {
            accessorKey: "c1",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        C1
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="">
                    {row.original.c1 > 5 ? "> 5" : row.original.c1} /{" "}
                    {convertPeringkatToValue(row.getValue("c1"))}
                </div>
            ),
        },
        {
            accessorKey: "c2",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        C2
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="">{row.getValue("c2")}</div>,
        },
        {
            accessorKey: "c3",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Prestasi Akademik (C3)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="">
                    Jml : {row.original.jumlah_prestasi_akademik}, Nilai :
                    {row.getValue("c3")}
                </div>
            ),
        },
        {
            accessorKey: "c4",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Prestasi Non Akademik (C4)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="">
                    {" "}
                    Jml : {row.original.jumlah_prestasi_non_akademik} , Nilai :
                    {row.getValue("c4")}
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Created At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="">
                    {moment(row.getValue("created_at")).format(
                        "DD MMM YYYY HH:mm:ss"
                    )}
                </div>
            ),
        },

        {
            id: "aksi",
            enableHiding: false,
            cell: ({ row }) => {
                const candidate = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    router.get(
                                        route("candidates.show", candidate.id)
                                    )
                                }
                            >
                                Rincian
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    router.get(
                                        route("candidates.edit", candidate.id)
                                    )
                                }
                            >
                                Mengedit
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem
                                onClick={() =>
                                    router.delete(
                                        route(
                                            "candidates.destroy",
                                            candidate.id
                                        )
                                    )
                                }
                            >
                                Menghapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 5,
    }); // Set pageSize to 5

    const table = useReactTable({
        data,
        columns,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: pagination,
        },
    });
    const [filterValue, setFilterValue] = React.useState("");
    const handleFilterChange = (event: any) => {
        const value = event.target.value;
        setFilterValue(value);
        table.setGlobalFilter(value); // Metode ini perlu ada di implementasi tabel
    };
    // Inside your DataTableDemo function
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Kandidat</CardTitle>
                <CardDescription>
                    Dalam konteks Analytic Hierarchy Process (AHP) untuk sistem
                    pendukung keputusan penerima beasiswa, "kandidat" atau
                    "calon penerima beasiswa" adalah individu yang memenuhi
                    kriteria awal sebagai penerima beasiswa. Mereka akan dinilai
                    berdasarkan sejumlah kriteria yang telah ditentukan, seperti
                    prestasi akademik, kondisi ekonomi, keterlibatan
                    ekstrakurikuler, dan kriteria relevan lainnya.
                </CardDescription>
            </CardHeader>

            <CardContent className="">
                <div className="flex items-center justify-between py-4">
                    <Input
                        placeholder="Search ...."
                        value={filterValue}
                        onChange={handleFilterChange}
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Menu Aksi
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    router.get(route("candidates.create"))
                                }
                            >
                                {" "}
                                <Plus />
                                <span>Tambah</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {" "}
                                <Upload />
                                <span>Import</span>
                                <DropdownMenuShortcut>⇧⌘I</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {" "}
                                <Download />
                                <span>Export</span>
                                <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
