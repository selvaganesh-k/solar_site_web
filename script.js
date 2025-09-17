// Initialize AOS
        if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
        }

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = themeToggle ? themeToggle.querySelector('i') : null;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (body) {
            body.setAttribute('data-theme', savedTheme);
        }
        if (icon) {
            updateThemeIcon(savedTheme);
        }

        if (themeToggle) themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (icon) updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Scroll Progress Indicator
        const scrollIndicator = document.getElementById('scrollIndicator');

        if (scrollIndicator) {
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                scrollIndicator.style.width = scrolled + '%';
            });
        }

        // Navbar Background on Scroll
        const navbar = document.querySelector('.navbar-modern');

        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Counter Animation
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 20);
        }

        // Intersection Observer for Counters
        const counterElements = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });

        // Smooth Scrolling for Navigation Links
        const inSamePage = location.pathname.endsWith('index.html') || location.pathname.endsWith('/') || location.pathname === '';
        if (inSamePage) {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const navEl = document.querySelector('.navbar');
                        const navHeight = navEl ? navEl.offsetHeight : 0;
                        const targetPosition = target.offsetTop - navHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Active Navigation Link Highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length && navLinks.length && inSamePage) {
            window.addEventListener('scroll', () => {
                const scrollPos = window.scrollY + 100;
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === '#' + sectionId) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            });
        }

        // Form Submission Handler
        const mainForm = document.querySelector('form');
        if (mainForm) mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
                alertDiv.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Thank you for your message! We'll get back to you within 24 hours.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                
                this.appendChild(alertDiv);
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    if (alertDiv.parentElement) {
                        alertDiv.remove();
                    }
                }, 5000);
            }, 2000);
        });

        // Parallax Effect for Hero Section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            const rate = scrolled * -0.5;
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });

        // Button Hover Effects
        const buttons = document.querySelectorAll('.btn-primary-modern, .btn-accent-modern');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Card Tilt Effect
        const cards = document.querySelectorAll('.card-modern, .card-glass');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            });
        });

        // Loading Animation on Page Load
        window.addEventListener('load', () => {
            // Add loaded class to body for any load-specific animations
            document.body.classList.add('loaded');
            
            // Trigger hero animations with delay
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero-content [data-aos]');
                heroElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('aos-animate');
                    }, index * 200);
                });
            }, 500);
        });

        // Typing Effect for Hero Title (Optional Enhancement)
        function typeWriter(element, text, speed = 100) {
            element.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect on hero title (uncomment to enable)
        // window.addEventListener('load', () => {
        //     const heroTitle = document.querySelector('.hero-content h1');
        //     if (heroTitle) {
        //         const originalText = heroTitle.textContent;
        //         typeWriter(heroTitle, originalText, 100);
        //     }
        // });

        console.log('🌞 SolarTech Pro - Modern UI/UX Design System Loaded Successfully!');
        console.log('✨ Features: AOS Animations, Dark/Light Mode, Smooth Scrolling, Counter Animations');
        console.log('🎨 Design: Glassmorphism, Modern Typography, Custom Color Palette');