import { useRouter } from "next/router"
import { useEffect } from "react"

const Staff = () => {

    const router = useRouter()
    
    useEffect(() => { router.push('/ttc/staff/theory') }, [])

    return  null
}

export default Staff