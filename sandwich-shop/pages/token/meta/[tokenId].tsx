import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
 
export default function Page() {
  const [tokenId, setTokenId] = useState("")

  const router = useRouter()
  useEffect(() => {
    const token = router.query.tokenId
    setTokenId(token as string)
  }, [router.query.tokenId])

  return (
      <>
        <h1>This is the token</h1>
        <p>Token: {tokenId}</p>
      </>
    )
}