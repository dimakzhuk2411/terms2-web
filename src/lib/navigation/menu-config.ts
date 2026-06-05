import { MenuItem } from "./types";

export const MENU_CONFIG: MenuItem[] = [
    {
        title: "Сотрудники",
        url: "/employees",
        icon: "users",
        items: [
            {
                title: "Добавить сотрудника",
                url: "/employees/add",
                icon: "adduser"
            },
            {
                title: "Изменить данные сотрудника",
                url: "/employees/edit",
                icon: "edituser"
            }
        ]
    }
]