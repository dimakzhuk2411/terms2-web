'use client'

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { CheckIcon } from "@phosphor-icons/react";
import { Textarea } from "../ui/textarea";
import { PhoneInput } from "../ui/phone-input";

export function NewEmployeeComponent({ canEdit }: { canEdit: boolean }) {

    const [moduleEl, setModuleEl] = useState<HTMLElement | null>(null);
    const [ap2, setAp2] = useState<HTMLElement | null>(null);

    const [mobilePhone, setMobilePhone] = useState("")
    const [corporatePhone, setCorporatePhone] = useState("")

    useEffect(() => {
        setModuleEl(document.getElementById("module-name"));
        setAp2(document.getElementById("action-pack-2"));
    }, []);

    return (
        <div>
            {moduleEl &&
                createPortal(
                    <p className="select-none">Добавление нового сотрудника</p>,
                    moduleEl
                )
            }
            <div className="min-h-0 h-full">
                {(ap2 && canEdit) &&
                    createPortal(
                        <div className="flex flex-1 items-center justify-end">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size={"icon-lg"}>
                                        <CheckIcon />
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
                <Card className="">
                    <CardHeader>
                        <CardTitle>Основные данные</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col h-full w-full gap-y-2">
                            <FieldSet className="justify-self-center mx-[25%]">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="fullname">Ф.И.О.</FieldLabel>
                                        <Input id="fullname" />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <div className="flex h-full w-full gap-x-2">
                                <div className="w-full">
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="position">Должность</FieldLabel>
                                                <Input id="position" />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="department">Отдел</FieldLabel>
                                                <Textarea id="department" />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="mobile">Мобильный телефон</FieldLabel>
                                                <PhoneInput id="mobile" typeMode="mobile" value={mobilePhone} onChange={setMobilePhone}/>
                                            </Field>
                                        </FieldGroup>
                                    </FieldSet>
                                </div>
                                <div className="w-full">
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="adress">Адрес здания</FieldLabel>
                                                <Input id="adress" />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="management">Управление</FieldLabel>
                                                <Textarea id="management" />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="corporate">Городской телефон</FieldLabel>
                                                <PhoneInput id="corporate" typeMode="landline" value={corporatePhone} onChange={setCorporatePhone}/>
                                            </Field>
                                        </FieldGroup>
                                    </FieldSet>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}