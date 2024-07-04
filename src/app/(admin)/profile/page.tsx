'use client'

import React from 'react'
// @ts-ignore
import ProfileScreen from '@/components/profile'
import { Member, useGetUserQuery } from '@/graphql/__generated__/graphql'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/store'
import { Role } from '@/lib/common'

const AdminProfile = () => {
  const user = useSelector((state: RootState) => state?.auth.userData.user)
  const {data, loading} = useGetUserQuery({
      fetchPolicy: 'no-cache',
      variables: {
          userId: user?.id
      }
  })

  if(user?.role === Role.ADMINISTRATOR){
    return (
        <div className="flex px-40 justify-center items-center h-full">
            <h1>Not allowed</h1>
        </div>
    )
  }

  return (
    <div className='w-full'>
      <ProfileScreen data={data?.getUser as Member} loading={loading} />
    </div>
  )
}

export default AdminProfile