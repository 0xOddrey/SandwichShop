import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
 
export default function Page() {

  const [tokenId, setTokenId] = useState("")

  useEffect(() => {
    if (global.window.location.href) {
      setTokenId(global.window.location.href)
    }
    }, []);

  if (!tokenId) return <div>Loading...</div>
  return (
      <>
        <h1>This is the token</h1>
        <p>Token: {tokenId}</p>
      </>
    )
}