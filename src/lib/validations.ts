import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    regId: Yup.string().required('Membership ID is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().email()
});


export const EventSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    description: Yup.string().required('Event description is required'),
    cpdpPoint: Yup.number().min(0),
    type: Yup.string().required('Meeting mode is required'),
    link: Yup.string().nullable(),
    address: Yup.string().nullable(),
    starts_at: Yup.date().required('Start date is required'),
    starts_time: Yup.string().required('Start time is required'),
    ends_at: Yup.date().required('End date is required'),
    ends_time: Yup.string().required('End time is required'),
    paymentType: Yup.string().required('Event Type is required'),
    amount: Yup.number().nullable().default(0),
    tickets: Yup.number().min(0),
    isInfinity: Yup.boolean().default(false),
    coverPhoto: Yup.string().required('Cover photo is required'),
    formTitle: Yup.string().required('Form title is required'),
    instructions: Yup.string().nullable(),
    message: Yup.string().nullable(),
    hasCertificate: Yup.boolean().default(false),
    sendTag: Yup.boolean().default(false)
});

export const PasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(6, 'Invalid password'),
});