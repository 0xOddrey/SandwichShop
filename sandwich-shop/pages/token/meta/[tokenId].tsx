import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
 
export default function Page() {
  const [tokenId, setTokenId] = useState("")

  const router = useRouter();
  useEffect(() => {
      if (router.isReady) {
        console.log(router.query);
        setTokenId(router.query.tokenId as string)
      }
    }, [router.isReady, router.query]);

  if (!tokenId) return <div>Loading...</div>
  return (
      <>
        <h1>This is the token</h1>
        <p>Token: {tokenId}</p>
      </>
    )
}