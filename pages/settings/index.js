"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react"

const Settings = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
}

export default Settings