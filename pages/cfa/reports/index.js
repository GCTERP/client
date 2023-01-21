import { useRouter } from "next/router"
import { useEffect } from "react"

const Admin = () => {

    const router = useRouter()

    useEffect(() => { router.push('/cfa/reports/internals') }, [])

    return null
}
 
export default Admin;