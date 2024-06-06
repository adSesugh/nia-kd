import React from 'react'

type HeaderProps = {
    title: string
}

const TitleHeader: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className='flex sm:pt-14 xs:pt-2'>
            <h1 className='text-xl text-[32px] font-semibold'>{title}</h1>
        </header>
    )
}

export default TitleHeader