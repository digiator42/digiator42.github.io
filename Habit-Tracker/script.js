
let currentDate = new Date();
let habits = loadHabits();

const currentMonthElement = document.getElementById('currentMonth');
const calendarElement = document.getElementById('calendar');
const habitsElement = document.getElementById('habits');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const addHabitButton = document.getElementById('addHabit');

function sanitizeInput(input) {
    const substitutions = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    substituted = input.replace(/[&<>"'/]/g, (match) => substitutions[match]);
    console.log(substituted);
    return substituted;
}

function createpopup(inputId, habitElementName, isAddHabit) {
    console.log(habitElementName);
    console.log(inputId);
    if (document.getElementById('popup')) {
        return;
    }
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded shadow-lg">
                <h2 class="text-lg font-semibold mb-4">${isAddHabit ? "Add" : "Edit"} Habit Name</h2>
                <input type="text" id="${inputId}" class="border p-2 w-full mb-4" placeholder="Enter habit name">
                <p class="text-xs text-red-500 mb-4" id="duplicateHabitName"></p>
                <div class="flex justify-end">
                    <button id="cancelButton" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                    <button id="saveButton" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('cancelButton').addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    document.getElementById('saveButton').addEventListener('click', () => {
        const newHabitName = document.getElementById(inputId).value.trim();
        console.log(`"${newHabitName}"`);
        dublicateHabitNameError = document.getElementById('duplicateHabitName');
        if (newHabitName.length > 25) {
            dublicateHabitNameError.innerHTML = 'Habit name is too long 🤷';
            return;
        }

        const habitExists = habits.find(h => h.name === newHabitName);
        if (habitExists) {
            console.log('Habit already exists');
            dublicateHabitNameError.innerHTML = 'Habit already exists 🤷‍♂️';
            return;
        }

        if (isAddHabit && newHabitName) {
            addHabit(newHabitName);
        } else if (newHabitName) {
            const habit = habits.find(h => h.name === habitElementName);
            habit.name = newHabitName;
            saveHabits();
            renderHabits();
        }

        document.body.removeChild(popup);
    });
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    const habitsData = localStorage.getItem('habits');
    return habitsData ? JSON.parse(habitsData) : [];
}

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    console.log(daysInMonth)
    let daysNames = document.getElementById('days-names');
    let daysNumbers = document.getElementById('days-numbers');

    currentMonthElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    let calendarDaysNames = '';
    let calendarDaysNumbers = '';
    for (let i = 1; i <= daysInMonth; i++) {
        const dayName = new Date(year, month, i).toLocaleString('default', { weekday: 'short' });
        calendarDaysNames += `<div class="text-xs text-center w-8 py-2 border rounded">${dayName}</div>`;
        calendarDaysNumbers += `<div class="text-sm text-center w-8 py-2 border rounded index=${i}">${i}</div>`;
    }
    daysNames.innerHTML = calendarDaysNames;
    daysNumbers.innerHTML = calendarDaysNumbers;
    renderHabits();
}
function renderHabits() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    habitsElement.innerHTML = habits
        .map((habit, index) => {
            const sanitizedHabitName = sanitizeInput(habit.name);
            return `
                <div class="p-4 bg-white rounded shadow">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-semibold mb-2">${sanitizedHabitName}</h3>
                        <div class="flex justify-between items-center">
                            <button id="deleteHabit" class="m-2" onclick="deleteHabit(event)">❌</button>
                            <button id="editHabit" class="m-2" onclick="editHabit(event)">✏️</button>
                        </div>
                    </div>
                    <div class="grid grid-flow-col justify-between gap-1 w-full">
                        ${Array(new Date(year, month, 0).getDate())
                            .fill()
                            .map((_, i) => {
                                const day = i + 1;
                                const isChecked = habit.days[year]?.[month]?.includes(day) || false;
                                return `
                                            <div class="relative group overflow-visible z-11">
                                                <input type="checkbox" index="${index}" data-day="${day}" ${isChecked ? 'checked' : ''} class="w-7 h-6 rounded border-gray-300">
                                                <div class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-gray-600 text-white text-xs px-2 py-1 rounded z-10 transition-opacity duration-300 z-12">
                                                    ${day}
                                                </div>
                                            </div>
                                        `;
                            })
                            .join('')}
                    </div>
                </div>
            `;
        })
        .join('');
}


function addHabit(name) {
    habits.push({ name, days: {} });
    saveHabits();
    renderHabits();
}

function toggleHabitDay(habitIndex, day) {
    const habit = habits[habitIndex];
    console.log(habit);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;


    if (!habit.days[year]) {
        habit.days[year] = {};
    }

    if (!habit.days[year][month]) {
        habit.days[year][month] = [];
    }

    const index = habit.days[year][month].indexOf(day);
    if (index === -1) {
        habit.days[year][month].push(day);
    } else {
        habit.days[year][month].splice(index, 1);
    }

    saveHabits();
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
    createpopup('addHabitInput', null, true);
});

habitsElement.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT') {
        console.log(e.target.tagName);
        const habitIndex = parseInt(e.target.getAttribute('index'));
        const day = parseInt(e.target.getAttribute('data-day'));
        toggleHabitDay(habitIndex, day);
    }
});

document.getElementById('clearData').addEventListener('click', () => {
    localStorage.removeItem('habits');
    habits = [];
    renderHabits();
});

function deleteHabit(event) {
    const habitElement = event.target.closest('.p-4');
    const habitNameElement = habitElement.querySelector('h3');

    habits = habits.filter(h => h.name !== habitNameElement.textContent);
    console.log(habits);

    saveHabits();
    renderHabits();
}

function editHabit(event) {
    const habitElement = event.target.closest('.p-4');
    const habitNameElement = habitElement.querySelector('h3');

    createpopup('editHabitInput', habitNameElement.textContent);
}

renderCalendar(currentDate);