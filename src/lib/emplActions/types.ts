
export type Permission =
    | "d6ec18d4-697f-4684-86b5-1f21cbf3bcaa"
    | "37648726-e41c-4943-b9b8-42f409f5d68a"
    | "69f30e57-2570-415a-8f07-5c4a6a445903";

export type Action = {
    key: string,
    label?: string,
    permission: Permission,
    onClick: () => void,
};