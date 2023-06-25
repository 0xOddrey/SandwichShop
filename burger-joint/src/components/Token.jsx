import { useParams } from "react-router-dom";


export default function Token() {
    const params = useParams();


    return (
        <div>
            <h1>Token {params.tokenId}</h1>
        </div>
        
    )
  }
  