window.onload = () => {
    fetch(`due-tasks`)
    .then(response => response.json())
    .then(data => {
        let notBox = document.getElementById('notify');
        let notNum = document.querySelector('.n-num');

        notNum.textContent = data.length; // Display the number of due tasks

        if(data.length < 1){
            let absense = `
                <div class='ab-text'>
                    No Notifications <span class="ab-icon"><i class="fa-solid fa-bell"></i></i></span>
                </div>
            `;
            notBox.innerHTML = absense;
        }else{
            data.forEach(not => {
                const checkComplete = not.completed ? 'completed' : 'Not completed';
                
                notBox.innerHTML += `
                    <div class="notify-box">
                        <div class="n-title">
                            <li>${not.title} is</li>
                        </div>
                        <div class="n-box">
                            This Task is Due and it is ${checkComplete} Delete if no longer relevant <br> 
                            <button class="n-del" data-task-id="${not._id}">Delete</button>
                        </div>
                    </div>
                `;
            });
    
        }
    
        document.querySelectorAll('.n-del').forEach(del => {
            del.addEventListener('click', (e) => {
                const notId = e.target.getAttribute('data-task-id');
                
                fetch(`delete-task/${notId}`, { method: 'DELETE' }) 
                .then(response => response.json())
                .then(resp => {
                    window.location.reload();
                })
                .catch(err => console.log(err.message));
            });
        });
    })
    .catch(err => console.log(err.message));
};
