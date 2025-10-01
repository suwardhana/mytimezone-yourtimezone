function updateTimes() {
    const now = new Date();
    
    // My Time (Jakarta - UTC+7)
    const myTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    document.getElementById('myTime').textContent = myTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // UTC Time
    const utcTime = new Date(now.toLocaleString("en-US", {timeZone: "UTC"}));
    document.getElementById('utcTime').textContent = utcTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // EST Time (UTC-5)
    const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    document.getElementById('estTime').textContent = estTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Update immediately and then every second
updateTimes();
setInterval(updateTimes, 1000);