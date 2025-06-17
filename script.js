document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Scroll-triggered animations ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.2 // 20% of the section must be visible to trigger
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if animation should only happen once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'is-visible' if you want elements to animate out when scrolled away
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 2. Environmental Impact Counter ---
    const impactSection = document.getElementById('impact');
    const counterValues = document.querySelectorAll('.counter-value');
    let countersAnimated = false; // Flag to ensure counters only animate once

    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // When 70% of the impact section is visible
    };

    const countUp = (element) => {
        const target = parseInt(element.dataset.target);
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 10); // Calculate increment for smooth animation

        const timer = setInterval(() => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current).toLocaleString(); // Round up and add comma separators
            } else {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 10);
    };

    const impactObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                counterValues.forEach(value => {
                    countUp(value);
                });
                countersAnimated = true; // Set flag to true after animating
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, counterObserverOptions);

    if (impactSection) { // Ensure impact section exists before observing
        impactObserver.observe(impactSection);
    }

    // --- 3. FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');

            // Close other open accordions if needed (optional, uncomment to enable)
            // accordionHeaders.forEach(otherHeader => {
            //     if (otherHeader !== header && otherHeader.classList.contains('active')) {
            //         otherHeader.classList.remove('active');
            //         otherHeader.closest('.accordion-item').querySelector('.accordion-content').style.maxHeight = 0;
            //     }
            // });

            // Toggle active class on the clicked header
            header.classList.toggle('active');

            // Toggle max-height for the content
            if (header.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Set to actual height
            } else {
                accordionContent.style.maxHeight = 0;
            }
        });
    });

    // --- 4. Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.main-header').offsetHeight || 0), // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Testimonial Slider (Basic structure, will be enhanced with full slider logic) ---
    // For a fully functional slider, you would typically add more advanced JS here
    // involving tracking current slide, adding navigation buttons/dots, and animating transforms.
    // For this project, we'll keep it simple as a static display for now, as
    // the CSS already lays out the items ready for JS to manage.
});