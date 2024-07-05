'use client'

import React, { useEffect, useState } from 'react'
// @ts-ignore
import ProfileScreen from '@/components/profile'
import { Member, useGetUserLazyQuery, useGetUserQuery } from '@/graphql/__generated__/graphql'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/store'
import { Role } from '@/lib/common'

const AdminProfile = () => {
  const user = useSelector((state: RootState) => state?.auth.userData.user)
  const [userDetail, setUserDetail] = useState<any>()
  const [getUser, {loading}] = useGetUserLazyQuery({fetchPolicy: 'no-cache'})

  useEffect(() => {
    document.title = `Profile | NIA-Kd`
    ;(async () => {
      const res = (await getUser({
        variables: {
          userId: user?.id
        }
      })).data
      setUserDetail(res?.getUser)
    })()
  }, [])

  if(user?.role === Role.ADMINISTRATOR){
    return (
        <div className="flex px-40 justify-center items-center h-full">
            <h1>Not allowed</h1>
        </div>
    )
  }

  return (
    <div className='w-full'>
      <ProfileScreen data={userDetail} loading={loading} />
    </div>
  )
}

export default AdminProfile