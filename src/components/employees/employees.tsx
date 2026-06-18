'use client'

import { Employee } from "@/types/Employee";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { BuildingIcon, DeviceMobileCameraIcon, UserListIcon, UserPlusIcon } from "@phosphor-icons/react";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function EmployeesComponent({canEdit} : {canEdit: boolean}) {

    const [employeesList, setEmployeesList] = useState<Employee[] | null>(null);
    const [moduleEl, setModuleEl] = useState<HTMLElement | null>(null);
    const [ap1, setAp1] = useState<HTMLElement | null>(null);
    const [ap2, setAp2] = useState<HTMLElement | null>(null);
    const router = useRouter();



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
                {(ap2 && canEdit) && 
                    createPortal(
                        <div className="flex flex-1 items-center justify-end">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size={"icon-lg"}>
                                        <UserPlusIcon/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Добавить сотрудника
                                </TooltipContent>
                            </Tooltip>
                        </div>,
                        ap2
                    )
                }
                {employeesList ? (
                    <ScrollArea className="h-full w-full">
                        <Table className="table-fixed w-full select-none">
                            <TableHeader className="sticky z-10 top-0 bg-(--sidebar) text-sm">
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
                                    <TableRow key={item.id} onDoubleClick={() => {router.push(`/employees/${item.id}`)}} >
                                        <TableCell className="whitespace-normal break-words w-[24%]">{item.fullname}</TableCell>
                                        <TableCell className="whitespace-normal break-words w-[18%]">{item.position.clientName}</TableCell>
                                        <TableCell className="whitespace-normal break-words w-[21%]">{item.department.clientName}</TableCell>
                                        <TableCell className="whitespace-normal break-words w-[21%]">{item.department.management.clientName}</TableCell>
                                        <TableCell className="w-[16%]">
                                            <div className="flex flex-col whitespace-normal break-words gap-y-2">
                                                <span className="flex gap-x-2 items-center"><div className="flex items-center justify-center h-5 w-5 bg-(--primary)">
                                                        <BuildingIcon weight="duotone" className="!text-white"/>
                                                      </div> {item.corporate ? item.corporate : "не добавлен"}</span>
                                                <span className="flex gap-x-2 items-center"><div className="flex items-center justify-center h-5 w-5 bg-(--primary)">
                                                        <DeviceMobileCameraIcon weight="duotone" className="!text-white"/>
                                                      </div> {item.mobile ? item.mobile : "не добавлен"}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant={"icon"}>
                                <UserListIcon />
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