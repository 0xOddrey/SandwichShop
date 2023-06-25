import { useParams } from 'react-router';


export default function Token() {

    const params= useParams()
    if(params.tokenId){
        console.log(params.tokenId)
    }
    return (
        <div >
           <h1>Token 1</h1>
        </div>
    )
 
}