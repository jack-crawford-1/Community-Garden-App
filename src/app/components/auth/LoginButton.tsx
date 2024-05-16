'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import IfAuthenticated from './IfAuthenticated'
import IfNotAuthenticated from './IfNotAuthenticated'
import Image from 'next/image'

export default function LoginButton() {
  const { data: session } = useSession()

  return (
    <div className="relative flex items-center p-2 bg-white shadow-md">
      <IfAuthenticated>
        <div className="flex items-center space-x-4">
          {session && (
            <>
              <Image
                src={session.user?.image || ''}
                alt="User"
                width={50}
                height={50}
                className="rounded-full border-2 border-gray-300"
              />
              <span className="text-gray-700 font-medium">
                Signed in as: {session.user?.name}
              </span>
            </>
          )}
        </div>
        <button
          className="absolute top-4 right-4 bg-red-400 text-white py-1 px-3 rounded hover:bg-red-600"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="space-x-4">
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            onClick={() => signIn('github')}
          >
            Sign in with GitHub
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </button>
        </div>
      </IfNotAuthenticated>
    </div>
  )
}
