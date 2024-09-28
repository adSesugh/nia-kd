'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../TitleHeader'
import {Chip,  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableHeader, TableColumn, TableBody, Spinner, TableRow, TableCell} from "@nextui-org/react"
import { Form, Formik } from 'formik'
import SearhbarWithIcon from '@/components/searhbar-with-icon'
import SelectFilter from '@/components/select-filter'
import { modelStatus } from '@/lib/common'
import { DotsThree } from '@phosphor-icons/react'
import moment from 'moment'
import { Compaign, useDeleteCompaignMutation, useGetCompaignsLazyQuery, useStopCompaignMutation } from '@/graphql/__generated__/graphql'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const AdvertPage = () => {
    const [compaigns, setCompaigns] = useState<any>([])
    let [index, setIndex] = useState<number>(0)
    const router = useRouter()

    const [getCompaigns, {loading}] = useGetCompaignsLazyQuery({fetchPolicy: 'no-cache'})
    const [switchCompaign, {loading: switchCompaignLoader}] = useStopCompaignMutation()
    const [deleteCompaign] = useDeleteCompaignMutation()

    useEffect(() => {
        document.title = `Campaign | NIA-Kd`;
        (async() => {
            const res = (await getCompaigns()).data
            setCompaigns(res?.getCompaigns)
        })()
    }, [])

    console.log(compaigns)

    const loadingState = loading || compaigns === 0 ? "loading" : "idle";

    const switchCompaignStatus = async (compaignId: string, status: boolean) => {
        const compaign = (await switchCompaign({
            variables: {
                compaignId,
                status
            }
        })).data

        if(compaign?.stopCompaign?.id){
            const res = await getCompaigns()
            if(res.error){
                toast.error(res.error.message)
            } else{
                setIndex(0)
                setCompaigns(res?.data?.getCompaigns)
            }
        }
    }

    const deletePublishedCompaign = async (compaignId: string) => {
        const compaign = (await deleteCompaign({
            variables: {
                compaignId,
            }
        })).data

        if(compaign?.deleteCompaign?.id){
            const res = await getCompaigns()
            if(res.error){
                toast.error(res.error.message)
            } else{
                setIndex(0)
                setCompaigns(res?.data?.getCompaigns)
            }
        }
    }

    const renderCell = React.useCallback((compaign: Compaign, columnKey: React.Key) => {
        const cellValue = compaign[columnKey as keyof Compaign];
        
        switch (columnKey) {
            case "id":
                return <span>{++index}</span>;
            case "status":
                return (
                    <Chip className="capitalize" color={compaign.status ? 'success' : 'default'} size="sm" variant="flat">
                        <span className={`${compaign.status ? 'text-[#0A7535]' : 'text-[#c03030]'}`}>{compaign.status ? 'Running' : 'Stopped'}</span>
                    </Chip>
                );
            case "duration":
                return (
                    <Chip className="capitalize" color={compaign?.status ? 'success' : 'default'} size="sm" variant="flat">
                        <span className={`${compaign.status ? 'text-[#0A7535]' : 'text-[#c03030]'}`}>{compaign.duration}</span>
                    </Chip>
                );
            case "postedDate":
                return (
                    <div>{moment(compaign?.createdAt).format('LL')}</div>
                );
            case "performance":
                return (
                    <div className='grid grid-cols-2 gap-6'>
                        <div className=''>
                            <h4>{compaign.views ?? 0}</h4>
                            <span>Views</span>
                        </div>
                        <div>
                            <h4>{compaign.clicks ?? 0}</h4>
                            <span>Clicks</span>
                        </div>
                    </div>
                );
            case "actions":
                return (
                    <div className="flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <DotsThree size={24} color='#5C4D58' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => router.push(`ads/${compaign?.id}/edit`)}>
                                    Edit Compaign
                                </DropdownItem>
                                {compaign.status ? (
                                    <DropdownItem onClick={() => switchCompaignStatus(compaign.id, compaign.status as boolean)}>Stop Compaign</DropdownItem>
                                ): (
                                    <DropdownItem onClick={() => switchCompaignStatus(compaign.id, compaign.status as boolean)}>Activate Compaign</DropdownItem>
                                )}
                                <DropdownItem onClick={() => deletePublishedCompaign(compaign.id)}>
                                    Delete Compaign
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className='sm:px-12 xs:px-4 h-full overflow-x-scroll'>
            <div className='flex justify-between items-center'>
                <TitleHeader title='Campaign' />
            </div>
            <div className='flex justify-between pt-6 pb-4'>
               <div>
                <Formik
                        onSubmit={() => console.log('here...')}
                        initialValues={{query: ''}}
                    >
                        {({values, touched, errors, handleBlur, handleChange, handleSubmit}) => (
                            <Form onSubmit={handleSubmit} className='flex sm:flex-row xs:flex-col sm:space-x-3 xs:space-x-0 xs:space-y-3 sm:space-y-0'>
                                <SearhbarWithIcon 
                                    name='query' 
                                    placeholder='Search by name'
                                    className={`flex sm:w-96 xs:w-full ${errors.query && touched.query ? 'ring-red-500': ''} pr-10`}
                                />
                                <SelectFilter nullValue="All" name='membershipType' data={modelStatus} className='flex' />
                            </Form>
                        )}
                    </Formik>
               </div>
               <div>
                    <Link 
                        href={'/ads/create'}
                        className='flex px-4 py-2 justify-center items-center text-white text-sm bg-[#161314] rounded-lg'
                    >
                        New
                    </Link>
               </div>
            </div>
            <div className='pt-4 pb-3'>
                <Table aria-label="">
                    <TableHeader>
                        <TableColumn key="id">S/N</TableColumn>
                        <TableColumn key="name">Name</TableColumn>
                        <TableColumn key="status">Status</TableColumn>
                        <TableColumn key="duration">Duration</TableColumn>
                        <TableColumn key="postedDate">Posted</TableColumn>
                        <TableColumn key={'performance'}>Performance</TableColumn>
                        <TableColumn key={'actions'}>.</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={compaigns ?? []}
                        loadingContent={<Spinner color='default' />}
                        loadingState={loadingState}
                        emptyContent={"No free ads to display."}
                    >
                        {(item: any) => (
                            <TableRow key={item?.id}>
                                {(columnKey: React.Key) => <TableCell className='py-3'>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdvertPage