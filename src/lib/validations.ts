import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    regId: Yup.string().required('Membership ID is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().email()
});

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    checkMember: Yup.string().required('This field is required'),
    membershipId: Yup.string().when('checkMember', (checkValues, schema) => {
        if (checkValues.includes('yes')) {
            return schema.required('This field is required for registered member');
        }
        return schema.nullable(); 
    }),
    membershipType: Yup.string().nullable(),
    workplace: Yup.string().required('Workplace is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be 6 or more characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must match'),
    membershipSlip: Yup.string().when('checkMember', (checkValues, schema) => {
        if (checkValues.includes('no')) {
            return schema.required('This field is required for non-registered member');
        }
        return schema.nullable(); 
    }),
});

export const EventSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    theme: Yup.string().required('Event theme is required'),
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

export const adsSchema = Yup.object().shape({
    name: Yup.string().required(),
    duration: Yup.number().required(),
    start_date: Yup.date().required(),
    start_time: Yup.string().required(),
    // webbanner: Yup.mixed()
    // .required('Image is required')
    // .test(
    //   '.png',
    //   'Invalid image dimensions. Please upload an image with 930 x 180 pixels.',
    //   (value: any) =>
    //     new Promise((resolve) => {
    //       if (!value) {
    //         resolve(false);
    //         return;
    //       }
    //       const img = new Image();
    //       img.onload = () => {
    //         resolve(img.width <= 935 && img.height <= 185);
    //       };
    //       img.onerror = () => {
    //         resolve(false);
    //       };
    //       //img.src = URL?.createObjectURL(value);
    //     })
    // ),
    // mobilebanner: Yup.mixed()
    // .required('Image is required')
    // .test(
    //   '.png',
    //   'Invalid image dimensions. Please upload an image with 320 x 100 pixels.',
    //   (value: any) =>
    //     new Promise((resolve) => {
    //       if (!value) {
    //         resolve(false);
    //         return;
    //       }
    //       const img = new Image();
    //       img.onload = () => {
    //         resolve(img.width <= 325 && img.height <= 105);
    //       };
    //       img.onerror = () => {
    //         resolve(false);
    //       };
    //       //img.src = URL?.createObjectURL(value);
    //     })
    // ),
    link: Yup.string().nullable()
})