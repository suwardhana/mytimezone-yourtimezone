let isSliderMode = false;
let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let showYourTime = false;

function getIcon(hour) {
    return (hour >= 6 && hour < 18) ? '☀️' : '🌙';
}

function checkTimezonesDifferent() {
    const now = new Date();
    const jakartaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    const userTime = new Date(now.toLocaleString("en-US", {timeZone: userTimezone}));
    
    showYourTime = jakartaTime.getTime() !== userTime.getTime();
    const timeGrid = document.getElementById('timeGrid');
    
    if (showYourTime) {
        document.getElementById('yourTimeCard').style.display = 'block';
        document.getElementById('yourLocation').textContent = userTimezone.replace('_', ' ');
        timeGrid.className = 'time-grid four-cards';
    } else {
        document.getElementById('yourTimeCard').style.display = 'none';
        timeGrid.className = 'time-grid three-cards';
    }
}

function updateTimes(jakartaHour = null) {
    isSliderMode = jakartaHour !== null;
    
    if (isSliderMode) {
        // Slider mode - calculate all times based on Jakarta slider value
        const jakartaHourValue = jakartaHour;
        const userOffset = getTimezoneOffset(userTimezone) - 7;
        
        // Your Time
        if (showYourTime) {
            const yourHour = (jakartaHourValue + userOffset + 24) % 24;
            const yourTime = new Date();
            yourTime.setHours(yourHour, (jakartaHourValue % 1) * 60, 0, 0);
            
            document.getElementById('yourTime').textContent = yourTime.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            document.getElementById('yourIcon').textContent = getIcon(yourHour);
        }
        
        // Jakarta Time
        const jakartaTime = new Date();
        jakartaTime.setHours(jakartaHourValue, (jakartaHourValue % 1) * 60, 0, 0);
        
        document.getElementById('myTime').textContent = jakartaTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('myIcon').textContent = getIcon(jakartaHourValue);
        
        // UTC Time
        const utcHour = (jakartaHourValue - 7 + 24) % 24;
        const utcTime = new Date();
        utcTime.setHours(utcHour, (jakartaHourValue % 1) * 60, 0, 0);
        
        document.getElementById('utcTime').textContent = utcTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('utcIcon').textContent = getIcon(utcHour);
        
        // EST Time
        const estHour = (jakartaHourValue - 12 + 24) % 24;
        const estTime = new Date();
        estTime.setHours(estHour, (jakartaHourValue % 1) * 60, 0, 0);
        
        document.getElementById('estTime').textContent = estTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('estIcon').textContent = getIcon(estHour);
    } else {
        // Real-time mode - use actual timezone times
        const now = new Date();
        
        // Your Time
        if (showYourTime) {
            const yourTime = new Date(now.toLocaleString("en-US", {timeZone: userTimezone}));
            document.getElementById('yourTime').textContent = yourTime.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            document.getElementById('yourIcon').textContent = getIcon(yourTime.getHours());
        }
        
        // Jakarta Time
        const jakartaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
        document.getElementById('myTime').textContent = jakartaTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('myIcon').textContent = getIcon(jakartaTime.getHours());
        
        // UTC Time
        const utcTime = new Date(now.toLocaleString("en-US", {timeZone: "UTC"}));
        document.getElementById('utcTime').textContent = utcTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('utcIcon').textContent = getIcon(utcTime.getHours());
        
        // EST Time
        const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        document.getElementById('estTime').textContent = estTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('estIcon').textContent = getIcon(estTime.getHours());
    }
}

function getTimezoneOffset(timezone) {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const target = new Date(utc.toLocaleString('en-US', {timeZone: timezone}));
    return Math.round((target.getTime() - utc.getTime()) / (1000 * 60 * 60));
}

// Slider functionality
const slider = document.getElementById('timeSlider');
const sliderValue = document.getElementById('sliderValue');

slider.addEventListener('input', function() {
    const hour = parseFloat(this.value);
    const minutes = Math.floor((hour % 1) * 60);
    const displayHour = Math.floor(hour);
    
    sliderValue.textContent = `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    updateTimes(hour);
});

// Initialize
checkTimezonesDifferent();

const now = new Date();
const currentJakartaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
const currentHour = currentJakartaTime.getHours() + currentJakartaTime.getMinutes() / 60;
slider.value = currentHour;
sliderValue.textContent = `${currentJakartaTime.getHours().toString().padStart(2, '0')}:${currentJakartaTime.getMinutes().toString().padStart(2, '0')}`;

updateTimes();
setInterval(() => {
    if (!isSliderMode) updateTimes();
}, 1000);