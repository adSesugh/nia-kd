'use client'

import { useAppSelector } from '@/features/hooks';
import { RootState } from '@/features/store';
import { Due, useGetMemberStatQuery, useGetMemberUnpaidDuesLazyQuery, usePostPaymentMutation } from '@/graphql/__generated__/graphql';
import { getTotalDaysInYear, getTotalDaysOfYear } from '@/lib/helpers';
import { Chip, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { CurrencyNgn } from '@phosphor-icons/react';
import { SearchNormal } from 'iconsax-react';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip as ToolkitChart, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import CustomSearch from '@/components/custom-select';
import { PaystackButton } from 'react-paystack';
import { HookConfig } from 'react-paystack/dist/types';
import { toast } from 'react-toastify';
import { usePostMultiPaymentMutation } from '@/graphql/__generated__/graphql';

ChartJS.register(ArcElement, ToolkitChart, Legend);

const dueStatuses = [
  {
    id: 'Pending',
    name: 'Pending'
  },
  {
      id: 'Overdue',
      name: 'Overdue'
  }
]

const DueScreen = () => {
  const [index, setIndex] = useState<number>(0)
  const [dueList, setDueList] = useState<any>([])
  const [dueListHolder, setDueListHolder] = useState<any>([])
  const [selectValue, setSelectValue] = useState<string>('')
  const [cummDues, setCummDues] = useState<number>(0)
  const [pendingDues, setPendingDues] = useState<any>([])
  const [selectedPayments, setSelectedPayments] = useState<any>([])
  const user = useAppSelector((state: RootState) => state.auth.userData.user)
  const [config, setConfig] = useState<HookConfig>(
    {
      reference: (new Date()).getTime().toString(),
      amount: cummDues,
      email: user?.member?.email,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    }
  )

  const daysGone = getTotalDaysInYear(new Date().getFullYear()) - getTotalDaysOfYear(new Date())
  const daysOfYear = getTotalDaysOfYear(new Date())

  const data = {
    datasets: [
      {
        label: 'Due date count',
        data: [daysGone, daysOfYear],
        backgroundColor: [
          '#C70F0F',
          '#F0EAEA',
        ],
        borderWidth: 0.5,
      },
    ],
  };

  const {data: memberStat} = useGetMemberStatQuery({
    variables: {
      memberId: user?.member?.id
    }
  })

  const [dueToPay, {loading }] = useGetMemberUnpaidDuesLazyQuery({fetchPolicy: 'no-cache'})
  const [postPayment] = usePostPaymentMutation()
  const [postMultiPayment] = usePostMultiPaymentMutation()
  const loadingState = loading || dueList === 0 ? "loading" : "idle";

  useEffect(() => {
    document.title = 'Dues Payments | NIA-Kd'
    ;(async () => {
        const res = await dueToPay({
          variables: {
            memberId: user?.member?.id,
            membershipTypeId: user?.member?.membershipType?.id
          }
        })
        setDueList(res.data?.getMemberUnpaidDues)
        setDueListHolder(res.data?.getMemberUnpaidDues)
        setPendingDues(res.data?.getMemberUnpaidDues?.map(due => {
          return {
            key: due?.id,
            label: `${due?.name} - ${'\u20a6'}${Intl.NumberFormat().format(Number(due?.amount))}`
          }
        }))
    })()
  }, [dueToPay])

  const handlePaystackCloseAction = () => {
    console.log('closed')
  }

  const componentProps = {
    ...config,
    text: 'Pay Now',
    onSuccess: (reference: any) => handleMultiPaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const renderCell = React.useCallback((due: Due, columnKey: React.Key, index: number) => {
      const cellValue = due[columnKey as keyof Due];
  
      switch (columnKey) {
          case "id":
              setIndex(cur => cur + 1)
              return <span>{index}</span>;
          case "name":
              return (
                  <div>{due?.name}</div>
              )
          case "year":
              return (
                  <div>{moment(due.startsAt).format("Y")}</div>
              )
          case "amount":
              return (
                  <div>{'\u20a6'}{Intl.NumberFormat().format(due.amount)}</div>
              )
          case "status":
              return (
                  <Chip className="capitalize" color={due.status === 'Active' ? 'success' : 'warning'} size="sm" variant="flat">
                      <span className={due.status === 'Active' ? 'text-[#0A7535]': 'text-[#916B09]'}>{cellValue === 'Active' ? 'Pending' : 'Overdue'}</span>
                  </Chip>
              );
          case "actions":
              const config: HookConfig = {
                reference: (new Date()).getTime().toString(),
                amount: Number(due?.amount) * 100,
                email: user?.member?.email,
                publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
              }

              const componentProps = {
                ...config,
                text: 'Pay Now',
                onSuccess: (reference: any) => handlePaystackSuccessAction(reference, due),
                onClose: handlePaystackCloseAction,
              };

              return (
                  <div className="relative flex justify-end items-center gap-3">
                    <button
                      className='flex mt-4 px-4 rounded-lg py-2 items-center justify-center xs:justify-start bg-black text-white'
                    >
                      <PaystackButton 
                        amount={Number(due?.amount) * 100} 
                        email={user?.member?.email as string} 
                        reference={(new Date()).getTime().toString()}
                        {...componentProps} 
                      />
                    </button>
                  </div>
              );
          default:
              return cellValue;
      }
  }, []);

  const handlePaystackSuccessAction = async (reference: any, dues: any) => {
    try {
      const res = await postPayment({
        variables: {
          input: {
            memberId: user?.member?.id,
            duesId: dues.id as string,
            paymentType: 'Dues',
            description: dues.name,
            status: reference.status === 'success' ? 'Successful' : 'Unsuccessful',
            phoneNumber: user?.member?.phoneNumber as string,
            paymentRef: reference.trxref,
            amount: parseFloat(dues.amount)
          }
        }
      })
      if(res.data?.postPayment.status === 'Successful'){
        const resDue = await dueToPay({
          variables: {
            memberId: user?.member?.id,
            membershipTypeId: user?.member?.membershipType?.id
          }
        })
        setDueList(resDue.data?.getMemberUnpaidDues)
        setDueListHolder(resDue.data?.getMemberUnpaidDues)
        setPendingDues(resDue.data?.getMemberUnpaidDues?.map(due => {
          return {
            key: due?.id,
            label: `${due?.name} - ${'\u20a6'}${Intl.NumberFormat().format(Number(due?.amount))}`
          }
        }))
        toast.success('Dues paid successfully')
      }
    } catch (error: any) {
      toast.error(error.messge)
    }
  };


  const handleMultiPaystackSuccessAction = async (reference: any) => {
    try {
      const res = await postMultiPayment({
        variables: {
          input: {
            memberId: user?.member?.id,
            duesId: selectedPayments,
            status: reference.status === 'success' ? 'Successful' : 'Unsuccessful',
            phoneNumber: user?.member?.phoneNumber as string,
            paymentRef: reference.trxref,
          }
        }
      })
      if(res.data?.postMultiPayment){
        const resDue = await dueToPay({
          variables: {
            memberId: user?.member?.id,
            membershipTypeId: user?.member?.membershipType?.id
          }
        })
        setDueList(resDue.data?.getMemberUnpaidDues)
        setDueListHolder(resDue.data?.getMemberUnpaidDues)
        setPendingDues(resDue.data?.getMemberUnpaidDues?.map(due => {
          return {
            key: due?.id,
            label: `${due?.name} - ${'\u20a6'}${Intl.NumberFormat().format(Number(due?.amount))}`
          }
        }))
        setCummDues(0)
        toast.success('Dues paid successfully')
      }
    } catch (error: any) {
      toast.error(error.messge)
    }
  };

  const handleMultiSelectForPayment = (e: ChangeEvent<HTMLSelectElement>) => {
    const valueArr = e.target.value.split(',')
    let sum: number = 0
    valueArr.forEach(item => {
      const amount: number = dueList.find((due: Due) => due.id === item)?.amount
      sum += Number(amount)
    })

    const totalAmount = sum * 100 
    config['amount'] = totalAmount
    config['phone'] = user?.member?.phoneNumber

    setConfig(config)

    setSelectedPayments(valueArr)
  }

  const searchDues = (query: string) => {
    if(query.length === 0) {
      setDueList(dueListHolder)
    } else {
      const filteredEvents = dueList?.filter((due: Due) => {
        return due?.name?.toLowerCase().includes(query)
      })
      setDueList(filteredEvents)
    }
  }

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSelectValue(value)
    if(value.length === 0 || value === 'All') {
      setDueList(dueListHolder)
    } else {
      if (dueList.length === 0){
        const filteredEvents = dueListHolder?.filter((due: Due) => {
          return due?.status?.toLowerCase().includes(value === 'Pending' ? 'active' : 'inactive')
        })
        setDueList(filteredEvents)
      } else {
        const filteredEvents = dueList?.filter((due: Due) => {
          return due?.status?.toLowerCase().includes(value === 'Pending' ? 'active' : 'inactive')
        })
        setDueList(filteredEvents)
      }
    }
  }

  return (
    <div className='h-full w-full sm:px-12 xs:px-6 bg-gray-100 overflow-y-auto'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold'>Dues</h1>
      </div>
      <div className='flex sm:flex-row xs:flex-col gap-4 justify-between'>
        <div className='flex flex-col sm:w-5/12 xs:w-full border bg-white rounded-2xl overflow-hidden'>
          <div className='flex space-x-2 items-center p-4 '>
            <div className='flex space-x-2 py-1'>
              <div className='flex h-12 w-12 justify-center items-center bg-[#F2F2F2] rounded-full'>
                <CurrencyNgn size={24} color='#333030' />
              </div>
              <div className='flex flex-col'>
                <h1 className='text-lg font-medium'>Financial Status</h1>
                <div className='flex items-center justify-start'>
                  <span className={`text-white ${memberStat?.getMemberStat?.fin_status ? 'bg-[#40AD36]' : 'bg-[#C70F0F]'} py-[1px] px-2 rounded-md text-[12px]`}>Financial</span>
                </div>
              </div>
            </div>
          </div>
          <div className='h-16 bg-[#EFEFEF] px-6'>
            <div className='flex space-x-1 h-full items-center'>
              <div className='pb-2'><Pie data={data} height={40} width={40} /></div>
              <span className='text-[13px] text-gray-500'>You have {getTotalDaysInYear(new Date().getFullYear()) - getTotalDaysOfYear(new Date())} days left till next due payment</span>
            </div>
          </div>
        </div>
        <div className='sm:w-7/12 xs:w-full bg-white rounded-2xl overflow-hidden p-4'>
          <div className='flex items-center w-full'>
            <div className='flex sm:flex-row xs:flex-col space-x-2 py-1'>
              <div className='flex h-12 w-12 justify-center items-center bg-[#F2F2F2] rounded-full'>
                <CurrencyNgn size={24} color='#333030' />
              </div>
              <div className='flex flex-col'>
                <div className=''>
                  <h1 className='text-lg font-medium'>Pay Additional Years</h1>
                  <span className=' text-[#5C5C5C]'>Be financial up to the selected year by paying the associated dues</span>
                </div>
                <div className='flex sm:flex-row xs:flex-col sm:items-center xs:items-start sm:justify-start space-x-2'>
                  <Select
                    items={pendingDues}
                    placeholder='Select the year to update to pay'
                    selectionMode='multiple'
                    className='max-w-xs mt-4'
                    isRequired
                    name='dues'
                    onChange={handleMultiSelectForPayment}
                  >
                    {(due: any) => (
                      <SelectItem key={due.key}>{due.label}</SelectItem>
                    )}
                  </Select>
                  <button
                    className='flex mt-4 px-4 rounded-lg py-2 items-center justify-center xs:justify-start bg-black text-white'
                  >
                    <PaystackButton 
                      amount={Number(cummDues) * 100} 
                      email={user?.member?.email as string} 
                      reference={(new Date()).getTime().toString()}
                      {...componentProps} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-8 w-full'>
        <h1 className='text-lg font-semibold'>Upcoming dues</h1>
        <div className='flex pt-6 pb-4 w-full gap-4'>
          <div className='relative rounded-md shadow-sm sm:w-2/5 xs:w-full'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchNormal variant='Outline' size={20} color='gray' />
            </div>
            <input 
              name='query'
              placeholder='Search transactions'
              type='search'
              className={`pr-3 pl-10 block w-full rounded-md h-11 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`}
              onChange={(e) => searchDues(e.target.value)}
            />
          </div>
          <div>
            <CustomSearch 
              data={dueStatuses}
              name='query'
              nullValue='All'
              onChange={handleStatusChange}
            />
          </div>
        </div>
        <Table aria-label="">
            <TableHeader>
                <TableColumn key="id">S/N</TableColumn>
                <TableColumn key="name">Due</TableColumn>
                <TableColumn key="amount">Amount</TableColumn>
                <TableColumn key="year">Year</TableColumn>
                <TableColumn key="status">Status</TableColumn>
                <TableColumn key={'actions'}>.</TableColumn>
            </TableHeader>
            <TableBody
                items={dueList ?? []}
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
    </div>
  )
}

export default DueScreen