'use client'

import { UsersThreeIcon, UserPlusIcon, UserGearIcon, ShieldChevronIcon } from "@phosphor-icons/react"

export const ICON_REGISTRY = {
    users: UsersThreeIcon,
    adduser: UserPlusIcon,
    edituser: UserGearIcon,
    skzi: ShieldChevronIcon
} as const;

export type IconName = keyof typeof ICON_REGISTRY;