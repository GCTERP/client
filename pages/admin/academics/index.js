import { useRouter } from "next/router"
import { useEffect } from "react"

const Academics = () => {

    const router = useRouter()
    
    useEffect(() => { router.push('/admin/academics/semester') }, [])

    return  null
}

export default Academics