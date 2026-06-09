'use client'
import { useState, useEffect } from "react"
import type { Account } from "@/types/Account";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { EyeIcon, EyeClosedIcon, WarningIcon, InfoIcon, QuestionIcon } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Dropzone } from "./dropzone";

export function AccountInfo() {

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/account`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const account = await response.json();
                setUserData(account);
                console.log(account);
            }
            catch (err: any) {
                setError(err.message);
                setShowError(true);
            }
        }

        loadData();
    }, []);

    const [userData, setUserData] = useState<Account>();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassAlert, setShowPassAlert] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newCert, setNewCert] = useState<File[]>([]);

    const isMismatch =
        confirmPassword.length > 0 &&
        newPassword !== confirmPassword;

    const rules = {
        length: newPassword.length >= 12,
        upper: /[A-Z]/.test(newPassword),
        lower: /[a-z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        special: /[^A-Za-z0-9]/.test(newPassword),
    };

    const changePassword = async () => {

    }

    return (
        <div className="h-full w-full">
            <div className="flex flex-col gap-y-2 w-full h-full">
                <div className="flex gap-x-2 w-full justify-stretch h-full">
                    <Card className="w-full">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="select-none font-bold">Основные данные</CardTitle>
                            <Tooltip>
                                <TooltipTrigger>
                                    <QuestionIcon size={20} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Основные данные о пользователе можно изменить в модуле "Сотрудники" и только при наличии ролей Сотрудники, Сотрудники.Изменение.
                                </TooltipContent>
                            </Tooltip>

                        </CardHeader>
                        <CardContent>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="employee" className="select-none">Сотрудник</FieldLabel>
                                        <Input id="employee" defaultValue={userData?.user.employee.fullname} disabled />
                                    </Field>
                                    <Field>
                                        <FieldLabel className="select-none" htmlFor="email">Электронная почта</FieldLabel>
                                        <Input id="email" defaultValue={userData?.user.email} disabled />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="position">Должность</FieldLabel>
                                        <Input id="position" defaultValue={userData?.user.employee.position.clientName} disabled />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="department">Отдел</FieldLabel>
                                        <Input id="department" defaultValue={userData?.user.employee.department.clientName} disabled />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="select-none font-bold">Сменить пароль</CardTitle>
                            <Tooltip>
                                <TooltipTrigger>
                                    <QuestionIcon size={20} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    При смене пароля соблюдайте правила парольной политики:
                                    <br />
                                    - Пароль должен быть длинной не менее 12 символов
                                    <br />
                                    - Пароль должен содержать хотябы один символ нижнего регистра латинского алфавита и хотябы один символ верхнего регистра латинского алфавита
                                    <br />
                                    - Пароль должен содержать хотябы одну арабскую цифру
                                    <br />
                                    - Пароль должен содержать хотябы один спец. символ
                                    <br />
                                    Например:    !    ?    @    #    %    *    -    +    &
                                </TooltipContent>
                            </Tooltip>

                        </CardHeader>
                        <CardContent>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="oldPassword">Текущий пароль</FieldLabel>
                                        <div id="oldPassword" className="relative w-full">
                                            <Input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />
                                            <Button variant={"link"} size={"icon"} onClick={() => { setShowCurrentPassword(!showCurrentPassword) }} className="absolute right-1 cursor-pointer hover:scale-125 active:scale-95 transition text-(--foreground)">
                                                {showNewPassword ? (
                                                    <div>
                                                        <EyeIcon />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <EyeClosedIcon />
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="newPass">Новый пароль</FieldLabel>
                                        <div id="newPass" className="relative w-full">
                                            <Input type={showNewPassword ? "text" : "password"} onClick={() => { setShowPassAlert(true) }} value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} aria-invalid={(!rules.length || !rules.lower || !rules.upper || !rules.number || !rules.special) && newPassword.length > 0} />
                                            <Button variant={"link"} size={"icon"} onClick={() => { setShowNewPassword(!showNewPassword) }} className="absolute right-1 cursor-pointer hover:scale-125 active:scale-95 transition text-(--foreground)">
                                                {showNewPassword ? (
                                                    <div>
                                                        <EyeIcon />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <EyeClosedIcon />
                                                    </div>
                                                )}
                                            </Button>
                                            {(!rules.length && newPassword.length > 0) &&
                                                <FieldError>Недостаточная длина пароля</FieldError>
                                            }
                                            {(!rules.lower && newPassword.length > 0) &&
                                                <FieldError>Нет маленьких латинских букв</FieldError>
                                            }
                                            {(!rules.upper && newPassword.length > 0) &&
                                                <FieldError>Нет больших латинских букв</FieldError>
                                            }
                                            {(!rules.number && newPassword.length > 0) &&
                                                <FieldError>Нет цифр</FieldError>
                                            }
                                            {(!rules.special && newPassword.length > 0) &&
                                                <FieldError>Нет спец. симфолов</FieldError>
                                            }
                                        </div>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirmNewPass">Повторите новый пароль</FieldLabel>
                                        <div id="confirmNewPass" className="relative w-full">
                                            <Input type={showConfirmPassword ? "test" : "password"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} aria-invalid={isMismatch} />
                                            <Button variant={"link"} size={"icon"} onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className="absolute right-1 cursor-pointer hover:scale-125 active:scale-95 transition text-(--foreground)">
                                                {showConfirmPassword ? (
                                                    <div>
                                                        <EyeIcon />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <EyeClosedIcon />
                                                    </div>
                                                )}
                                            </Button>
                                            {isMismatch &&
                                                <FieldError>Пароли не совпадают</FieldError>
                                            }
                                        </div>
                                    </Field>
                                    <Field>
                                        <Button>Изменить пароль</Button>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                        </CardContent>
                    </Card>
                </div>
                <Card className="h-full">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="select-none font-bold">Сменить сертификат</CardTitle>
                        <Tooltip>
                            <TooltipTrigger>
                                <QuestionIcon size={20} />
                            </TooltipTrigger>
                            <TooltipContent>
                                Данный сертификат используется как для авторизации (только при входе по сертификату), так и для подписания.
                                <br />
                                Если вход был выполнен с использованием логина и пароля, для подписания будет использоваться простая подпись.
                            </TooltipContent>
                        </Tooltip>
                    </CardHeader>
                    <CardContent>
                        <FieldSet>
                            <FieldGroup>
                                <div className="flex gap-x-4">
                                    <div className="flex flex-col gap-y-5 w-full">
                                        <Field>
                                            <FieldLabel htmlFor="thumbprint">Отпечаток сертификата</FieldLabel>
                                            <Input id="thumbprint" disabled />
                                        </Field>
                                        <div className="flex justify-between items-center gap-x-2">
                                            <Field>
                                                <FieldLabel htmlFor="validfrom">Годен с...</FieldLabel>
                                                <Input id="validfrom" disabled />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="validto">Годен до...</FieldLabel>
                                                <Input id="validto" disabled />
                                            </Field>
                                        </div>

                                    </div>
                                    <Separator orientation="vertical" />
                                    <div className="flex flex-col w-full gap-y-4">
                                        <Dropzone size={"sm"} maxFiles={8} extensions={["jpg", "jpeg", "png"]} files={newCert} onChange={(files) => {setNewCert(files)}}/>
                                        <Button>Сменить сертификат</Button>
                                    </div>
                                </div>


                                {/* <div className="flex justify-stretch gap-x-1">
                                    
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="chooseCert">Выбрать новый сертификат</FieldLabel>
                                    <div id="chooseCert" className="flex justify-stretch items-center gap-x-1">
                                        <Input type="file" />
                                        <Button>Сменить сертификат</Button>
                                    </div>
                                    <div className="border p-2 text-center cursor-pointer hover:bg-muted/50 transition">
                                        <Input
                                            type="file"
                                            className="hidden"
                                            id="file"
                                            onChange={(e) => console.log(e.target.files)}
                                        />

                                        <label htmlFor="file" className="cursor-pointer">
                                            <p className="text-sm font-medium">Перетащите файл или нажмите</p>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG, PDF до 10MB
                                            </p>
                                        </label>
                                    </div>
                                </Field> */}
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={showError} onOpenChange={setShowError}>
                <DialogContent showCloseButton={false} onInteractOutside={(e) => { e.preventDefault(); }} onEscapeKeyDown={(e) => { e.preventDefault(); }}>
                    <DialogHeader>
                        <DialogTitle className="select-none">Ошибка</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <p>{error}</p>
                    </div>
                    <DialogFooter>
                        <Button className="w-full">Ок</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}