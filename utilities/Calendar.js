import { useState } from 'react'
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameMonth, isToday, parse, startOfToday } from 'date-fns'

import Icon from "../utilities/Icon.js"

/**
 * All-in-one Calendar Component
 * @param selectDate @type Function - React `setState` method signature 
 */
const Calendar = ({ selectDate }) => {

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({ start: firstDayCurrentMonth, end: endOfMonth(firstDayCurrentMonth) })

    const previousMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    return (
        <div className="w-fit">
            <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900 pl-1">{ format(firstDayCurrentMonth, 'MMMM yyyy') }</h2>
                <button type="button" onClick={() => previousMonth()} className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                    <Icon name="chevron_left"/>
                </button>
                <button type="button" onClick={() => nextMonth()} className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                    <Icon name="chevron_right"/>
                </button>
            </div>
            <div className="grid grid-cols-7 mt-4 text-xs leading-6 text-center text-gray-500">
                { ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div>{ day }</div>) }
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
            {
                days.map((day, dayIdx) => (
                    <div key={day.toString()} className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1.5')}>
                        <button type="button" onClick={() => { setSelectedDay(day); selectDate(day) }}
                            className={classNames(
                            isEqual(day, selectedDay) && 'text-white',
                            !isEqual(day, selectedDay) &&
                                isToday(day) &&
                                'border border-blue-500 font-light',
                            !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-900',
                            !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                !isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-400',
                            isEqual(day, selectedDay) && isToday(day) && 'bg-blue-500',
                            isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                'bg-blue-500',
                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                            (isEqual(day, selectedDay) || isToday(day)) &&
                                'font-semibold',
                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                            )}>
                            <time dateTime={format(day, 'yyyy-MM-dd')}>{ format(day, 'd') }</time>
                        </button>
                    </div>))
            }
            </div>
        </div>
    )
}

const classNames = (...classes) => classes.filter(Boolean).join(' ')

const colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

export default Calendar