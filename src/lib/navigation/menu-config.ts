import { MenuItem } from "./types";

export const MENU_CONFIG: MenuItem[] = [
    {
        title: "Сотрудники",
        url: "/employees",
        icon: "users",
        permission: "d6ec18d4-697f-4684-86b5-1f21cbf3bcaa",
        items: [
            {
                title: "Добавить сотрудника",
                url: "/employees/add",
                icon: "adduser"
            },
            {
                title: "Изменить данные сотрудника",
                url: "/employees/edit",
                icon: "edituser",
                permission: "37648726-e41c-4943-b9b8-42f409f5d68a"
            }
        ]
    }
]