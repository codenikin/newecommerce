'use client'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useCallback, useState } from 'react'
const GOOGLE_MAPS_API_KEY = 'AIzaSyCkeYNFGGgb-zQDLhAv24zgM8tj3Q84ylY'

const address = {
  street: 'MGG Palayam',
  city: 'Coimbatore',
  state: 'ThamilNadu',
  zipCode: '641107',
  country: 'India',
  phone: '+919514399331',
  email: 'info@totaleng.in',
  lat: 11.12810743055748,
  lng: 77.08240535155483,
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: address.lat,
  lng: address.lng,
}

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setMap] = useState<google.maps.Map | null>(null)

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])
  return (
    <div className="h-[350px] md:h-full w-full overflow-hidden rounded-lg">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          onUnmount={onUnmount}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200">
          <p>Loading map...</p>
        </div>
      )}
    </div>
  )
}

export default MapComponent
