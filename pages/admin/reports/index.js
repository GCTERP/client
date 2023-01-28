import { useRouter } from "next/router"
import { useEffect } from "react"

const Reports = () => {

    const router = useRouter()
    
    useEffect(() => { router.push('/admin/reports/internals') }, [])

    return  null
}

export default Reports