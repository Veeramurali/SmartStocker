// auth.js

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleSignup = document.getElementById('toggle-signup');
    const toggleLogin = document.getElementById('toggle-login');
    const forgotPassword = document.getElementById('forgot-password');
    let loginAttempts = 0; // Track the number of login attempts

    // Switch to Signup Form
    toggleSignup.addEventListener('click', function () {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        document.getElementById('auth-header').innerText = 'Sign Up';
    });

    // Switch to Login Form
    toggleLogin.addEventListener('click', function () {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        document.getElementById('auth-header').innerText = 'Login';
    });

    // Handle Login
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simple login simulation (replace this with your actual authentication logic)
        const storedCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
        const user = storedCredentials.find(cred => cred.email === email && cred.password === password);

        if (user) {
            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            loginAttempts++;
            alert('Login failed. Please check your email and password.');

            if (loginAttempts >= 2) {
                forgotPassword.style.display = 'block'; // Show the forgot password option
            }
        }
    });

    // Handle Signup
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Store credentials in local storage (for demo purposes)
        const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
        const userExists = userCredentials.find(cred => cred.email === email);

        if (!userExists) {
            userCredentials.push({ email: email, password: password });
            localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
            alert('Sign up successful! Please log in.');
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            document.getElementById('auth-header').innerText = 'Login';
        } else {
            alert('User already exists! Please log in.');
        }
    });
});
