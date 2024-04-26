import { ReactNode } from "react"

export type LayoutProps = {
    children: ReactNode
}

export type TextFieldProps = {
    name: string
    placeholder: string
    type?: string
}