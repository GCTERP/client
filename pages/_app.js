import { createContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

import "../styles/index.css"
import "@fontsource/montserrat"

import Layout from "../layouts/Layout"

export const AuthContext = createContext(null)

const App = ({ Component, pageProps }) => {

	const router = useRouter()

	console.log(router.pathname)

	const [ auth, setAuth ] = useState({ status: true, role: "admin" })

	const Auth = useMemo(() => ({ auth, setAuth }), [auth, setAuth])

	useEffect(() => { if(!auth.status) router.push('/auth') }, [])

	const Template = ({ path, props }) => {

		if(path.startsWith('/auth'))
			return <Component {...props}/>
		
		return (
			<Layout profile={path.endsWith('/profile')}>
				<Component {...props}/>
			</Layout>
		)
	}

  	return ( 
    	<AuthContext.Provider value={Auth}>
			<Template path={router.pathname} props={pageProps}/>
    	</AuthContext.Provider>
  	)
}
 
export default App;