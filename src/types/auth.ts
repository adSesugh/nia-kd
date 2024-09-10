export type LoginForm = {
    regId: string
    password: string
}

export type RegisterForm = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    membershipType: string
    membershipId: string
    workplace: string
    password: string
    confirmPassword: string
    checkMember?: string
    membershipSlip?: any
}

export type MemberForm = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    regId: string
    address: string
    password: string
    memberType?: string
    confirmPassword?: string
}