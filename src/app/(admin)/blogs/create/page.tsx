'use client'

import React, { useEffect, useState } from 'react'
import TitleHeader from '../../TitleHeader'
import { Field, Form, Formik } from 'formik'
import TextField from '@/components/textfield'
import TinyMCEField from '@/components/tinymce-field'
import NIAFileInput from '@/components/nia-fileinput'
import { CloseCircle } from 'iconsax-react'
import Link from 'next/link'
import { useCreateBlogMutation } from '@/graphql/__generated__/graphql'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


const CreateBlog = () => {
    const router = useRouter()
     const [tags, setTags] = useState<string[]>([])
    const [tag, setTag] = useState<string>('')
    const [base64, setBase64] = useState<string>()
    const [createBlog, { loading }] = useCreateBlogMutation() 

    useEffect(()=>{
        document.title = 'Create Blog | NIA-Kd'
    }, [base64])

    const addTags = () => {
        if(tag) {
            const checkExistence = tags.find((item: string) => item === tag)
            if(!checkExistence) {
                setTags(prev => [...prev, tag])
            }
            setTag('')
        }
    }

    const delistTag = (value: string) => {
        const filtered = tags.filter((item: string) => item != value)
        setTags(filtered)
    }

    return (
        <div className='sm:px-12 xs:px-4 pb-6 h-full overflow-y-auto'>
            <TitleHeader title='New Post' />
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    summary: '',
                    featuredImage: '',
                }}
                onSubmit={async(values) => {
                    const res = await createBlog({
                        variables: {
                            input: {
                                title: values.title,
                                content: values.content,
                                summary: values.summary,
                                featuredImage: values.featuredImage,
                                tags: tags
                            }
                        }
                    })
                    if(res.data?.createBlog?.success){
                        toast.success("Blog created")
                        return router.back()
                    }
                }}
            >
                {({values, handleSubmit, isSubmitting, setFieldValue}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className='flex sm:flex-row xs:flex-col justify-between pt-5 gap-4'>
                            <div className='sm:w-4/6 xs:w-full'>
                                <div className='w-full h-full bg-white py-4 border-t px-4'>
                                    <TextField 
                                        name='title' 
                                        label='Title'
                                        placeholder='Give your blog post a suitable title' 
                                    />
                                    <Field name="content" label="Blog Content" as={TinyMCEField} />
                                    <Field name="summary" label="Blog Summary" as={TinyMCEField} helpText='Provide a brief summary of the content of your post' />
                                    <div className='flex pt-10 pb-4 gap-2 float-end sm:flex xs:hidden'>
                                        <Link href={'/blogs/list'} className='border rounded-lg px-4 py-2 text-sm'>Cancel</Link>
                                        <button type='submit' disabled={loading} className='bg-[#241F21] text-white rounded-lg px-6 py-2 text-sm'>{loading ? 'Please wait...': 'Add blog'}</button>
                                    </div>
                                </div>
                            </div>
                            <div className='sm:w-2/6 xs:w-full'>
                                <div className='w-full h-ful border-t'>
                                    <NIAFileInput name='coverImg' label='Feature Image' handleFileChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                                        const file = e.currentTarget.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setFieldValue('featuredImage', reader.result as string);
                                                setBase64(reader.result as string)
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    } } base64={base64} />
                                    <div className='py-3'>
                                        <h1 className='text-lg font-semibold'>Tags</h1>
                                        <div className='bg-white py-2 px-3'>
                                            <span className='text-sm text-slate-400'>Keywords contained in your content</span>
                                        </div>
                                        <div className='flex py-3 w-full'>
                                            <input 
                                                type='text' 
                                                name='tag'
                                                value={tag}
                                                className='w-full rounded-l-md border border-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset placeholder:text-[13px] focus:ring-gray-200' 
                                                placeholder='Keywords contained in your content'
                                                onChange={(e) => setTag(e.target.value)}
                                            />
                                            <button 
                                                onClick={addTags} 
                                                disabled={!tag ? true : false}
                                                className='border-t-2 border-b-2 border-r-2 px-3 text-sm rounded-r-md'
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {tags && (
                                            <div className='flex flex-wrap w-full gap-2 border-b pb-3'>
                                                {tags.map((item: string, index: number) => (
                                                    <div 
                                                        key={index}
                                                        className='flex items-center relative justify-center border rounded-xl px-4 py-1 text-white bg-slate-600'
                                                    >
                                                        <span className='pr-3'>{item}</span>
                                                        <CloseCircle 
                                                            variant='Outline' 
                                                            size={16}
                                                            className='absolute top-2 right-0' 
                                                            onClick={() => delistTag(item)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className='flex pt-10 pb-4 gap-2 float-end sm:hidden xs:flex'>
                                            <Link href={'/blogs/list'} className='border rounded-lg px-4 py-2 text-sm'>Cancel</Link>
                                            <button type='submit' disabled={loading} className='bg-[#241F21] text-white rounded-lg px-6 py-2 text-sm'>{loading ? 'Please wait...': 'Add blog'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateBlog