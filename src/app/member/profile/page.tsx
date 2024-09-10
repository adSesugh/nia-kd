'use client'

import React, { useEffect, useState } from 'react'
// @ts-ignore
import ProfileScreen from '@/components/profile'
import { useSelector } from 'react-redux'
import { Member, useGetUserLazyQuery, useGetUserQuery } from '@/graphql/__generated__/graphql'
import { RootState } from '@/features/store'

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.userData.user)
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

  return (
    <div className='w-full'>
      <ProfileScreen data={userDetail} loading={loading} />
    </div>
  )
}

export default Profile