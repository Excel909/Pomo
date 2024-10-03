/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./wbund/calender.js":
/*!***************************!*\
  !*** ./wbund/calender.js ***!
  \***************************/
/***/ (() => {

eval("window.onload = () => {\r\n    const userName = document.querySelector('.user-name');\r\n    const profilePic = document.querySelector('.user-pic');\r\n\r\n    fetch(`user-name`)\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        userName.innerHTML = data.user;\r\n        profilePic.setAttribute('src',`data:${data.ptype};base64,${data.profile}`);\r\n    })\r\n    .catch(err => console.log(err.message));\r\n};\r\n\r\nconst months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\r\n\r\nlet Month = new Date().getMonth();\r\nlet Year = new Date().getFullYear();\r\n\r\nconst updateCalendar = () => {\r\n    let month = document.querySelector('.month');\r\n    let year = document.querySelector('.year');\r\n\r\n    month.textContent = months[Month];\r\n    year.textContent = `${Year}`;\r\n};\r\n\r\nconst createDays = async () => {\r\n    const daysInMonth = new Date(Year, Month + 1, 0).getDate();\r\n    const dayBox_holder = document.querySelector('.cal-days');\r\n\r\n    dayBox_holder.innerHTML = '';\r\n\r\n    // Fetching my tasks\r\n    const response = await fetch(`/tasks?year=${Year}&month=${Month + 1}`);\r\n    const tasks = await response.json();\r\n\r\n    const taskMap = {};\r\n    tasks.forEach(task => {\r\n        const taskDate = new Date(task.duedate);\r\n        const dateString = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, '0')}-${String(taskDate.getDate()).padStart(2, '0')}`;\r\n\r\n        if (!taskMap[dateString]) taskMap[dateString] = [];\r\n        taskMap[dateString].push(task);\r\n    });\r\n\r\n    // Add previous month days\r\n    const firstDay = new Date(Year, Month, 1).getDay();\r\n    const offset = (firstDay === 0) ? 6 : firstDay - 1;\r\n\r\n    const prevMonth = Month === 0 ? 11 : Month - 1; \r\n    const lastDayPrevMonth = new Date(Year, Month, 0).getDate(); \r\n\r\n    for (let i = 0; i < offset; i++) {\r\n        const dayBox = document.createElement('div');\r\n        dayBox.classList.add('cal-day', 'prev-month-day'); \r\n        dayBox.textContent = lastDayPrevMonth - offset + i + 1; \r\n        dayBox_holder.append(dayBox);\r\n    }\r\n\r\n    // Creating current month days\r\n    for (let i = 0; i < daysInMonth; i++) {\r\n        const dayBox = document.createElement('div');\r\n        dayBox.classList.add('cal-day');\r\n        dayBox.textContent = i + 1;\r\n        dayBox_holder.append(dayBox);\r\n\r\n        const dateString = `${Year}-${String(Month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;\r\n\r\n        if (taskMap[dateString]) {\r\n            dayBox.classList.add('cal-task-day');\r\n\r\n            dayBox.addEventListener('mouseover', () => {\r\n                taskMap[dateString].forEach(task => {\r\n                    const pop_display = document.getElementById('c-d');\r\n\r\n                    task.priority = task.priority === true ? 'Yes' : 'No';\r\n\r\n                    const createdDate = new Date(task.createdAt);\r\n                    const createdDay = createdDate.toDateString();\r\n\r\n                    const dueDate = new Date(task.duedate);\r\n                    const dueDay = dueDate.toDateString(); // Corrected variable name\r\n\r\n                    pop_display.innerHTML = \r\n                        `Task title: ${task.title} <br> \r\n                        Created On: ${createdDay} <br>\r\n                        Priority: ${task.priority} <br>\r\n                        Due Before: ${dueDay}`;\r\n                });\r\n            });\r\n\r\n            dayBox.addEventListener('mouseleave', () => {\r\n                const pop_display = document.getElementById('c-d');\r\n                pop_display.textContent = ''; // Clear the pop display\r\n            });\r\n        }\r\n    }\r\n};\r\n\r\n// Previous and Next Buttons config\r\n\r\nconst prevBtn = () => {\r\n    Month--;\r\n    if (Month < 0) {\r\n        Month = 11;\r\n        Year--;\r\n    }\r\n    updateCalendar();\r\n    createDays();\r\n};\r\n\r\nconst prevbtn = document.getElementById('cal-prev');\r\nprevbtn.addEventListener('click', prevBtn);\r\n\r\n// Next button\r\nconst nextBtn = () => {\r\n    Month++;\r\n    if (Month > 11) {\r\n        Month = 0;\r\n        Year++;\r\n    }\r\n    updateCalendar();\r\n    createDays();\r\n};\r\n\r\nconst nextbtn = document.getElementById('cal-next');\r\nnextbtn.addEventListener('click', nextBtn);\r\n\r\nupdateCalendar();\r\ncreateDays();\r\n\n\n//# sourceURL=webpack://pomo/./wbund/calender.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./wbund/calender.js"]();
/******/ 	
/******/ })()
;