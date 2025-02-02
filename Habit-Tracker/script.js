let currentDate = new Date();
let habits = [];

const currentMonthElement = document.getElementById('currentMonth');
const calendarElement = document.getElementById('calendar');
const habitsElement = document.getElementById('habits');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const addHabitButton = document.getElementById('addHabit');

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    currentMonthElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    for (let i = 1; i <= daysInMonth; i++) {
        calendarHTML += `<div class="text-center py-2 border rounded">${i}</div>`;
    }
    calendarElement.innerHTML = calendarHTML;
}

renderCalendar(currentDate);