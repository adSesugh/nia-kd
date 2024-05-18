import React from 'react'
import PageHeader from '../../TitleHeader'
import SearhbarWithIcon from '@/components/searhbar-with-icon'

const MemberList = () => {
    return (
        <div className='px-12'>
            <PageHeader title='Members' />
            <div>
                <SearhbarWithIcon name='query' />
            </div>
        </div>
    )
}

export default MemberList