import Link from "next/link"
import Head from "next/head"

import routes from "../utilities/routes"

const Item = ({ name, route, user, menu, submenu }) => {
    return (
        <Link href={"/" + user + "/" + menu + "/" + route} className={`text-l p-3 px-10 ${submenu == route ? "border-b-2 border-blue-500 font-bold" : "hover:text-blue-500"}`}>
            {name}
        </Link>
    )
}

const Submenu = ({ active, profile }) => {

    const user = active[1], menu = active[2], submenu = active[3]

    const content = routes[user] && routes[user].filter(item => item.route == menu)[0]

    const status = content && content.menu && content.menu.length > 0

    return (  
        <div className={`col-span-6 ${status ? "border-b" : ""} flex`}>
            <Head>
                <title>GCTERP - { active[3] ? active[3].toUpperCase() : active[2] && active[2].toUpperCase() }</title>
            </Head>
        {
            status ? content.menu.map(item => (
                <Item key={item.key} name={item.name} route={item.route} user={user} menu={menu} submenu={submenu ?? ""}/>
            )) : <div className="text-l font-bold p-4">{ profile ? "Profile" : content && content.name }</div>
        }
        </div>
    )
}
 
export default Submenu;