window.onload = () => {
    const userName = document.querySelector('.user-name');
    const profilePic = document.querySelector('.user-pic');

    fetch(`user-name`)
    .then(response => response.json())
    .then(data => {
        userName.innerHTML = data.user;
        profilePic.setAttribute('src',`data:${data.ptype};base64,${data.profile}`);
    })
    .catch(err => console.log(err.message));
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let Month = new Date().getMonth();
let Year = new Date().getFullYear();

const updateCalendar = () => {
    let month = document.querySelector('.month');
    let year = document.querySelector('.year');

    month.textContent = months[Month];
    year.textContent = `${Year}`;
};

const createDays = async () => {
    const daysInMonth = new Date(Year, Month + 1, 0).getDate();
    const dayBox_holder = document.querySelector('.cal-days');

    dayBox_holder.innerHTML = '';

    // Fetching my tasks
    const response = await fetch(`/tasks?year=${Year}&month=${Month + 1}`);
    const tasks = await response.json();

    const taskMap = {};
    tasks.forEach(task => {
        const taskDate = new Date(task.duedate);
        const dateString = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, '0')}-${String(taskDate.getDate()).padStart(2, '0')}`;

        if (!taskMap[dateString]) taskMap[dateString] = [];
        taskMap[dateString].push(task);
    });

    // Add previous month days
    const firstDay = new Date(Year, Month, 1).getDay();
    const offset = (firstDay === 0) ? 6 : firstDay - 1;

    const prevMonth = Month === 0 ? 11 : Month - 1; 
    const lastDayPrevMonth = new Date(Year, Month, 0).getDate(); 

    for (let i = 0; i < offset; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('cal-day', 'prev-month-day'); 
        dayBox.textContent = lastDayPrevMonth - offset + i + 1; 
        dayBox_holder.append(dayBox);
    }

    // Creating current month days
    for (let i = 0; i < daysInMonth; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('cal-day');
        dayBox.textContent = i + 1;
        dayBox_holder.append(dayBox);

        const dateString = `${Year}-${String(Month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;

        if (taskMap[dateString]) {
            dayBox.classList.add('cal-task-day');

            dayBox.addEventListener('mouseover', () => {
                taskMap[dateString].forEach(task => {
                    const pop_display = document.getElementById('c-d');

                    task.priority = task.priority === true ? 'Yes' : 'No';

                    const createdDate = new Date(task.createdAt);
                    const createdDay = createdDate.toDateString();

                    const dueDate = new Date(task.duedate);
                    const dueDay = dueDate.toDateString(); // Corrected variable name

                    pop_display.innerHTML = 
                        `Task title: ${task.title} <br> 
                        Created On: ${createdDay} <br>
                        Priority: ${task.priority} <br>
                        Due Before: ${dueDay}`;
                });
            });

            dayBox.addEventListener('mouseleave', () => {
                const pop_display = document.getElementById('c-d');
                pop_display.textContent = ''; // Clear the pop display
            });
        }
    }
};

// Previous and Next Buttons config

const prevBtn = () => {
    Month--;
    if (Month < 0) {
        Month = 11;
        Year--;
    }
    updateCalendar();
    createDays();
};

const prevbtn = document.getElementById('cal-prev');
prevbtn.addEventListener('click', prevBtn);

// Next button
const nextBtn = () => {
    Month++;
    if (Month > 11) {
        Month = 0;
        Year++;
    }
    updateCalendar();
    createDays();
};

const nextbtn = document.getElementById('cal-next');
nextbtn.addEventListener('click', nextBtn);

updateCalendar();
createDays();
