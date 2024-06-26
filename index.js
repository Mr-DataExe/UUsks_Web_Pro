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
const regDisplay = document.getElementById('reg');
const beforElement = document.querySelector('.sidebar .side-menu li.active');

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
    if (userTag === 'student') {
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
            getAllClubs();
    }else if (userTag === 'manager') {
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
    }else if (userTag === 'admin') {
        fetch('AdminClubs.html')
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
}

function getAllClubs() {
    if (userTag !== 'admin') {
        fetch('https://clubs-system.onrender.com/api/club/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(clubs => {
                console.log(clubs);
                displayClubs(clubs);
            })
            .catch(error => {
                console.error('There was a problem fetching the clubs:', error);
            });
    }
}

function displayClubs(clubs) {
    clubs.forEach(club => {
        console.log(clubs);
        var className = 'item';
        var imagePath = club.club_imag;
        var textContent = club.club_name;
        var parentElementId = 'cti';
        var onclickFunction = `procClub('.item')`;

        var div = document.createElement('div');
        div.className = className;
        div.setAttribute('onclick', onclickFunction);

        var img = document.createElement('img');
        img.src = imagePath;
        div.appendChild(img);

        var span = document.createElement('span');
        span.textContent = textContent;
        div.appendChild(span);

        document.getElementById(parentElementId).appendChild(div);
    });
}

function procClub(className) {
    var clickedElement = document.querySelector(className);
    console.log('Element clicked:', clickedElement);
}
const getUsers = async () => {
    try {
    const response = await fetch('https://clubs-system.onrender.com/api/user/');
    const data = await response.json();


    data.forEach((user) => {
        console.log(user);
        const userDiv = document.createElement('div');
        userDiv.textContent = `User ID: ${user._id}, Name: ${user.user_name}, Email: ${user.user_email}`;
    });
} catch (error) {
    console.error('Error:', error);
}
};

function studentLogin() {
    element1.style.display = 'none';
    element2.style.display = 'contents';
    regDisplay.style.display = 'flex';
    document.getElementById("checkbox").style.display = 'flex';

    tag = 'student';
    sessionStorage.setItem("tag", tag);
}

function managerLogin() {
    element1.style.display = 'none';
    element2.style.display = 'contents';
    regDisplay.style.display = 'flex';
    document.getElementById("checkbox").style.display = 'flex';
    tag = 'manager';
    sessionStorage.setItem("tag", tag);
}

function adminLogin() {
    element1.style.display = 'none';
    element2.style.display = 'contents';
    regDisplay.style.display = 'none';
    document.getElementById("checkbox").style.display = 'none';
    tag = 'admin';
    sessionStorage.setItem("tag", tag);
}
const createClub = async (clubData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/club/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clubData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            hideOverlay();
        }
    } catch (error) {
      console.error('Error:', error);
    }
};

const signUpStudent = async (userData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            goTo();
        }else{
                redText.style.display = 'flex';
        }
    } catch (error) {
      console.error('Error:', error);
    }
};

const signUpManager = async (userData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            goTo();
        }else{
                redText.style.display = 'flex';
        }
    } catch (error) {
      console.error('Error:', error);
    }
};

function onLoadCheckLog() {
    localData = localStorage.getItem("myData");
    localTag = localStorage.getItem("tag");
    sessionData = sessionStorage.getItem("myData");
    sessionTag = sessionStorage.getItem("tag");
    if(localData !== null) {
        console.log(localData)
        console.log(localTag)
        userID = localData;
        userTag = localTag;
    }else if(sessionData !== null) {
        console.log(sessionData)
        console.log(sessionTag)
        userID = sessionData;
        userTag = sessionTag;
    }else if (localData == null || sessionData == null) {
        window.location.href = 'Login.html';
    }
}

const loginStudent = async (loginData) => {
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
                localStorage.setItem("tag", tag);
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

const loginManager = async (loginData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(loginData),
        });
        if (response.ok) {
            const data = await response.json();
            if (tag.includes('student')) {
                if (document.getElementById("myCheckbox").checked) {
                    localStorage.setItem("myData", data.user._id);
                    console.log("Data saved to localStorage");
                } else {
                    sessionStorage.setItem("myData", data.user._id);
                    console.log("Data saved to sessionStorage");
                }
                goTo();
            }else if (tag.includes('manager')) {
                if (document.getElementById("myCheckbox").checked) {
                    localStorage.setItem("myData", data.admin._id);
                    console.log("Data saved to localStorage");
                } else {
                    sessionStorage.setItem("myData", data.admin._id);
                    console.log("Data saved to sessionStorage");
                }
                goTo();
            }
        }else{
            redText.style.display = 'flex';
        }
    }catch (error) {
        console.error('Error:', error);
    }
};

