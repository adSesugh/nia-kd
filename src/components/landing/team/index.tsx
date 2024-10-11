import React from 'react'
import styles from '@/styles/home.module.css'
import TeamCard from './TeamCard'
import members from '@/assets/data/members.json'

const NIATeam = () => {
    return (
        <div className={`${styles.teamSection}`}>
            <div className={styles.teamHeader}>
                <h1>Meet Our Team</h1>
            </div>
            <div className={styles.teamMember}>
                {members.slice(0, 4).map((member, index) => (
                    <TeamCard {...member} key={index} />
                ))}
            </div>
        </div>
    )
}

export default NIATeam