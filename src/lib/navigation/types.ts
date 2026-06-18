import type { IconName } from "./icon-registry";


export type MenuItem = {
    title: string;
    url: string;
    icon?: IconName;
    permission: string;
    items?: MenuItem[];
};