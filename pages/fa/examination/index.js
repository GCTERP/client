import { useRouter } from "next/router"
import { useEffect } from "react"

const Examination = () => {

    const router = useRouter()
    
    useEffect(() => { router.push('/fa/examination/hallticket') }, [])

    return  null
}

export default Examination