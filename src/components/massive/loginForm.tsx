'use client'

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../ui/card"
import { Field, FieldGroup, FieldLegend } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DoorIcon, EyeClosedIcon, EyeIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { Alert, AlertTitle } from "../ui/alert"
import { useRouter } from "next/navigation"
import { Spinner } from "../ui/spinner"
import { Toggle } from "../ui/toggle"

export default function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setShowError(false);
        setErrorText("");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login,
                password
            }),
            credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
            setLoading(false);
            setErrorText(data.error);
            setShowError(true);
            return
        }

        setLoading(false);

        router.push("/");
    }

    const handleCloseError = () => {
        setShowError(false);
        setErrorText("");
    }

    return (
        <Card className="w-95">
            <CardHeader>
                <CardTitle className="text-xl select-none">Вход в программу</CardTitle>
                <CardDescription className="select-none">Для продолжения работы введите Ваш логин и пароль</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
                {showError && (
                    <Alert variant={"destructive"} className="flex items-center justify-between">
                        <div className="flex gap-x-2 items-center">
                            <WarningCircleIcon className="text-lg" />
                            <AlertTitle>{errorText}</AlertTitle>
                        </div>
                        <Button variant={"ghost"} size={"icon"} onClick={handleCloseError}>
                            <XIcon />
                        </Button>
                    </Alert>
                )}
                <FieldGroup>
                    <Field>
                        <FieldLegend className="select-none">Логин</FieldLegend>
                        <Input type="email" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </Field>
                    <Field>
                        <FieldLegend className="select-none">Пароль</FieldLegend>
                        <div className="relative w-full">
                            <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
                            {/* <Toggle pressed={showPassword} onPressedChange={setShowPassword} className="absolute right-1 top-1/2 -translate-y-1/2">
                                {showPassword ? (
                                    <div>
                                        <EyeIcon />
                                    </div>
                                ) : (
                                    <div>
                                        <EyeClosedIcon />
                                    </div>
                                )}
                            </Toggle> */}
                            <Button variant={"link"} size={"icon"} onClick={() => {setShowPassword(!showPassword)}} className="absolute right-1 cursor-pointer hover:scale-125 active:scale-95 transition text-(--foreground)">
                                {showPassword ? (
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
                </FieldGroup>
            </CardContent>
            <CardFooter className="flex flex-col w-full">
                <Button className="w-full" onClick={handleLogin}>
                    {loading ? (
                        <div className="flex flex-row gap-x-2">
                            <Spinner />
                            Входим
                        </div>
                    ) : (
                        <div className="flex flex-row gap-x-2">
                            <DoorIcon />
                            Войти
                        </div>
                    )}

                </Button>
            </CardFooter>
        </Card>
    )
}