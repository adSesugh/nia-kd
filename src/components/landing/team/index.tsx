import React from 'react'
import styles from '@/styles/home.module.css'
import TeamCard from './TeamCard'

const members = [
    {
        imageUrl: '',
        name: 'Jimoh Abdulrazak',
        designation: 'President',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    },
    {
        imageUrl: '',
        name: 'Jimoh Abdulrazak',
        designation: 'President',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    },
    {
        imageUrl: '',
        name: 'Jimoh Abdulrazak',
        designation: 'President',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    },
    {
        imageUrl: '',
        name: 'Jimoh Abdulrazak',
        designation: 'President',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    }
]

const NIATeam = () => {
    return (
        <div className={`${styles.teamSection}`}>
            <div className={styles.teamHeader}>
                <h1>Team</h1>
            </div>
            <div className={styles.teamMember}>
                {members.map((member, index) => (
                    <TeamCard {...member} key={index} />
                ))}
            </div>
        </div>
    )
}

export default NIATeam