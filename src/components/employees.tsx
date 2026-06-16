'use client'

import { Employee } from "@/types/Employee";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { UserListIcon } from "@phosphor-icons/react";

export function EmployeesComponent() {

    const [employeesList, setEmployeesList] = useState<Employee[] | null>(null);
    const [moduleEl, setModuleEl] = useState<HTMLElement | null>(null);
    const [ap1, setAp1] = useState<HTMLElement | null>(null);
    const [ap2, setAp2] = useState<HTMLElement | null>(null);



    const loadData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/employees`, {
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            console.log(data);

            setEmployeesList(data);
        }
        catch (err: any) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setModuleEl(document.getElementById("module-name"));
        setAp1(document.getElementById("action-pack-1"));
        setAp2(document.getElementById("action-pack-2"));
    }, []);

    return (
        <div className="min-h-0 h-full">
            {moduleEl &&
                createPortal(
                    <p className="select-none">Сотрудники</p>,
                    moduleEl
                )
            }
            <div className="min-h-0 h-full">
                {ap1 &&
                    createPortal(
                        <Input placeholder="Поиск..." />,
                        ap1
                    )
                }
                {employeesList ? (
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[24%] font-bold">Ф.И.О.</TableHead>
                                <TableHead className="w-[18%] font-bold">Должность</TableHead>
                                <TableHead className="w-[21%] font-bold">Отдел</TableHead>
                                <TableHead className="w-[21%] font-bold">Управление</TableHead>
                                <TableHead className="w-[16%] font-bold">Телефон</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeesList?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="whitespace-normal break-words w-[24%]">{item.fullname}</TableCell>
                                    <TableCell className="whitespace-normal break-words w-[18%]">{item.position.clientName}</TableCell>
                                    <TableCell className="whitespace-normal break-words w-[21%]">{item.department.clientName}</TableCell>
                                    <TableCell className="whitespace-normal break-words w-[21%]">{item.department.management.clientName}</TableCell>
                                    <TableCell className="w-[16%]">
                                        <div className="flex flex-col whitespace-normal break-words">
                                            <span>Корп.: {item.corporate ? item.corporate : "не добавлен"}</span>
                                            <span>Сот.: {item.mobile ? item.mobile : "не добавлен"}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant={"icon"}>
                                <UserListIcon/>
                            </EmptyMedia>
                            <EmptyTitle className="select-none">Нет сотрудников</EmptyTitle>
                            <EmptyDescription className="select-none">Данные сотрудников не найдены или не созданы. Попробуйте перезагрузить страницу или создать сотрудника, нажав на кнопку "Создать сотрудника".</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </div>
        </div>
    )
}