import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Navigation from "./Navigation"
import Submenu from "./Submenu"
import Header from "./Header"

const Layout = ({ children, profile }) => {
	
	const router = useRouter()

	const [ active, setActive ] = useState([])

    useEffect(() => { setActive(router.pathname.split('/')) }, [router])

    return (  
        <div className="grid grid-rows-16 grid-cols-7 grid-flow-col h-screen">
			<Navigation active={active} profile={profile}/>
			<Header/>
			<Submenu active={active} profile={profile}/>
			<div className="row-span-14 col-span-6 p-3 overflow-y-auto">
				{ children }
			</div>
		</div>
    )
}
 
export default Layout;