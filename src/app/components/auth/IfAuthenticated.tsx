'use client'

import { useSession } from 'next-auth/react'

export default function IfAuthenticated({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    return <>{children}</>
  }
  return null
}
