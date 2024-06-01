'use client'

import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DotsThreeVertical } from '@phosphor-icons/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import SearhbarWithIcon from '../searhbar-with-icon';
import SelectFilter from '../select-filter';
import { Blog, useGetBlogsLazyQuery, usePublishedBlogMutation } from '@/graphql/__generated__/graphql';
import { toast } from 'react-toastify';
import moment from 'moment';

const PublishedBlog = () => {
    const [index, setIndex] = useState<number>(0)
    const [blogs, setBlogs] = useState<any>()
    const [getBlogs, {loading, error}] = useGetBlogsLazyQuery({fetchPolicy: 'no-cache'})
    const [publishedBlog] = usePublishedBlogMutation({fetchPolicy: 'no-cache'})

    const loadingState = loading || blogs === 0 ? "loading" : "idle";

    useEffect(() => {
        ;(async() => {
            const res = (await getBlogs({
                variables: {
                    status: 'Published'
                }
            })).data
            setBlogs(res?.getBlogs)
        })()
    }, [getBlogs])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const switchBlogStatus = async (blogId: string, status: string) => {
        const blog = (await publishedBlog({
            variables: {
                blogId,
                status
            }
        })).data

        if(blog?.publishedBlog && blogs.length !== 0){
            const res = await getBlogs()
            if(res.error){
                toast.error(res.error.message)
            } else{
                setBlogs(res?.data?.getBlogs)
            }
        }
    }

    const renderCell = React.useCallback((blog: Blog, columnKey: React.Key, index: number) => {
        const cellValue = blog[columnKey as keyof Blog];
        
    
        switch (columnKey) {
            case "id":
                setIndex(cur => cur + 1)
                return <span>{index}</span>;
            case 'created_at':
                return (
                    <div>{moment(blog.createdAt).format('MMM D | h:ss A')}</div>
                )
            case "status":
                return (
                    <Chip className="capitalize px-3" color={blog.status === 'Published' ? 'success' : 'default'} size="sm" variant="flat">
                        <span className={`${blog.status === 'Published' ? 'text-[#0A7535]' : ''} text-[12px]`}>{cellValue}</span>
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <DotsThreeVertical size={40} className="text-default-300" color='#161314' />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>View</DropdownItem>
                            <DropdownItem>Edit</DropdownItem>
                            {blog.status === 'Published' ? (
                                <DropdownItem onClick={() => switchBlogStatus(blog.id as string, 'Unpublished')}>Unpublished</DropdownItem>
                            ): (
                                <DropdownItem onClick={() => switchBlogStatus(blog.id as string, 'Published')}>Published</DropdownItem>
                            )}
                        </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [switchBlogStatus]);
    
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
                            <SelectFilter name='membershipType' data={[{id: 'draft', name: "Draft"},{id: 'published', name:'Published'}]} className='flex' />
                        </Form>
                    )}
                </Formik>
            </div>
            <Table aria-label="">
                <TableHeader>
                    <TableColumn key="id">S/N</TableColumn>
                    <TableColumn key="title">Title</TableColumn>
                    <TableColumn key="created_at">Date created</TableColumn>
                    <TableColumn key="status">Status</TableColumn>
                    <TableColumn key={'actions'}>Action</TableColumn>
                </TableHeader>
                <TableBody
                    items={blogs ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                    emptyContent={"No blog to display."}
                >
                    {(item: any) => (
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default PublishedBlog