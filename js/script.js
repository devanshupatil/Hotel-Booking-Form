document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const guestNameInput = document.getElementById('guestName');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomTypeSelect = document.getElementById('roomType');
    const guestsInput = document.getElementById('guests');
    const requestsTextarea = document.getElementById('requests');
    const charCount = document.getElementById('charCount');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');

    // Set today as minimum check-in date
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;

    // Field definitions with validators
    const fields = [
        { input: guestNameInput, errorId: 'guestNameError', validate: validateGuestName },
        { input: checkinInput, errorId: 'checkinError', validate: validateCheckin },
        { input: checkoutInput, errorId: 'checkoutError', validate: validateCheckout },
        { input: roomTypeSelect, errorId: 'roomTypeError', validate: validateRoomType },
        { input: guestsInput, errorId: 'guestsError', validate: validateGuests }
    ];

    // --- Validation functions ---
    function validateGuestName() {
        const value = guestNameInput.value.trim();
        if (!value) return 'Please enter your name';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
    }

    function validateCheckin() {
        const value = checkinInput.value;
        if (!value) return 'Please select a check-in date';
        if (value < today) return 'Check-in date cannot be in the past';
        return '';
    }

    function validateCheckout() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        if (!checkout) return 'Please select a check-out date';
        if (!checkin) return 'Please select a check-in date first';
        if (checkout <= checkin) return 'Check-out must be after check-in';
        return '';
    }

    function validateRoomType() {
        if (!roomTypeSelect.value) return 'Please select a room type';
        return '';
    }

    function validateGuests() {
        const value = parseInt(guestsInput.value);
        if (!value || value < 1) return 'At least 1 guest is required';
        if (value > 10) return 'Maximum 10 guests allowed';
        return '';
    }

    // --- Error display helpers using Tailwind classes ---
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        // Apply error border via Tailwind classes
        input.classList.remove('border-gray-200', 'border-green-500');
        input.classList.add('border-red-500');
        // Shake animation
        input.classList.add('input-shake');
        setTimeout(() => input.classList.remove('input-shake'), 500);
        // Show error message
        errorElement.textContent = message;
        errorElement.classList.add('error-animate');
    }

    function clearError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        input.classList.remove('border-red-500');
        if (input.value || input.tagName === 'SELECT') {
            input.classList.remove('border-gray-200');
            input.classList.add('border-green-500');
        } else {
            input.classList.remove('border-green-500');
            input.classList.add('border-gray-200');
        }
        errorElement.textContent = '';
        errorElement.classList.remove('error-animate');
    }

    function validateField(field) {
        const errorMessage = field.validate();
        if (errorMessage) {
            showError(field.input, field.errorId, errorMessage);
            return false;
        } else {
            clearError(field.input, field.errorId);
            return true;
        }
    }

    // --- Dynamic date management ---
    checkinInput.addEventListener('change', () => {
        if (checkinInput.value) {
            const nextDay = new Date(checkinInput.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.min = nextDay.toISOString().split('T')[0];
            if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
                checkoutInput.value = '';
                clearError(checkoutInput, 'checkoutError');
            }
        }
        validateField(fields[1]);
    });

    // Real-time validation on change/input
    guestNameInput.addEventListener('input', () => validateField(fields[0]));
    checkoutInput.addEventListener('change', () => validateField(fields[2]));
    roomTypeSelect.addEventListener('change', () => validateField(fields[3]));
    guestsInput.addEventListener('input', () => validateField(fields[4]));

    // Character count for textarea
    requestsTextarea.addEventListener('input', () => {
        charCount.textContent = requestsTextarea.value.length;
    });

    // --- Form submission ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) isValid = false;
        });

        if (isValid) {
            form.style.opacity = '0';
            form.style.transform = 'scale(0.95)';
            form.style.transition = 'all 0.4s ease';

            setTimeout(() => {
                successMessage.classList.add('active');
            }, 400);
        } else {
            // Smooth scroll to first error
            const firstError = form.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // --- Reset form ---
    resetBtn.addEventListener('click', () => {
        successMessage.classList.remove('active');

        setTimeout(() => {
            form.reset();
            charCount.textContent = '0';

            fields.forEach(field => {
                field.input.classList.remove('border-green-500', 'border-red-500');
                field.input.classList.add('border-gray-200');
                document.getElementById(field.errorId).textContent = '';
            });

            checkinInput.min = today;
            checkoutInput.min = '';

            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 300);
    });

    // Validate on blur
    fields.forEach(field => {
        field.input.addEventListener('blur', () => {
            if (field.input.value || field.input.tagName === 'SELECT') {
                validateField(field);
            }
        });
    });
});
