'use client'

import React from 'react'
// @ts-ignore
import ProfileScreen from '@/components/profile'
import { useSelector } from 'react-redux'
import { Member, useGetUserQuery } from '@/graphql/__generated__/graphql'
import { RootState } from '@/features/store'

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.userData.user)
  
  const {data, loading} = useGetUserQuery({
      fetchPolicy: 'no-cache',
      variables: {
          userId: user?.id
      }
  })

  return (
    <div className='w-full'>
      <ProfileScreen data={data?.getUser as Member} loading={loading} />
    </div>
  )
}

export default Profile