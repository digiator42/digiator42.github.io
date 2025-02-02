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

  let calendarHTML = '';
  for (let i = 1; i <= daysInMonth; i++) {
    calendarHTML += `<div class="text-center py-2 border rounded">${i}</div>`;
  }
  calendarElement.innerHTML = calendarHTML;
}

function renderHabits() {
  habitsElement.innerHTML = habits
    .map(
      (habit, index) => `
      <div class="p-4 bg-white rounded shadow">
        <h3 class="font-semibold">${habit.name}</h3>
        <div class="grid grid-flow-col gap-1.2 mt-2">
          ${Array(31)
            .fill()
            .map(
              (_, i) =>
                `<button data-habit-index="${index}" data-day="${i + 1}" class="p-2 border rounded ${
                  habit.days.includes(i + 1) ? 'bg-green-500' : 'bg-gray-200'
                }"></button>`
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');
}

function addHabit(name) {
  habits.push({ name, days: [] });
  renderHabits();
}

function toggleHabitDay(habitIndex, day) {
  const habit = habits[habitIndex];
  const index = habit.days.indexOf(day);
  if (index === -1) {
    habit.days.push(day);
  } else {
    habit.days.splice(index, 1);
  }
  renderHabits();
}

prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

addHabitButton.addEventListener('click', () => {
  const habitName = prompt('Enter a new habit:');
  if (habitName) {
    addHabit(habitName);
  }
});

habitsElement.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const habitIndex = e.target.getAttribute('data-habit-index');
    const day = parseInt(e.target.getAttribute('data-day'));
    toggleHabitDay(habitIndex, day);
  }
});

renderCalendar(currentDate);