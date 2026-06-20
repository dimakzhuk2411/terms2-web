'use client'

import { EmployeeFull } from "@/types/Employee";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { createPortal } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { SealWarningIcon } from "@phosphor-icons/react";
import { PhoneInput } from "../ui/phone-input";

export function ViewEmployee({ emplID }: { emplID: string }) {
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [emplData, setEmplData] = useState<EmployeeFull>();
    const [moduleEl, setModuleEl] = useState<HTMLElement | null>(null);

    const loadData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/employees/getById`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id: emplID
                })
            });

            if (!res.ok) {
                const error = await res.json();
                setError(error.error);
                setShowError(true);
            }

            const data = await res.json();

            console.log(data);
            setEmplData(data);
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setModuleEl(document.getElementById("module-name"));
    }, []);

    return (
        <div>
            {showError ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant={"icon"}>
                            <SealWarningIcon />
                        </EmptyMedia>
                        <EmptyTitle>Не удалось загрузить данные</EmptyTitle>
                        <EmptyDescription>Попробуйте снова, если ошибка повторяется обратитесь к администратору!</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div>
                    {moduleEl &&
                        createPortal(
                            <p className="select-none">Сотрудник - {emplData?.fullname}</p>,
                            moduleEl
                        )
                    }
                    <Card>
                        <CardHeader>
                            <CardTitle>Основные данные</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col h-full w-full gap-y-2">
                                <FieldSet className="justify-self-center mx-[25%]">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="fullname">Ф.И.О.</FieldLabel>
                                            <Input id="fullname" disabled defaultValue={emplData?.fullname} className="select-none" />
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <div className="flex w-full h-full gap-x-2">
                                    <div className="w-full">
                                        <FieldSet>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor="position">Должность</FieldLabel>
                                                    <Input id="position" disabled defaultValue={emplData?.position.clientName} />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="department">Отдел</FieldLabel>
                                                    <Textarea id="department" disabled defaultValue={emplData?.department.clientName} className="select-none" />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="mobile">Сотовый телефон</FieldLabel>
                                                    <PhoneInput id="mobile" disabled defaultValue={emplData?.mobile} />
                                                </Field>
                                            </FieldGroup>
                                        </FieldSet>
                                    </div>
                                    <div className="w-full">
                                        <FieldSet>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel htmlFor="address">Адрес</FieldLabel>
                                                    <Input id="address" disabled />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="management">Управление</FieldLabel>
                                                    <Textarea id="management" disabled defaultValue={emplData?.department.management.clientName} className="select-none" />
                                                </Field>
                                                <Field>
                                                    <FieldLabel htmlFor="corporate">Корпоративный телефон</FieldLabel>
                                                    <PhoneInput
                                                        id="corporate" 
                                                        typeMode="landline" 
                                                        disabled 
                                                        defaultValue={emplData?.corporate} 
                                                    />
                                                </Field>
                                            </FieldGroup>
                                        </FieldSet>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

        </div>
    )
}