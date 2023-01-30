import Image from "next/image"
import Link from "next/link"

import routes from "../utilities/routes"
import Icon from "../utilities/Icon"
import logo from "../public/logo.svg"

const Title = () => {
    return ( 
        <div className="flex place-content-center border-r">
            <div className="grid place-content-center w-1/3">
                <Image src={logo} width={25} height={25} alt="GCT"/>
            </div>
            <div className="grid items-center w-2/3 text-xl font-black">
                <span>GCTERP</span>
            </div>
        </div>
    )
}

const Credits = () => {
    return ( 
        <div className="flex place-content-center border-r cursor-pointer">
            <div className="grid place-content-center w-1/3 text-slate-400">
                <Icon name="groups"/>
            </div>
            <div className="grid items-center w-2/3 text-slate-400">
                <span>By Students</span>
            </div>
        </div>
    )
}

const User = ({role}) => {

    const roles = { admin: "Admin", cfa: "Chief Faculty Advisor", hod: "Head of the Department", pc: "Programme Coordinator", ttc: "Timetable Coordinator", fa: "Faculty Advisor", ci: "Course Incharge", student: "Student" }

    return ( 
        <div className="flex place-content-center group border-b border-r cursor-pointer pb-1">
            <div className="w-1/3 grid place-content-center">
                <Icon name="account_circle" outline/>
            </div>
            <div className="grid items-center w-2/3">
                <div className="text-xs font-bold group-hover:text-blue-500">
                    Vishal Pranav RB
                </div>
                <div className={`text-${roles[role] && (roles[role].length > 20 ? '[11px]' : 'xs')}`}>
                    {roles[role]}
                </div>
            </div>
        </div>
    )
}

const NavItem = ({ name, icon, route, active }) => {
	return (
		<Link href={"/" + active[1] + "/" + route} className={`flex place-content-center group ${active[2] == route && "bg-blue-50 border-r-2 border-blue-500"} py-2 cursor-pointer`}>
			<div className={`grid place-content-center w-1/3 group-hover:text-blue-500 ${active[2] == route && "text-blue-500"}`}>
				<Icon name={icon} fill={active[2] == route}/>
			</div>
			<div className={`grid items-center w-2/3 group-hover:text-blue-500 ${active[2] == route && "text-blue-500"}`}>
				<span>{name}</span>
			</div>
		</Link>
	)
}

const Navigation = ({ active, profile }) => {
    return (<>        
        <Title/>
        <div className="border-r"></div>
        <User role={active[1]}/>
        <div className="row-span-12 pt-5 border-b border-r">
        {   
            active[2] && routes[active[1]].map(action => (
                <NavItem key={action.key} name={action.name} icon={action.icon} route={action.route} active={active}/>
            ))
        }   
        </div>
        <Credits/>
    </>)
}

export default Navigation;