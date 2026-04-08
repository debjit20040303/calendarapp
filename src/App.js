import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar() {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
	
    // State to handle the "Page Turn" animation class
    const [flipClass, setFlipClass] = useState("");

	const turnPage = (offset) => {
		// 1. Trigger the "lifting" or "turning" animation
        // We use rotateY for a vertical page turn (like a book)
		setFlipClass(offset > 0 ? "[transform:rotateY(-20deg)_translateX(-10px)] opacity-50" : "[transform:rotateY(20deg)_translateX(10px)] opacity-50");
		
		// 2. Change the data after a slight delay so it feels like it happened mid-turn
		setTimeout(() => {
            setToday(today.month(today.month() + offset));
        }, 150);
		
		// 3. Reset the "book" back to flat on the wall
		setTimeout(() => {
			setFlipClass("");
		}, 400);
	};

	return (
		/* Sea Blue Wall Background */
		<div className="min-h-screen bg-[#006994] flex flex-col justify-center items-center p-4 [perspective:1000px]">
			
			{/* Hanging Nail */}
			<div className="w-3 h-3 bg-gray-500 rounded-full shadow-inner mb-[-6px] z-10 border-b border-gray-700"></div>
			
			{/* The Calendar "Book" Container */}
			<div className={cn(
                "w-full max-w-md bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] rounded-lg overflow-hidden border-t-8 border-gray-900 transition-all duration-500 ease-in-out origin-left",
                flipClass
            )}>
				
				<div className="h-72 relative overflow-hidden">
					<img 
						src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000" 
						alt="Sea Horizon" 
						className="w-full h-full object-cover"
					/>
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
						<h1 className="text-3xl font-bold tracking-tighter uppercase italic">
							{months[today.month()]} {today.year()}
						</h1>
					</div>
				</div>

				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<div className="flex gap-4 items-center">
							<GrFormPrevious
								className="w-8 h-8 cursor-pointer hover:bg-blue-50 p-1 rounded-full transition-all"
								onClick={() => turnPage(-1)}
							/>
							<button
								className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 border-2 border-gray-900 rounded-md hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
								onClick={() => {
                                    setFlipClass("scale-95");
                                    setToday(currentDate);
                                    setTimeout(() => setFlipClass(""), 300);
                                }}
							>
								Today
							</button>
							<GrFormNext
								className="w-8 h-8 cursor-pointer hover:bg-blue-50 p-1 rounded-full transition-all"
								onClick={() => turnPage(1)}
							/>
						</div>
					</div>

					{/* Days Header */}
					<div className="grid grid-cols-7 mb-4 border-b pb-2">
						{days.map((day, index) => (
							<h1 key={index} className="text-[11px] font-black text-center text-blue-900/40 uppercase">
								{day}
							</h1>
						))}
					</div>

					{/* Date Grid */}
					<div className="grid grid-cols-7 gap-y-2">
						{generateDate(today.month(), today.year()).map(
							({ date, currentMonth, today: isToday }, index) => (
								<div key={index} className="h-10 flex items-center justify-center">
									<h1
										className={cn(
											currentMonth ? "text-gray-900" : "text-gray-200",
											isToday ? "text-red-600 font-bold underline decoration-2 underline-offset-4" : "",
											selectDate.toDate().toDateString() === date.toDate().toDateString()
												? "bg-blue-600 text-white shadow-lg scale-110"
												: "hover:bg-gray-100",
											"h-9 w-9 rounded-full grid place-content-center transition-all cursor-pointer select-none text-sm"
										)}
										onClick={() => setSelectDate(date)}
									>
										{date.date()}
									</h1>
								</div>
							)
						)}
					</div>
				</div>

				{/* Bottom Note Area */}
				<div className="bg-blue-50/50 p-6 border-t-2 border-blue-100 border-dashed">
					<h2 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">
						Appointments • {selectDate.format("DD MMM")}
					</h2>
					<p className="text-sm text-gray-500 font-medium">Nothing scheduled.</p>
				</div>
			</div>
		</div>
	);
}