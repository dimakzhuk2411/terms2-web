import { Roles } from "../roles";
import { MenuItem } from "./types";

export const MENU_CONFIG: MenuItem[] = [
    {
        title: "Сотрудники",
        url: "/employees",
        icon: "users",
        permission: Roles.Employees,
        items: [
            {
                title: "Добавить сотрудника",
                url: "/employees/new",
                icon: "adduser",
                permission: Roles.EmployeesEdit
            }
        ]
    },
    {
        title: "СКЗИ",
        url: "/skzi",
        icon: "skzi",
        permission: Roles.SKZI
    }
]