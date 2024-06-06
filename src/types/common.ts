import { ReactNode } from "react"

export type LayoutProps = {
    children: ReactNode
}

export type TextFieldProps = {
    name: string
    placeholder: string
    type?: string
}

export type TeamCardProps = {
    imageUrl: string
    name: string
    designation: string
    social_media: {
        twitter: string
        linkedin: string
    }
}

export type IconProps = {
    width: number
    height: number
    stroke: string
    fill?: string
}