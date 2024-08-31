import React from 'react'
import styles from '@/styles/home.module.css'
import TeamCard from './TeamCard'

const members = [
    {
        imageUrl: '/assets/team/3.jpeg',
        name: 'Arc. Olulaja M. Balogun',
        designation: 'Ex Officio Member, ECNIAK',
        social_media: {
            twitter: '',
            linkedin: ''
        }
    },
    {
        imageUrl: '/assets/team/2.jpeg',
        name: 'Danjuma Sokolayam Ageni',
        designation: 'Chapter Secretary',
        social_media: {
            twitter: 'https://x.com/DanjAgeni',
            linkedin: 'https://www.linkedin.com/in/danjuma-ageni-mpm-mnia-173b7279'
        }
    },
    {
        imageUrl: '/assets/team/1.jpeg',
        name: 'Bawa Y. Chindo',
        designation: 'Assistant Secretary',
        social_media: {
            twitter: 'https://x.com/bawa_chindo',
            linkedin: ''
        }
    },
    {
        imageUrl: '/assets/team/4.jpg',
        name: 'Gbenga Popoola',
        designation: 'Financial Secretary',
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
                <h1>Meet Our Team</h1>
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