const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');
const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
const activitiesID = document.getElementById('activities');
const dashboardContent = document.getElementById('tab-cont');
const element1 = document.querySelector('.cs');
const element2 = document.querySelector('.log-in');
const passwordInput = document.getElementById('password');
const newUser = document.getElementById('newUserName');
const newEmail = document.getElementById('newEmail');
const newPassword = document.getElementById('newPassword');
const newRePassword = document.getElementById('newRePassword');
const newDate = document.getElementById('newDate');
const redTextUser = document.getElementById('username-error');
const redTextEmail = document.getElementById('email-error');
const redTextPassword = document.getElementById('password-error');
const redTextRePassword = document.getElementById('re-password-error');
const redTextDate = document.getElementById('birth-error');
const redText = document.querySelector('.log-in .spef .cont .bottom-elements .wrong')

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

function goToSideLink() {
    sideLinks.forEach(i => {
        
        i.parentElement.classList.remove('active');
    })
    activitiesID.classList.add('active')
}

function loadDashboardContent() {
    fetch('dashboard.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            dashboardContent.innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem fetching the dashboard content:', error);
        });
}

function loadClubsContent() {
    fetch('clubs.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            dashboardContent.innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem fetching the dashboard content:', error);
        });
}

const getUsers = async () => {
    try {
    const response = await fetch('https://clubs-system.onrender.com/api/user/');
    const data = await response.json();

    // Assuming data is an array of user objects
    data.forEach((user) => {
        console.log(user); // Log each user object
        // Optionally, display each user's data in your frontend
        // For example, create a <div> for each user and append it to a container
        const userDiv = document.createElement('div');
        userDiv.textContent = `User ID: ${user._id}, Name: ${user.user_name}, Email: ${user.user_email}`;
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to handle user signup
const signUpUser = async (userData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        });
        if (response.ok) {
            goTo();
            const data = await response.json();
            console.log(data);
        }else{
                redText.style.display = 'flex';
        }
    } catch (error) {
      console.error('Error:', error);
    }
};

function onLoadCheckLog() {
    let localData = localStorage.getItem("myData");
    let sessionData = sessionStorage.getItem("myData");
    if(localData !== null) {
        console.log(localData)
    }else if(sessionData !== null) {
        console.log(sessionData)
    }else if (localData == null || sessionData == null) {
        window.location.href = 'Login.html';
    }
}

// Function to handle user login
const loginUser = async (loginData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const data = await response.json();

            if (document.getElementById("myCheckbox").checked) {
                localStorage.setItem("myData", data.user._id);
                console.log("Data saved to localStorage");
            } else {
                sessionStorage.setItem("myData", data.user._id);
                console.log("Data saved to sessionStorage");
            }
            goTo();
        }else{
            redText.style.display = 'flex';
        }
    }catch (error) {
        console.error('Error:', error);
    }
};

// Example usage
function regester(){
    const userNewImg = ('image/profile-default.svg');
    const userNewName = document.getElementById('newUserName').value;
    const userNewEmail = document.getElementById('newEmail').value;
    const userNewPassword = document.getElementById('newPassword').value;
    const userNewRePassword = document.getElementById('newRePassword').value;
    const userNewDate = document.getElementById('newDate').value;

    let userCheck = true;
    let emailCheck = true;
    let passwordCheck = true;
    let rePasswordCheck = true;
    let dateCheck = true;

    if (userNewName.length < 3) {
        newUser.style.borderColor = '#ff000090';
        redTextUser.style.display = 'flex'
        userCheck = false;
    }else{
        newUser.style.borderColor = '#25252c';
        userCheck = true;
    }
    if (!userNewEmail.includes('@st.uskudar.edu.tr' || '@uskudar.edu.tr') || userNewEmail.length < 20) {
        newEmail.style.borderColor = '#ff000090';
        redTextEmail.style.display = 'flex'
        emailCheck = false;
    }else{
        newEmail.style.borderColor = '#25252c';
        emailCheck = true;
    }
    if (/^[a-zA-Z]+$/.test(userNewPassword) || /^[0-9]+$/.test(userNewPassword) || userNewPassword.length < 8) {
        newPassword.style.borderColor = '#ff000090';
        redTextPassword.style.display = 'flex'
        passwordCheck = false;
    }else{
        newPassword.style.borderColor = '#25252c';
        passwordCheck = true;
    }
    if (userNewRePassword != userNewPassword) {
        newRePassword.style.borderColor = '#ff000090';
        redTextRePassword.style.display = 'flex'
        rePasswordCheck = false;
    }else{
        newRePassword.style.borderColor = '#25252c';
        rePasswordCheck = true;
    }
    if (userNewDate.length < 10) {
        newDate.style.borderColor = '#ff000090';
        redTextDate.style.display = 'flex'
        dateCheck = false;
    }else{
        newDate.style.borderColor = '#25252c';
        dateCheck = true;
    }
    if (userCheck == false || emailCheck == false || passwordCheck == false || rePasswordCheck == false || dateCheck == false) {
        return;
    }
    return;
    const signUpData = {
        user_img: userNewImg,
        user_name: userNewName,
        user_email: userNewEmail,
        user_password: userNewPassword,
        user_birth: userNewDate,
    };
    console.log(signUpData);
    signUpUser(signUpData)
}

function login(){
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;
    const loginData = {
        user_email: userEmail,
        user_password: userPassword,
    };
    console.log(loginData);
    loginUser(loginData)
}

function changeLogin() {
    element1.style.display = 'none';
    element2.style.display = 'contents';
}

function back() {
    element1.style.display = 'contents';
    element2.style.display = 'none';
}

function logOut(){
    clearData();
    window.location.href = 'Login.html';
}

function clearData() {
    localStorage.removeItem("myData");
    sessionStorage.removeItem("myData");
}

function goTo() {
    window.location.href = 'index.html';
}

function togPass() {
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
    }else{
        passwordInput.type = 'password';
    }
}

function procCard(items) {
    const containerC = document.getElementById('ctc')
    const item = document.querySelector(items + ' img')
    const insideItems = document.getElementById('inItems')
    const imgElement = inItems.querySelector('img');
    containerC.style.display = 'none';
    insideItems.style.display = 'flex';
    imgElement.src = item.src;
}

function procClub(items) {
    const containeri = document.getElementById('cti')
    const item = document.querySelector(items + ' img')
    const insideClubs = document.getElementById('inClubs')
    const imgElement = inClubs.querySelector('img');
    containeri.style.display = 'none';
    insideClubs.style.display = 'flex';
    imgElement.src = item.src;
}

function loadActivitiesContent() {
    fetch('activities.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            dashboardContent.innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem fetching the dashboard content:', error);
        });
}

function unload() {
    dashboardContent.innerHTML = "<main></main>";
}


menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    }
});