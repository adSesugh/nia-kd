'use client'

import SearhbarWithIcon from '@/components/searhbar-with-icon'
import SelectFilter from '@/components/select-filter'
import { RootState } from '@/features/store'
import { Payment, useGetMemberPaymentsLazyQuery, useGetPaymentsLazyQuery } from '@/graphql/__generated__/graphql'
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { DotsThree } from '@phosphor-icons/react'
import { Form, Formik } from 'formik'
import { SearchNormal } from 'iconsax-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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

const TransactionList = () => {
  const [index, setIndex] = useState<number>(0)
  const [payments, setPayments] = useState<any>()
  const [paymentsHolder, setPaymentsHolder] = useState<any>([])
  const user = useSelector((state:RootState) => state.auth.userData.user)
  const [getPayments, {loading, error}] = useGetMemberPaymentsLazyQuery({
    fetchPolicy: 'no-cache',
    variables: {
      memberId: user?.member?.id
    }
  })

  const loadingState = loading || payments === 0 ? "loading" : "idle";

  useEffect(()=> {
    document.title = 'Transactions | NIA-Kd'
  }, [])

  useEffect(()=>{
      ;(async () => {
          const res = await getPayments()
          setPayments(res.data?.getPayments)
          setPaymentsHolder(res.data?.getPayments)
      })()
  }, [getPayments])

  const renderCell = React.useCallback((payment: Payment, columnKey: React.Key, index: number) => {
      const cellValue = payment[columnKey as keyof Payment];
      
  
      switch (columnKey) {
          case "id":
              setIndex(cur => cur + 1)
              return <span>{index}</span>;
          case "paymentRef":
              return (
                  <div>{payment?.paymentRef}</div>
              )
          case "description":
              return (
                  <div className='flex flex-wrap'>{payment?.description}</div>
              )
          case "paymentDate":
              return (
                  <div>{moment(payment.createdAt).format("MMM D @ h:mm A")}</div>
              )
          case "amount":
              return (
                  <div>{'\u20a6'}{Intl.NumberFormat().format(payment?.amount)}</div>
              )
          case "status":
              return (
                  <Chip className="capitalize" color={payment?.status === 'Successful' ? 'success' : 'default'} size="sm" variant="flat">
                      <span className='text-[#0A7535]'>{cellValue}</span>
                  </Chip>
              );
          case "actions":
              return (
                <div className="flex justify-end items-center gap-2">
                  <DotsThree size={24} color='#5C4D58' />
                </div>
              );
          default:
              return cellValue;
      }
  }, []);

  const searchTransactions = (query: string) => {
    if(query.length === 0) {
      setPayments(paymentsHolder)
    } else {
      const filteredEvents = payments?.filter((payment: Payment) => {
        return payment?.description?.toLowerCase().includes(query) || payment?.paymentRef?.toLowerCase().includes(query)
      }) 
      setPayments(filteredEvents)
    }
  }
  
  return (
    <div className='sm:px-12 xs:px-6 w-full h-full overflow-y-auto'>
      <div>
        <h1 className='text-2xl font-semibold'>Transactions</h1>
      </div>
      <div className='pt-6 pb-4'>
        <div className='flex-1 items-center h-full w-1/3 mt-1'>
          <div className='relative rounded-md shadow-sm'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchNormal variant='Outline' size={20} color='gray' />
            </div>
            <input 
              name='query'
              placeholder='Search transactions'
              type='search'
              className={`pr-3 pl-10 rounded-none h-12 block w-full border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
              onChange={(e) => searchTransactions(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Table aria-label="">
          <TableHeader>
              <TableColumn key="id">S/N</TableColumn>
              <TableColumn key="paymentRef">Ref</TableColumn>
              <TableColumn key="description">Description</TableColumn>
              <TableColumn key="amount">Amount</TableColumn>
              <TableColumn key="paymentDate">Payment date</TableColumn>
              <TableColumn key="status">Status</TableColumn>
              <TableColumn key={'actions'}>.</TableColumn>
          </TableHeader>
          <TableBody
              items={payments ?? []}
              loadingContent={<Spinner color='default' />}
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

export default TransactionList