const createEvent = async (eventData) => {
    try {
        const response = await fetch('https://clubs-system.onrender.com/api/admin/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Error:', response.statusText);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
};

function regester(){
    const userNewImg = ('image/profile-default.svg');
    const userNewName = document.getElementById('newUserName').value;
    const userNewEmail = document.getElementById('newEmail').value;
    const userNewPassword = document.getElementById('newPassword').value;
    const userNewRePassword = document.getElementById('newRePassword').value;
    const userNewDate = document.getElementById('newDate').value;

    let tag = sessionStorage.getItem("tag");

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

    if (tag.includes('student')) {
        const signUpData = {
            user_img: userNewImg,
            user_name: userNewName,
            user_email: userNewEmail,
            user_password: userNewPassword,
            user_birth: userNewDate,
        }
        console.log(signUpData);
        if (tag.includes('student')) {
            signUpUser(signUpData)
        }else if (tag.includes('manager')) {
            signUpManager(signUpData)
        }else{
            window.location.href = 'Login.html';
        }
    }else if (tag.includes('manager')) {
        const signUpData = {
            admin_img: userNewImg,
            admin_name: userNewName,
            admin_email: userNewEmail,
            admin_password: userNewPassword,
            admin_birth: userNewDate,
        }
        console.log(signUpData);
        if (tag.includes('student')) {
            signUpUser(signUpData)
        }else if (tag.includes('manager')) {
            signUpManager(signUpData)
        }else{
            window.location.href = 'Login.html';
        }
    }
}

function eventCreation() {
    const eventNewImg = document.getElementById('image').value;
    const eventNewName = document.getElementById('tittle').value;
    const eventNewEmail = document.getElementById('description').value;
    const eventNewLocation = document.getElementById('event-location').value;
    const eventNewDate = document.getElementById('event-date').value;
    const eventNewTime = document.getElementById('event-start').value + '-' + document.getElementById('event-end').value;
    
    const eventData = {
        event_img: eventNewImg,
        event_title: eventNewName,
        event_description: eventNewEmail,
        event_location: eventNewLocation,
        event_club: 'Event Club',
        event_date: eventNewDate,
        event_time: eventNewTime,
    }
}

function clubCreation() {
    const clubNewImg = document.getElementById('image').value;
    const clubNewName = document.getElementById('tittle').value;
    const clubNewdescription = document.getElementById('description').value;
    const clubNewOwner = document.getElementById('event-location').value;

    
    const eventData = {
        club_img: clubNewImg,
        club_name: clubNewName,
        club_description: clubNewdescription,
        club_owner: clubNewOwner,
    }
    createClub(eventData);
}

function login(){
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;
    if (tag.includes('student')) {
        const loginData = {
            user_email: userEmail,
            user_password: userPassword,
        };
        loginStudent(loginData);
    }else if (tag.includes('manager')) {
        const loginData = {
            admin_email: userEmail,
            admin_password: userPassword,
        };
        loginManager(loginData);
    }else if (tag.includes('admin')) {
        const loginData = {
            superAdmin_email: userEmail,
            superAdmin_password: userPassword,
        }
        loginAdmin(loginData)
    }
}

function loginAdmin(loginData) {
    if (loginData.superAdmin_email == 'Admin' && loginData.superAdmin_password == 'Admin.exe') {
        let data = 'Admin';
        sessionStorage.setItem("myData", data);
        goTo();
    }
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
    localStorage.removeItem("tag");
    sessionStorage.removeItem("tag");
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
    if (userTag === 'student') {
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
    }else if (userTag === 'manager') {
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
    }else if (userTag === 'admin') {
        
    }
}
function showOverlay() {
    const ov = document.getElementById('overlay');
    ov.style.display = 'flex'
}
function hideOverlay() {
    const ov = document.getElementById('overlay');
    ov.style.display = 'none'
}
function unload() {
    dashboardContent.innerHTML = "<main></main>";
}
function nothing() {
    return;
}
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    }
});