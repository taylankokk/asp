 const form = document.getElementById('bookingForm');
        const inputs = form.querySelectorAll('input, select');
        const progressFill = document.getElementById('progressFill');

        // Progress bar calculation
        function updateProgress() {
            const totalFields = inputs.length - 3; // Subtract radio buttons (count as 1)
            let filledFields = 0;

            inputs.forEach(input => {
                if (input.type === 'radio') {
                    if (form.querySelector('input[name="' + input.name + '"]:checked')) {
                        filledFields += 1/3; // Count radio group as 1 field total
                    }
                } else if (input.value) {
                    filledFields++;
                }
            });

            const progress = (filledFields / totalFields) * 100;
            progressFill.style.width = progress + '%';
        }

        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
            input.addEventListener('change', updateProgress);
        });

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('pickup').setAttribute('min', today);
        document.getElementById('dropoff').setAttribute('min', today);

        // Auto-update dropoff minimum date
        document.getElementById('pickup').addEventListener('change', function() {
            document.getElementById('dropoff').setAttribute('min', this.value);
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (new Date(data.dropoff) <= new Date(data.pickup)) {
                alert('Drop-off date must be after pickup date');
                return;
            }

            const btn = this.querySelector('.submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span style="position: relative; z-index: 1;">✓ Booking Confirmed!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                alert('Booking submitted successfully!\n\nDetails:\n' + 
                      'Name: ' + data.name + '\n' +
                      'Email: ' + data.email + '\n' +
                      'Location: ' + data.location + '\n' +
                      'Pickup: ' + data.pickup + '\n' +
                      'Drop-off: ' + data.dropoff + '\n' +
                      'Vehicle: ' + data.carType);
                this.reset();
                btn.innerHTML = originalHTML;
                progressFill.style.width = '0%';
            }, 800);
        });