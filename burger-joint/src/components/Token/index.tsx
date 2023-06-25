import { useParams } from 'react-router';


export default function Token() {
    const params= useParams()
    console.log(params.tokenId)
    return (
        <div >
           <h1>Token {params.tokenId}</h1>
        </div>
    )

}