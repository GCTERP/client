import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

import { AuthContext } from "./_app"

const Home = () => {

	const router = useRouter()

	const { auth } = useContext(AuthContext)
	
	console.log(router.pathname)

	useEffect(() => { 
		
		auth.status ? router.push("/" + auth.role) : router.push('/auth')

	}, [])

	return null
}

export default Home