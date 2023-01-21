import { useRouter } from "next/router"
import { useEffect } from "react"

const Curriculum = () => {

    const router = useRouter()

    useEffect(() => { router.push('/ci/curriculum/courses') }, [])

    return null
}
 
export default Curriculum;