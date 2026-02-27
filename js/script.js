document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomTypeSelect = document.getElementById('roomType');
    const guestsInput = document.getElementById('guests');
    const requestsTextarea = document.getElementById('requests');
    const charCount = document.getElementById('charCount');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');

    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;

    const fields = [
        { input: checkinInput, errorId: 'checkinError', validate: validateCheckin },
        { input: checkoutInput, errorId: 'checkoutError', validate: validateCheckout },
        { input: roomTypeSelect, errorId: 'roomTypeError', validate: validateRoomType },
        { input: guestsInput, errorId: 'guestsError', validate: validateGuests }
    ];

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

    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        input.classList.add('error');
        input.classList.remove('valid');
        errorElement.textContent = message;
    }

    function clearError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        input.classList.remove('error');
        if (input.value || input.tagName === 'SELECT') {
            input.classList.add('valid');
        }
        errorElement.textContent = '';
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
        validateField(fields[0]);
    });

    checkoutInput.addEventListener('change', () => validateField(fields[1]));
    roomTypeSelect.addEventListener('change', () => validateField(fields[2]));
    guestsInput.addEventListener('input', () => validateField(fields[3]));

    requestsTextarea.addEventListener('input', () => {
        charCount.textContent = requestsTextarea.value.length;
    });

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
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    resetBtn.addEventListener('click', () => {
        successMessage.classList.remove('active');
        
        setTimeout(() => {
            form.reset();
            charCount.textContent = '0';
            
            fields.forEach(field => {
                field.input.classList.remove('valid', 'error');
                document.getElementById(field.errorId).textContent = '';
            });
            
            checkinInput.min = today;
            checkoutInput.min = '';
            
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 300);
    });

    fields.forEach(field => {
        field.input.addEventListener('blur', () => {
            if (field.input.value || field.input.tagName === 'SELECT') {
                validateField(field);
            }
        });
    });
});
