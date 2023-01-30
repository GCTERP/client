import { createContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import "../styles/index.css"
import "@fontsource/montserrat"

import Layout from "../layouts/Layout"
import Authentication from "../auth"

export const AuthContext = createContext(null)

const App = ({ Component, pageProps }) => {

	const router = useRouter()

	let user = router.pathname.split('/')[1]

	const [ auth, setAuth ] = useState({ status: true, primaryRole: "admin", roles: [ "admin", "ttc", "fa", "ci" ] })

	const Auth = useMemo(() => ({ auth, setAuth }), [auth, setAuth])

	useEffect(() => {

		if(!auth.status) router.push('/')

		const valid = user == "" || (user == "student" && auth.primaryRole == "student") || auth.roles.some(ele => ele == user)

		if(!valid) router.push('/')

	}, [ ])

  	return ( 
		auth.status ?
    	<AuthContext.Provider value={Auth}>
			<Layout profile={router.pathname.endsWith('/profile')}>
				<Component {...pageProps}/>
			</Layout>
    	</AuthContext.Provider> : <Authentication />
  	)
}
 
export default App;