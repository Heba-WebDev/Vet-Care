
function getCurrentDateTime(): { date: string; time: string } {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // Format: yyyy-mm-dd
    const currentTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }); // Format: hh:mm:ss

    return { date: currentDate, time: currentTime };
}

export { getCurrentDateTime }
