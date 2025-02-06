const currentMonthElement = document.getElementById('currentMonth');
const calendarElement = document.getElementById('calendar');
const habitsElement = document.getElementById('habits');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const addHabitButton = document.getElementById('addHabit');

const randomHabits = [
    "Get out of bed before noon",
    "Shower at least once a week",
    "Do something instead of nothing",
    "Clean my room once a month",
];

let currentDate = new Date();
let habits = loadHabits();
let notes = loadNotes();

function sanitizeInput(input) {
    const substitutions = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    if (!input || !isNaN(input)) {
        return;
    }
    substituted = input.replace(/[&<>"'/]/g, (match) => substitutions[match]);
    return substituted;
}

function createpopup(inputId, habitElementName, isAddHabit = false) {
    if (document.getElementById('popup')) {
        return;
    }
    const targetElement = `
        <h2 class="text-lg font-semibold mb-2">Target</h2>
        <input type="number" id="${inputId + 'Target'}" class="border p-2 w-1/2 mb-4" placeholder="Enter target">
    `;
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.innerHTML = `
        <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div class="bg-white px-16 py-4 rounded shadow-lg">
                <h2 class="text-lg font-semibold mb-2">${isAddHabit ? "Add Name*" : "Edit Name"}</h2>
                <input type="text" id="${inputId}" class="border p-2 w-full mb-4" placeholder="Enter name">
                ${inputId !== "editNoteInput" ? targetElement : ''}
                <p class="text-xs text-red-500 mb-4" id="error"></p>
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
    // edit notes
    if (inputId === "editNoteInput") {
        document.getElementById('saveButton').addEventListener('click', () => {
            let NoteElementName = document.getElementById(inputId).value.trim();
            if (NoteElementName) {
                const noteIndex = notes.indexOf(habitElementName);
                if (noteIndex !== -1) {
                    notes[noteIndex] = NoteElementName;
                    saveNotes();
                    renderNotes();
                }
            }
            document.body.removeChild(popup);
        });
        return;
    }
    // add or edit habit
    document.getElementById('saveButton').addEventListener('click', () => {
        const newHabitName = document.getElementById(inputId).value.trim();
        const newHabitTarget = document.getElementById(`${inputId}` + 'Target').value.trim();
        errorText = document.getElementById('error');

        if (newHabitName.length > 25) {
            errorText.innerHTML = 'Habit name is too long';
            return;
        }

        const habitExists = habits.find(h => h.name === newHabitName);
        if (habitExists) {
            dublicateHabitNameError.innerHTML = 'Habit already exists 🤷‍♂️';
            return;
        }

        const maxDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        if (parseInt(newHabitTarget) > maxDaysInMonth) {
            errorText.innerHTML = `Target cannot be more than ${maxDaysInMonth} days`;
            return;
        }

        const habit = habits.find(h => h.name === habitElementName);
        if (!habit) {
            if (!newHabitName) {
                errorText.innerHTML = 'Habit name is required 🤷';
                return;
            }
            addHabit(newHabitName, parseInt(newHabitTarget) || 0);
        } else {
            newHabitName && (habit.name = newHabitName);
            parseInt(newHabitTarget) && (habit.target = newHabitTarget);
            saveHabits();
            renderHabits();
        }

        document.body.removeChild(popup);
    });
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadHabits() {
    const habitsData = localStorage.getItem('habits');
    return habitsData ? JSON.parse(habitsData) : [];
}

function loadNotes() {
    const notesData = localStorage.getItem('notes');
    return notesData ? JSON.parse(notesData) : [];
}

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let daysNames = document.getElementById('days-names');
    let daysNumbers = document.getElementById('days-numbers');

    currentMonthElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    let calendarDaysNames = '';
    let calendarDaysNumbers = '';
    for (let i = 1; i <= daysInMonth; i++) {
        const dayName = new Date(year, month, i).toLocaleString('default', { weekday: 'short' });
        calendarDaysNames += `<div class="text-xs text-center w-11 py-2 border rounded">${dayName}</div>`;
        calendarDaysNumbers += `<div class="text-sm text-center w-11 py-2 border rounded index=${i}">${i}</div>`;
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
            if (!habit.days) {
                habit.days = {};
            }
            const habitDays = habit.days[year]?.[month] || [];
            if (!habit.name) {
                habit.name = randomHabits[Math.floor(Math.random() * randomHabits.length)];
            }
            const sanitizedHabitName = sanitizeInput(habit.name);
            const target = isNaN(habit.target) ? 0 : habit.target;
            return `
                <div class="p-4 bg-white rounded shadow">
                    <div class="flex relative justify-between items-center mb-4">
                        <h3 class="font-semibold mb-2">${sanitizedHabitName}</h3>
                        <div class="flex absolute gap-1 left-1/2 transform -translate-x-1/2">
                            <div class="flex flex-col items-center gap-1">
                                <p id="achievedText" class="text-xm ">Achieved</p>
                                <div class="flex items-center gap-1">
                                <p id="achievedTarget" class="text-xm text-gray-600">${habitDays.length >= target ? '✅' : ''}</p>
                                <p id="achieved" class="text-xm text-gray-600">${habitDays.length}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center mx-3">
                                <div class="border-l-2 border-gray-500 h-full"></div>
                            </div>
                            <div class="flex flex-col items-center gap-1">
                                <p id="target" class="text-xm text-gray-600">Target</p>
                                <p id="target" class="text-xm text-gray-600">${target}</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <button id="deleteHabit" class="m-2" onclick="deleteHabit(event)">❌</button>
                            <button id="editHabit" class="m-2" onclick="editHabit(event)">✏️</button>
                        </div>
                    </div>
                    <div class="grid grid-flow-col justify-between gap-1 max-w-full min-w-0">
                        ${Array(new Date(year, month, 0).getDate())
                            .fill()
                            .map((_, i) => {
                                const day = i + 1;
                                const isChecked = habitDays.includes(day);
                                return `
                                    <div class="relative group flex-wrap min-w-0 z-11">
                                        <input type="checkbox" index="${index}" data-day="${day}" ${isChecked ? 'checked' : ''} class="w-10 h-10 max-w-full min-w-0 mt-0 border-gray-300">
                                        <div class="absolute bottom-full mb-1 w-10 opacity-0 group-hover:opacity-100 bg-gray-600 text-white text-xs text-center py-1 max-w-full min-w-0 rounded transition-opacity duration-300 z-14">
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


function addHabit(name, target) {
    habits.push({ name, days: {}, target });
    saveHabits();
    renderHabits();
}

function updateHabit(habitIndex, day) {
    const habit = habits[habitIndex];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    if (habit.days[year] === undefined) {
        habit.days = {};
    }
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
        const habitIndex = parseInt(e.target.getAttribute('index'));
        const day = parseInt(e.target.getAttribute('data-day'));
        updateHabit(habitIndex, day);
        renderHabits();
    }
});

document.getElementById('clearHabits').addEventListener('click', () => {
    localStorage.removeItem('habits');
    habits = [];
    renderHabits();
});

document.getElementById('clearNotes').addEventListener('click', () => {
    localStorage.removeItem('notes');
    notes = [];
    renderNotes();
});

document.getElementById('exportData').addEventListener('click', () => {
    const combinedDataStr = JSON.stringify({ habits, notes }, null, 4);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(combinedDataStr);

    const filename = 'habits.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
    linkElement.remove();
});

document.getElementById('importData').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                habits = importedData['habits'];
                notes = importedData['notes'];
                if (Array.isArray(habits) || Array.isArray(notes)) {
                    saveHabits();
                    saveNotes();
                    renderHabits();
                    renderNotes();
                } else {
                    alert('Invalid data format');
                }
            } catch (error) {
                alert('Error parsing JSON data');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid JSON file');
    }
    event.target.value = '';
});

function deleteHabit(event) {
    const habitElement = event.target.closest('.p-4');
    const habitNameElement = habitElement.querySelector('h3');

    habits = habits.filter(h => h.name !== habitNameElement.textContent);

    saveHabits();
    renderHabits();
}

function editHabit(event) {
    const habitElement = event.target.closest('.p-4');
    const habitNameElement = habitElement.querySelector('h3');

    createpopup('editHabitInput', habitNameElement.textContent);
}

function deleteNote(event) {
    const noteElement = event.target.closest('.p-4');
    const noteNameElement = noteElement.querySelector('p');
    const index = notes.indexOf(noteNameElement.textContent);
    if (index !== -1) {
        notes.splice(notes.indexOf(noteNameElement.textContent), 1);
        saveNotes();
        renderNotes();
    }
}

function editNote(event) {
    const noteElement = event.target.closest('.p-4');
    const noteNameElement = noteElement.querySelector('p');

    createpopup('editNoteInput', noteNameElement.textContent);
}

document.getElementById('saveNotes').addEventListener('click', () => {
    const notesInput = document.getElementById('notesInput').value.trim();
    if (notesInput) {
        notes.push(notesInput);
        saveNotes();
        renderNotes();
        document.getElementById('notesInput').value = '';
    }
});

function renderNotes() {
    const notesElement = document.getElementById('notes');
    notesElement.innerHTML = notes.map((note, index) => {
        if (!note) {
            note = "Secret Note🤫: I am a script kiddie";
            notes[index] = note;
        }
        return `
            <div class="p-4 relative w-full border rounded-lg mb-2">
                <div class="absolute right-0">
                    <button id="deleteNote" class="m-2" onclick="deleteNote(event)">❌</button>
                    <button id="editNote" class="m-2" onclick="editNote(event)">✏️</button>
                </div>
                <p>${sanitizeInput(note)}</p>
            </div>
        `;
    }).join('');
}

renderCalendar(currentDate);
renderNotes();