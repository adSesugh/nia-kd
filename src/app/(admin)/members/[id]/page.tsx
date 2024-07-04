'use client'

import ProfileScreen from '@/components/profile'
import { Member, useGetMemberQuery } from '@/graphql/__generated__/graphql'
import { useParams } from 'next/navigation'
import React from 'react'

const MemberDetail = () => {
    const {id } = useParams()
    const {data, loading} = useGetMemberQuery({
        fetchPolicy: 'no-cache',
        variables: {
            memberId: id 
        }
    })

    return (
        <div className='w-full'>
            <ProfileScreen data={data?.getMember as Member} loading={loading} />
        </div>
    )
}

export default MemberDetail