import { useRouter } from "next/router"
import { useEffect } from "react"

const Admin = () => {

    const router = useRouter()

    useEffect(() => { router.push('/student/internals/theory') }, [])

    return null
}
 
export default Admin;