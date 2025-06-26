document.addEventListener('DOMContentLoaded', () => {
    // Dynamic footer text
    const footerText = document.getElementById('dynamic-footer-text');
    const today = new Date();
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options).replace(',', '');
    footerText.textContent = formattedDate;

    // Popup functionality
    const overlay = document.getElementById('popup-overlay');
    const container = document.getElementById('popup-container');
    
    let isPopupOpen = false;
    let isAnimating = false;
//test
    // Popup content templates
    const popupTemplates = {
        'container-1': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h2>Sarabanda</h2>
                        <p>Sarabanda è un gioco musicale in cui i partecipanti si sfidano nel riconoscere titoli di canzoni e artisti nel minor tempo possibile.</p>
                        <p>Ogni round presenta una breve melodia, e il primo che indovina correttamente guadagna punti. Il gioco è perfetto per gli amanti della musica e per creare un'atmosfera divertente e competitiva tra amici.</p>
                        <p>Preparati a mettere alla prova la tua conoscenza musicale e a divertirti con sfide emozionanti!</p>
                    </div>
                    <div class="popup-footer">
                        <a href="javascript:void(0)" class="button close-popup">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Indietro</span>
                        </a>
                        <a href="javascript:void(0)" class="button">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Completato</span>
                        </a>
                    </div>
                </div>
            `
        },      //tetst
        'container-2': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h2>Canale Mii</h2>
                        <p>Crea e personalizza i tuoi Mii! Progetta avatar unici che ti rappresentano.</p>
                        <p>Puoi usare i tuoi Mii in vari giochi e condividerli con gli amici.</p>
                        <ul style="text-align: left; margin-top: 2rem;">
                            <li>Crea nuovo Mii</li>
                            <li>Modifica Mii esistenti</li>
                            <li>Gestisci la Mii Plaza</li>
                            <li>Condividi con gli amici</li>
                        </ul>
                    </div>
                    <div class="popup-footer">
                        <a href="javascript:void(0)" class="button close-popup">
                            <span class="corner"></span>
                            <span class="text-buttonarea">Indietro</span>
                        </a>
                        <a href="javascript:void(0)" class="button">
                            <span class="corner"></span>
                            <span class="text-buttonarea">Inizia</span>
                        </a>
                    </div>
                </div>
            `
        },
        'container-3': {
            type: 'simple',
            content: `
                <h2>Wii Shop Channel</h2>
                <p>Il servizio Wii Shop Channel non è più disponibile dal 30 gennaio 2019.</p>
                <p>Grazie per aver utilizzato questo servizio durante tutti questi anni!</p>
                <a href="javascript:void(0)" class="cancel close-popup">Chiudi</a>
            `
        }
    };

    // Get all clickable navigation items
    const navItems = document.querySelectorAll('li[data-popup]');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Prevent clicks while animating
            if (isAnimating) return;
            
            const popupId = item.getAttribute('data-popup');
            
            // If popup is already open, close it immediately and open new one
            if (isPopupOpen) {
                closePopupImmediately();
            }
            
            // Open new popup
            openPopup(item, popupId);
        });
    });

    function openPopup(clickedElement, popupId) {
        const template = popupTemplates[popupId];
        if (!template) return;

        isAnimating = true;
        isPopupOpen = true;

        // Get current position of clicked element
        const rect = clickedElement.getBoundingClientRect();
        
        // Reset container styles and set initial position
        container.style.transition = 'none';
        container.style.left = rect.left + 'px';
        container.style.top = rect.top + 'px';
        container.style.width = rect.width + 'px';
        container.style.height = rect.height + 'px';
        container.style.transform = 'scale(1)';
        
        // Set content and class
        container.className = `popup-container ${template.type}`;
        container.innerHTML = template.content;

        // Show overlay
        overlay.classList.add('active');

        // Force reflow to ensure initial position is set
        container.offsetHeight;
        
        // Re-enable transitions
        container.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        // Animate to full screen
        requestAnimationFrame(() => {
            if (template.type === 'full') {
                container.style.left = '5vw';
                container.style.top = '5vh';
                container.style.width = '90vw';
                container.style.height = '90vh';
            } else {
                container.style.left = '50%';
                container.style.top = '50%';
                container.style.width = '500px';
                container.style.height = 'auto';
                container.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });

        // Animation complete
        setTimeout(() => {
            isAnimating = false;
            
            // Add close event listeners
            const closeButtons = container.querySelectorAll('.close-popup');
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => closePopup(clickedElement));
            });
        }, 600);
    }

    function closePopup(originalElement) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        const rect = originalElement.getBoundingClientRect();
        
        // Animate back to original position
        container.style.left = rect.left + 'px';
        container.style.top = rect.top + 'px';
        container.style.width = rect.width + 'px';
        container.style.height = rect.height + 'px';
        container.style.transform = 'scale(1)';

        // Hide overlay after animation
        setTimeout(() => {
            overlay.classList.remove('active');
            container.innerHTML = '';
            container.className = 'popup-container';
            isAnimating = false;
            isPopupOpen = false;
        }, 600);
    }

    function closePopupImmediately() {
        overlay.classList.remove('active');
        container.innerHTML = '';
        container.className = 'popup-container';
        isAnimating = false;
        isPopupOpen = false;
    }

    // Close popup when clicking overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay && !isAnimating) {
            // We need to find which element was clicked to close properly
            // For now, just close immediately
            closePopupImmediately();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isPopupOpen && !isAnimating) {
            closePopupImmediately();
        }
    });
});



