'use client'

import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import SearhbarWithIcon from '../searhbar-with-icon'
import SelectFilter from '../select-filter'
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Payment, useGetPaymentsLazyQuery } from '@/graphql/__generated__/graphql'
import moment from 'moment'

const years = [
    {
        id: 2023,
        name: "2023"
    },
    {
        id: 2024,
        name: '2024'
    }
]

const DuePayments = () => {
    const [payments, setPayments] = useState<any>()
    const [index, setIndex] = useState<number>(0)
    const [getPayments, {loading, error}] = useGetPaymentsLazyQuery({fetchPolicy: 'no-cache'})

    const loadingState = loading || payments === 0 ? "loading" : "idle";

    useEffect(()=>{
        ;(async () => {
            const res = await getPayments()
            setPayments(res.data?.getPayments)
        })()
    }, [getPayments])

    const renderCell = React.useCallback((payment: Payment, columnKey: React.Key, index: number) => {
        const cellValue = payment[columnKey as keyof Payment];
        
    
        switch (columnKey) {
            case "id":
                setIndex(cur => cur + 1)
                return <span>{index}</span>;
            case "name":
                return (
                    <div>{payment?.member?.firstName} {payment?.member?.lastName}</div>
                )
            case "membershipType":
                return (
                    <div>{payment?.member?.membershipType}</div>
                )
            case "year":
                return (
                    <div>{moment(payment.due?.startsAt).format("Y")}</div>
                )
            case "paymentDate":
                return (
                    <div>{moment(payment.createdAt).format("MMM D | h:ss A")}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={payment.status === 'Successful' ? 'success' : 'default'} size="sm" variant="flat">
                        <span className='text-[#0A7535]'>{cellValue}</span>
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <button className='px-4 py-2 rounded-xl border text-center'>Receipt</button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    console.log(payments)
    
    return (
        <div>
            <div className='pt-6 pb-4'>
                <Formik
                    onSubmit={() => console.log('here...')}
                    initialValues={{query: ''}}
                >
                    {({values, touched, errors, handleBlur, handleChange, handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className='flex sm:flex-row xs:flex-col sm:space-x-3 xs:space-x-0 xs:gap-3'>
                            <SearhbarWithIcon 
                                name='query'
                                placeholder='Search by name'
                                className={`flex sm:w-96 xs:w-full ${errors.query && touched.query ? 'ring-red-500': ''} pr-10`}
                            />
                            <SelectFilter nullValue='Year' name='membershipType' data={years} className='flex' />
                        </Form>
                    )}
                </Formik>
            </div>
            <Table aria-label="">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="membershipType">Member type</TableColumn>
                    <TableColumn key="amount">Amount</TableColumn>
                    <TableColumn key="year">Year</TableColumn>
                    <TableColumn key="paymentDate">Payment date</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
                    <TableColumn key={'actions'}>.</TableColumn>
                </TableHeader>
                <TableBody
                    items={payments ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={"No dues to display."}
                >
                    {(item: any) => (
                        <TableRow key={item?.id} className='border-b last:border-b-0'>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DuePayments