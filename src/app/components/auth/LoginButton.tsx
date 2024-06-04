'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import IfAuthenticated from './IfAuthenticated'
import IfNotAuthenticated from './IfNotAuthenticated'
import Image from 'next/image'

export default function LoginButton() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center p-2 bg-white">
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
          <button
            className="bg-red-400 text-white py-1 px-3 rounded hover:bg-red-600"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="flex space-x-4">
          <button
            className="bg-blue-100 text-blue-800 py-1 px-3 border-blue-800 border-4 rounded hover:bg-blue-600 hover:text-white"
            onClick={() => signIn('github')}
          >
            GitHub Sign In
          </button>
          <button
            className="bg-blue-100 text-blue-800 py-1 px-3 border-blue-800 border-4 rounded hover:bg-blue-600 hover:text-white"
            onClick={() => signIn('google')}
          >
            Google Sign In
          </button>
        </div>
      </IfNotAuthenticated>
    </div>
  )
}
