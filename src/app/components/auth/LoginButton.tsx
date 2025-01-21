'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import IfAuthenticated from './IfAuthenticated';
import IfNotAuthenticated from './IfNotAuthenticated';
import Image from 'next/image';

export default function LoginButton() {
  const { data: session } = useSession();

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
            className="bg-gray-500 text-white text-white text-xl font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="flex space-x-4">
          <button
            className="bg-green-600 hover:bg-green-500 text-white text-xl font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
            onClick={() => signIn('google')}
          >
            Sign In
          </button>
        </div>
      </IfNotAuthenticated>
    </div>
  );
}
