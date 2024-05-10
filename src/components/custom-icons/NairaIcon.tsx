import { IconProps } from '@/types/common'
import React from 'react'

const NairaIcon: React.FC<IconProps> = ({ width, height, stroke, fill }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0013 18.3334C14.6037 18.3334 18.3346 14.6025 18.3346 10.0001C18.3346 5.39771 14.6037 1.66675 10.0013 1.66675C5.39893 1.66675 1.66797 5.39771 1.66797 10.0001C1.66797 14.6025 5.39893 18.3334 10.0013 18.3334Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.2837 8.93221V9.76081H5.83203V8.93221H14.2837ZM14.2837 10.722V11.5506H5.83203V10.722H14.2837ZM13.422 5.83325V14.3181H12.4277L7.8041 7.65617H7.72124V14.3181H6.69377V5.83325H7.68809L12.3282 12.5118H12.4111V5.83325H13.422Z" fill={fill}/>
    </svg>
  )
}

export default NairaIcon