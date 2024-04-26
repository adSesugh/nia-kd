import React from 'react'

type BadgeProps = {
    label: string
    className: string
    labelStyle: string | undefined
}

const Badge: React.FC<BadgeProps> = ({ label, className, labelStyle }) => {
  return (
    <div className={`px-2 py-1 ${className}`}>
        <span className={labelStyle}>{label}</span>
    </div>
  )
}

export default Badge