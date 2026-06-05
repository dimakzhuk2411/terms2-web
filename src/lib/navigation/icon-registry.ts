'use client'

import { UsersThreeIcon, UserPlusIcon, UserGearIcon } from "@phosphor-icons/react"

export const ICON_REGISTRY = {
    users: UsersThreeIcon,
    adduser: UserPlusIcon,
    edituser: UserGearIcon
} as const;

export type IconName = keyof typeof ICON_REGISTRY;