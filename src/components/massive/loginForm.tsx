'use client'

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../ui/card"
import { Field, FieldGroup, FieldLegend } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DoorIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { Alert, AlertAction, AlertTitle } from "../ui/alert"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        
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
            setErrorText(data.error);
            setShowError(true);
            return
        }

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
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Field>
                </FieldGroup>
            </CardContent>
            <CardFooter className="flex flex-col w-full">
                <Button className="w-full" onClick={handleLogin}><DoorIcon />Войти</Button>
            </CardFooter>
        </Card>
    )
}