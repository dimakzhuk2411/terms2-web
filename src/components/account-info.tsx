'use client'
import { useState, useEffect } from "react"
import type { Account } from "@/types/Account";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AccountInfo() {

    const [userData, setUserData] = useState<Account>();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

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

    return (
        <div className="h-full w-full">
            <div className="flex gap-x-2 w-full justify-stretch">
                <Card>
                    <CardHeader>
                        <CardTitle>Основные данные</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="employee">Сотрудник</FieldLabel>
                                    <Input id="employee" value={userData?.user.employee.fullname}/>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Сведения о сертификате</CardTitle>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>


        </div>
    )
}