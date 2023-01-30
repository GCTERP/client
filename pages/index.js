import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

import { AuthContext } from "./_app"

const Home = () => {

	const router = useRouter()

	const { auth } = useContext(AuthContext)

	useEffect(() => { auth.status && router.push("/" + auth.primaryRole) }, [])

	return null
}

export default Home