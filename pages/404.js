import { useRouter } from "next/router"
import { useEffect } from "react"

const Error = () => {

    const router = useRouter()

    useEffect(() => { router.push('/') }, [])

    return null;
}
 
export default Error;