'use client'

import { useSession } from 'next-auth/react'

export default function IfNotAuthenticated({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  if (status === 'unauthenticated') {
    return <>{children}</>
  }
  return null
}
