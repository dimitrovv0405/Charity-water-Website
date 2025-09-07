// when user presses the "About Us" button, show an alert with information about Charity: Water
function showAboutUs() {
    const description = document.getElementById('about-us-content'); // description element
    const button = document.querySelector('#about-us-btn'); // button element
    
    // Toggle the display of the description and change button text accordingly
    if (description.style.display === '' || description.style.display === 'none') {
        description.style.display = 'block';
        button.textContent = 'Sounds Good!';
    } else {
        description.style.display = 'none';
        button.textContent = 'About Us';
    }
}

// when user presses the "Why Water?" button, show an alert with information about the water crisis
function showWhyWater() {
    const description = document.getElementById('why-water-content'); // description element
    const button = document.querySelector('#why-water-btn'); // button element
    
    // Toggle the display of the description and change button text accordingly
    if (description.style.display === '' || description.style.display === 'none') {
        description.style.display = 'block';
        button.textContent = 'Okay, I Understand!';
    } else {
        description.style.display = 'none';
        button.textContent = 'Why Water?';
    }
}

// when user presses the "Sign In" button, show a sign-in form
function showSignInForm() {
    const button = document.getElementById('sign-in-btn'); // button element
    let existingForm = document.getElementById('sign-in-form'); // check if form already exists
    
    // If form does not exist, create and display it
    if (!existingForm) {
        const form = document.createElement('div'); // create a new div for the form
        form.id = 'sign-in-form'; // set an id for the form
        
        // Add form HTML
        form.innerHTML = `
            <h3>Sign In</h3> 
            <input type="text" placeholder="Username" id="username" /><br/><br/>
            <input type="password" placeholder="Password" id="password" /><br/><br/>
            <button onclick="submitSignIn()">Submit</button>
        `;
        document.body.appendChild(form); // append form to the body
        
        document.getElementById('close-sign-in').onclick = function() {
            form.remove();
        };
    }
}

// when user submits the sign-in form, show a welcome alert and remove the form
function submitSignIn() {
    const username = document.getElementById('username').value;
    const form = document.getElementById('sign-in-form');
    if (username.trim() !== '') {
        form.innerHTML = `<h3>Welcome ${username}!</h3>`;
        // Optionally, add a close button:
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.id = 'close-sign-in';
        closeBtn.onclick = () => form.remove();
        form.appendChild(closeBtn);
    } else {
        // Show error message inside the form
        let errorMsg = document.getElementById('sign-in-error');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'sign-in-error';
            errorMsg.style.color = 'red';
            form.appendChild(errorMsg);
        }
        errorMsg.textContent = 'Please enter your username.';
    }
}

// when user presses the "Join The Movement", "Take Action", or "Donate" button, show a donation box
function donationBox() {
    let existingBox = document.getElementById('donation-box');
    if (!existingBox) {
        const box = document.createElement('div');
        box.id = 'donation-box';
        box.style.position = 'fixed';
        box.style.top = '120px';
        box.style.left = '50%';
        box.style.transform = 'translateX(-50%)';
        box.style.background = '#fff';
        box.style.padding = '32px 24px';
        box.style.boxShadow = '0 0 16px rgba(0,0,0,0.15)';
        box.style.zIndex = '1002';
        box.style.borderRadius = '12px';
        box.style.minWidth = '320px';
        box.innerHTML = `
            <h3>Give 💧</h3>
            <input type="text" id="card-number" placeholder="Credit Card Number" style="width:100%;margin-bottom:12px;padding:8px;border-radius:5px;border:1px solid #ccc;">
            <input type="number" id="donation-amount" placeholder="Amount (USD)" style="width:100%;margin-bottom:12px;padding:8px;border-radius:5px;border:1px solid #ccc;">
            <button id="submit-donation" style="background:#ffd700;color:#1a1a1a;padding:10px 24px;border:none;border-radius:7px;font-weight:600;cursor:pointer;">Submit Payment</button>
            <button id="close-donation" style="background:none;color:#1a1a1a;border:none;margin-left:10px;cursor:pointer;">Close</button>
        `;
        document.body.appendChild(box);

        document.getElementById('close-donation').onclick = function() {
            box.remove();
        };

        document.getElementById('submit-donation').onclick = function() {
            // Simple validation
            const card = document.getElementById('card-number').value.trim();
            const amount = document.getElementById('donation-amount').value.trim();
            if (card === '' || amount === '' || isNaN(amount) || Number(amount) <= 0) {
                showDonationError(box, 'Please enter valid credit card info and amount.');
                return;
            }
            // Show thank you message and confetti
            box.innerHTML = `
                <h1 style="color:#ffd700;text-align:center;">THANK YOU!</h1>
                <p style="text-align:center;">Your donation to charity: water will go directly to bringing clean, safe water to the people who need it most.</p>
                <button id="close-donation" style="background:none;color:#1a1a1a;border:none;margin-top:16px;cursor:pointer;">Close</button>
                <canvas id="confetti-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;"></canvas>
            `;
            document.getElementById('close-donation').onclick = function() {
                box.remove();
            };
            launchConfetti('confetti-canvas', box);
        };
    }
}

function showDonationError(box, message) {
    let errorMsg = document.getElementById('donation-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.id = 'donation-error';
        errorMsg.style.color = 'red';
        errorMsg.style.marginBottom = '10px';
        box.insertBefore(errorMsg, box.firstChild.nextSibling);
    }
    errorMsg.textContent = message;
}

// Simple confetti animation
function launchConfetti(canvasId, parent) {
    const canvas = document.getElementById(canvasId);
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const ctx = canvas.getContext('2d');
    const confettiCount = 80;
    const confetti = [];
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            r: Math.random() * 7 + 4,
            d: Math.random() * confettiCount,
            color: `hsl(${Math.random()*360},80%,60%)`,
            tilt: Math.random() * 10 - 5
        });
    }
    let angle = 0;
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angle += 0.01;
        for (let i = 0; i < confettiCount; i++) {
            let c = confetti[i];
            c.y += (Math.cos(angle + c.d) + 2 + c.r/2) * 0.7;
            c.x += Math.sin(angle) * 2;
            ctx.beginPath();
            ctx.ellipse(c.x, c.y, c.r, c.r/2, c.tilt, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
            if (c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        }
        requestAnimationFrame(drawConfetti);
    }
    drawConfetti();
}