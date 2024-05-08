function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        document.querySelector('.input-group .toggle-password').classList.remove('fa-eye-slash');
        document.querySelector('.input-group .toggle-password').classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        document.querySelector('.input-group .toggle-password').classList.remove('fa-eye');
        document.querySelector('.input-group .toggle-password').classList.add('fa-eye-slash');
    }
}