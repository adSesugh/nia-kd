'use client'

import NIAFooter from '@/components/footer';
import SubHeader from '@/components/sub-header';
//import { useCreateTagMutation, useGetTagsQuery } from '@/graphql/__generated__/graphql';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react'

const Blog: NextPage = () => {
  // const {loading, error, data} = useGetTagsQuery()
  // const [createTag, {loading: l, error: err, data: createData}] = useCreateTagMutation()
 
  // console.log(data)
  // const imgURL: string = 'https://w4d-prod-uploads.s3.amazonaws.com/recipe/1006/image/external_202012151441.'

  return (
    <div>
      <SubHeader title='Blog' subtitle={''} />
      <h1>Blog</h1>
      <NIAFooter />
    </div>
  )
}

export default Blog