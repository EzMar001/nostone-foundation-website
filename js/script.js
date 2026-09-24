/* ============================================
   No Stone Foundation - JavaScript
   Handles mobile navigation menu toggle
   ============================================ */

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // Select the hamburger menu button
    const menuToggle = document.querySelector('.menu-toggle');

    // Select the navigation list
    const navMenu = document.querySelector('.main-nav ul');

    // Toggle menu visibility when hamburger is clicked
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide the menu
            navMenu.classList.toggle('active');

            // Change button text between ☰ and ✕ for accessibility
            if (navMenu.classList.contains('active')) {
                menuToggle.textContent = '✕';
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

        // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ============================================
    // VOLUNTEER FORM VALIDATION
    // ============================================
    const volunteerForm = document.getElementById('volunteer-form');

    if (volunteerForm) {

        // Validation rules for each required field
        function validateField(field) {
            const errorSpan = document.getElementById(field.id + '-error');
            let message = '';

            if (field.hasAttribute('required') && field.value.trim() === '') {
                message = 'This field is required.';
            } else if (field.id === 'email' && field.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value.trim())) {
                    message = 'Please enter a valid email address.';
                }
            } else if (field.id === 'phone' && field.value.trim() !== '') {
                const phonePattern = /^[0-9+\s()-]{7,15}$/;
                if (!phonePattern.test(field.value.trim())) {
                    message = 'Please enter a valid phone number.';
                }
            }

            if (message) {
                field.classList.add('invalid');
                field.classList.remove('valid');
                if (errorSpan) errorSpan.textContent = message;
                return false;
            } else {
                field.classList.remove('invalid');
                if (field.value.trim() !== '') field.classList.add('valid');
                if (errorSpan) errorSpan.textContent = '';
                return true;
            }
        }

        // Fields we validate on the volunteer form
        const fieldsToValidate = [
            document.getElementById('fullName'),
            document.getElementById('email'),
            document.getElementById('phone'),
            document.getElementById('interest'),
            document.getElementById('availability')
        ];

        // Validate a field live as the user leaves it (blur) or changes a dropdown
        fieldsToValidate.forEach(function(field) {
            if (!field) return;
            const eventType = (field.tagName === 'SELECT') ? 'change' : 'blur';
            field.addEventListener(eventType, function() {
                validateField(field);
            });
        });

        // Validate everything on submit
        volunteerForm.addEventListener('submit', function(event) {
            let isFormValid = true;

            fieldsToValidate.forEach(function(field) {
                if (!field) return;
                const fieldIsValid = validateField(field);
                if (!fieldIsValid) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                event.preventDefault();
                // Move focus to the first invalid field so the user knows where to look
                const firstInvalid = volunteerForm.querySelector('.invalid');
                if (firstInvalid) firstInvalid.focus();
            }
        });
    }

});
