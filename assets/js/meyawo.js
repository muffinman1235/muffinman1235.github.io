/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });

    // Smooth scroll for button
    $("#scroll-to-projects").on('click', function(event) {
        $('html, body').animate({
            scrollTop: $("#portfolio").offset().top
        }, 700);
    });

    // Dynamic Typing Effect
    const roles = ["frontend web designer", "Cybersecurity professional", "Pytorch AI developer", "Distance Runner", "ChatGPT pro 🤫"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 1000; // Delay between current and next text
    const dynamicText = document.getElementById("azerbaijanhacker123");

    function type() {
        if (charIndex < roles[roleIndex].length) {
            dynamicText.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            dynamicText.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingSpeed + 1100);
        }
    }

    // Initial call
    setTimeout(type, newTextDelay + 250);
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});
