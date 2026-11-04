import React, { useState, useEffect } from "react";

export default function CountdownTimer({
    targetDate = "2027-04-16T09:00:00",
    label = "EVENT COMMENCES IN",
}) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
    });

    useEffect(() => {
        const calculateTime = () => {
            const difference =
                new Date(targetDate).getTime() - new Date().getTime();
            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true,
                });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const timeBlocks = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-col items-center">
            {label && (
                <div className="text-xs sm:text-sm font-sans tracking-[0.25em] text-[#3e7405] font-bold mb-4 uppercase">
                    {label}
                </div>
            )}
            <div className="grid grid-cols-4 gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-6 w-full max-w-lg mx-auto px-1">
                {timeBlocks.map((block, idx) => (
                    <div
                        key={idx}
                        className="bg-white/95 backdrop-blur-md border border-black/10 rounded-xl sm:rounded-3xl px-2 py-2 sm:px-5 sm:py-4 md:px-6 md:py-5 shadow-sm text-center min-w-0 transform transition hover:scale-105"
                    >
                        <div className="font-heading text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-[#164a08] leading-none">
                            {String(block.value).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] xs:text-[10px] sm:text-xs font-sans tracking-wider text-[#3e7405] font-bold mt-1.5 sm:mt-2 uppercase truncate">
                            {block.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
