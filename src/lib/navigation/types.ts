import type { IconName } from "./icon-registry";

export type Permission = 
| "";

export type MenuItem = {
    title: string;
    url: string;
    icon?: IconName;
    permissions?: Permission[];
    items?: MenuItem[];
};