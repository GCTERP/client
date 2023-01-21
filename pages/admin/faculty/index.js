import { useRouter } from "next/router"
import { useEffect } from "react"

const Faculty = () => {

    const router = useRouter()
    
    useEffect(() => { router.push('/admin/faculty/roles') }, [])

    return  null
}

export default Faculty