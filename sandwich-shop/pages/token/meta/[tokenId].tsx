import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Token: {router.query.tokenId}</p>
}