// Real-time clock

document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('real-time-clock');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Aggiorna l'orario ogni secondo
    setInterval(updateClock, 1000);

    // Imposta l'orario iniziale
    updateClock();
});




// Animazione coriandoli

document.addEventListener('DOMContentLoaded', () => {
    const confettiTrigger = document.getElementById('confetti-trigger');
    let isAnimating = false; // Variabile per controllare lo stato dell'animazione

    confettiTrigger.addEventListener('click', () => {
        if (isAnimating) return; // Impedisce l'avvio di una nuova animazione se una è già in corso

        isAnimating = true; // Imposta lo stato dell'animazione su "in corso"
        document.body.style.overflow = 'hidden'; // Disabilita lo scrolling

        for (let i = 0; i < 1000; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.top = `${Math.random() * 10}vh`;
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Colore casuale
                document.body.appendChild(confetti);

                // Rimuovi il coriandolo dopo l'animazione
                setTimeout(() => {
                    confetti.remove();
                }, 5000); // Durata dell'animazione
            }, i * 3); // Ritardo per un effetto più rapido
        }

        // Riabilita lo scrolling e resetta lo stato dell'animazione
        setTimeout(() => {
            document.body.style.overflow = '';
            isAnimating = false; // Reset dello stato dell'animazione
        }, 9000); // Match con la durata dell'animazione
    });
});



//  Drag and Drop Functionality

class WiiSmoothCursor {
            constructor() {
                this.cursor = null;
                this.isPressed = false;
                this.targetX = 0;
                this.targetY = 0;
                this.currentX = 0;
                this.currentY = 0;
                this.velocityX = 0;
                this.velocityY = 0;
                this.smoothing = 0.12; // Fattore di smoothing del Wii Remote
                this.friction = 0.85;   // Attrito per movimento naturale
                this.lastHoveredElement = null;
                this.isAnimating = false;
                this.init();
            }

            init() {
                // Crea il cursore personalizzato
                this.cursor = document.createElement('div');
                this.cursor.id = 'wii-smooth-cursor';
                document.body.appendChild(this.cursor);

                // Posizione iniziale al centro
                this.currentX = window.innerWidth / 2;
                this.currentY = window.innerHeight / 2;
                this.targetX = this.currentX;
                this.targetY = this.currentY;

                // Event listeners
                document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
                document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
                document.addEventListener('click', (e) => this.handleClick(e));
                document.addEventListener('mouseenter', () => this.startAnimation());
                document.addEventListener('mouseleave', () => this.stopAnimation());

                // Inizia l'animazione fluida
                this.startAnimation();
                this.setupAudio();
            }

            startAnimation() {
                if (!this.isAnimating) {
                    this.isAnimating = true;
                    this.animate();
                }
            }

            stopAnimation() {
                this.isAnimating = false;
            }

            animate() {
                if (!this.isAnimating) return;

                // Calcola la distanza dal target
                const deltaX = this.targetX - this.currentX;
                const deltaY = this.targetY - this.currentY;

                // Applica smoothing con velocità simulata del Wii Remote
                this.velocityX += deltaX * this.smoothing;
                this.velocityY += deltaY * this.smoothing;

                // Applica attrito per movimento naturale
                this.velocityX *= this.friction;
                this.velocityY *= this.friction;

                // Aggiorna posizione
                this.currentX += this.velocityX;
                this.currentY += this.velocityY;

                // Applica la posizione al cursore (centrato)
                this.cursor.style.left = (this.currentX - 16) + 'px';
                this.cursor.style.top = (this.currentY - 16) + 'px';

                // Continua l'animazione
                requestAnimationFrame(() => this.animate());
            }

            setupAudio() {
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    console.log('Audio not supported');
                }
            }

            playHoverSound() {
                if (!this.audioContext) return;
                
                try {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1000, this.audioContext.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.1);
                } catch (e) {
                    console.log('Audio error:', e);
                }
            }

            playClickSound() {
                if (!this.audioContext) return;
                
                try {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.15);
                    
                    gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.15);
                } catch (e) {
                    console.log('Audio error:', e);
                }
            }

            handleMouseMove(e) {
                this.targetX = e.clientX;
                this.targetY = e.clientY;

                // Rileva hover su elementi interattivi
                const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
                if (elementUnder && (elementUnder.tagName === 'BUTTON' || 
                    elementUnder.tagName === 'A' || 
                    elementUnder.tagName === 'TEXTAREA' ||
                    elementUnder.tagName === 'INPUT' ||
                    elementUnder.tagName === 'LI' ||
                    elementUnder.classList.contains('interactive'))) {
                    
                    if (this.lastHoveredElement !== elementUnder) {
                        this.lastHoveredElement = elementUnder;
                        this.playHoverSound();
                        
                        // Effetto scala sul cursore
                        this.cursor.style.transform = 'scale(1.2)';
                    }
                } else {
                    if (this.lastHoveredElement !== null) {
                        this.lastHoveredElement = null;
                        this.cursor.style.transform = 'scale(1)';
                    }
                }
            }

            handleMouseDown(e) {
                this.isPressed = true;
                this.cursor.style.transform += ' scale(0.9)';
            }

            handleMouseUp(e) {
                this.isPressed = false;
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(0.9)', '');
            }

            handleClick(e) {
                this.playClickSound();
                this.createRippleEffect(this.currentX, this.currentY);
            }



            
        }

        // Inizializza il cursore Wii fluido
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                new WiiSmoothCursor();
            }, 100);
        });
