'use client'

import React from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import 'dotenv/config'

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>
}
