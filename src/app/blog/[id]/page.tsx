'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const BlogDetail = () => {
    const searchParams = useParams()
    console.log(searchParams)
    return (
        <div>BlogDetail</div>
    )
}

export default BlogDetail