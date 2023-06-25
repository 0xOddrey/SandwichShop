import { useParams } from "react-router-dom";

export default function Token() {
const params = useParams();
const { tokeinId } = params;
  return (
   <h1>Token {tokeinId} </h1>
  );
}
