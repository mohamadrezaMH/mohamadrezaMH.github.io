// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showMessage('لطفا تمام فیلدها را پر کنید', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showMessage('لطفا یک ایمیل معتبر وارد کنید', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showMessage('پیام شما با موفقیت ارسال شد! به زودی با شما ارتباط خواهم گرفت.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            text-align: center;
            font-weight: 500;
            color: ${type === 'success' ? '#065f46' : '#991b1b'};
            background: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
            border: 1px solid ${type === 'success' ? '#a7f3d0' : '#fecaca'};
        `;
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});