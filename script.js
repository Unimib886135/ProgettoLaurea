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
                        <h1>Wii Sports</h1>
                        <p>Preparatevi a mettere alla prova la vostra mira e la vostra sobrietà. Entrambe indosserete la  cintura di birre e dovrete cercare di fare canestro lanciando tappi, palline o qualsiasi cosa capiti a tiro.</p>
                        <p>L’obiettivo? Centrare i bicchieri senza rovesciare tutto — o l’equilibrio mentale. Serve precisione, sangue freddo e un minimo di autocontrollo… che sappiamo già andrà perso dopo pochi minuti.</p>
                        <p>Che vinca il migliore — o almeno, chi fa meno danni.</p>
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
                        <h1>Karaoke Party</h1>
                        <p>Signore e signore, ecco a voi la sfida vocale definitiva, ma con un piccolo dettaglio: sarete girate di spalle e non potrete leggere il testo. Le lyrics scorreranno davanti a tutti, tranne che a voi.</p>
                        <p>La canzone parte, il pubblico osserva, e voi dovrete affidarvi alla memoria, all’intuito e a quel ritornello che pensavate di conoscere bene.</p>
                        <p>Una prova di coraggio più che di canto. E sì, le stecche sono garantite.</p>
                    </div>
                    <div class="popup-footer">
                        <a href="javascript:void(0)" class="button close-popup">
                            <span class="corner"></span>
                            <span class="text-buttonarea">Indietro</span>
                        </a>
                        <a href="https://www.youtube.com/feed/playlists" target="_blank" class="button">
                            <span class="corner"></span>
                            <span class="text-buttonarea">Inizia</span>
                        </a>
                    </div>
                </div>
            `
        },
        
        'container-3': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Le So Tutte</h1>
                        <p>Mettete alla prova le vostre conoscenze in questo quiz interattivo diviso in due fasi! </p>
                        <p>Prima le protagoniste si sfideranno con domande di cultura generale, poi tutti gli invitati gareggiano su domande personali sulle festeggiate.</p>
                        <p>Partecipate tutti alla lobby di Kahoot e selezionate il più rapidamente possibile la risposta corretta per vincere. <br>Chi farà più punti vincerà una siga a testa dalle festeggiate da fumare al sole!</p>
                        <p></p>
                    </div>
                    <div class="popup-footer">
                        <a href="javascript:void(0)" class="button close-popup">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Indietro</span>
                        </a>
                        <a href="https://create.kahoot.it/my-library/kahoots/af12a288-f1bd-4fe6-8693-d01da84db007" target="_blank" class="button">
                            <span class="corner"></span>
                            <span class="text-buttonarea">Inizia</span>
                        </a>
                    </div>
                </div>
            `
        },

        'container-4': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Wii Mario Kart</h1>
                        <p>Salta a bordo della tua cariola e preparati alla corsa più divertente della festa! Le protagoniste scelgono il loro pilota personale e si lanciano in un percorso pieno di curve e ostacoli.</p>
                        <p>La comunicazione tra pilota e passeggero sarà fondamentale per navigare le sfide del percorso. Attenzione ai power-up nascosti lungo la strada che potrebbero cambiare le sorti della gara! Solo il team più veloce si porterà a casa la vittoria.</p>
                        <p>Preparati per un'esperienza di corsa unica che combina velocità, strategia e tanto divertimento!</p>
                    </div>
                    <div class="popup-footer">
                        <a href="javascript:void(0)" class="button close-popup">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Indietro</span>
                        </a>
                        <a href="https://svegliaonline.it/cronometro/#" target="_blank" class="button">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Inizia</span>
                        </a>
                    </div>
                </div>
            `
        },

        'container-5': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Super Mario Bros Wii</h1>
                        <p>Entra nel mondo di Super Mario come mai prima d'ora! Le protagoniste dovranno affrontare un percorso a ostacoli ispirato al loro classico sabato sera tra drink e ssiga. 
                        <p>Dovete completare il percorso a ostacoli con in una mano una sigaretta e nell'altra un bicchiere pieno. La prima che ritorna al suo trono sarà la nuova Peach della festa, quella che perde dovrà vedersela con Bowser. </p>
                        <p>Preparati per un'avventura che celebra lo stile di vita unico di Elisa e Nicole!</p>
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
        },

        'container-6': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Wii Party</h1>
                        <p>Sarebbe proprio l'ora di una pausa siga...ma dove sono finiti i vostri pacchetti?</p>
                        <p>Proprio come nella Caccio al Tesoro di Wii Party dovrete trovare il VOSTRO pacchetto di siga nascosto all'interno della cucina.</p>
                        <p>La prima che uscirà con il proprio pacchetto sarà la vincitrice si potrà godere la propria amata pausa siga!</p>
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
        },

        'container-7': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Wii Music</h1>
                        <p>Preparatevi per la sfida musicale più divertente della festa! Elisa e Nicole dovete scegliere le canzoni da far indovinare agli invitati in questa versione speciale della Sarabanda.</p>
                        <p>Ogni canzone indovinata dagli ospiti scatena un brindisi collettivo che aumenta il divertimento! Le festeggiate hanno il controllo totale della playlist, decidendo strategicamente quali brani proporre per mettere alla prova le conoscenze musicali degli amici.</p>
                        <p>Dalle hit del momento ai classici intramontabili, ogni scelta può essere vincente!</p>
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
        },

        'container-8': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Wii Sport Resort</h1>
                        <p>Se sei una Baddie ti fai uno SHOT!</p>
                        <p>Se sei Laureata ti fai uno SHOT!</p>
                        <p>Se vuoi continuare ti fai uno SHOT!</p>
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
        },

        'container-9': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Just Dance 3</h1>
                        <p>E' ora di mettere alla prova le vostre doti da ballerine, come nei classici JustDance seguite al vostro meglio la coreografia (chi non balla vada in esilio nel recinto delle galline).</p>
                    </div>
                    <div class="popup-footer">
                        <a href="javascript:void(0)" class="button close-popup">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Indietro</span>
                        </a>
                        <a href="https://www.youtube.com/watch?v=NJh5idlanrc&list=RDNJh5idlanrc&start_radio=1" target="_blank" class="button">
                            <span class="corner"></span>
                            <span class="text-buttonarea ">Inizia</span>
                        </a>
                    </div>
                </div>
            `
        },

        'container-10': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Wii Wurstel</h1>
                        <p>Preparatevi per la sfida gastronomica più divertente e competitiva della festa!</p>
                        <p>Elisa e Nicole dovete affrontare il wurstel appeso a un filo di spago legato in vita usando solo la bocca. Senza l'uso delle mani, dovrete divorare completamente il vostro wurstel oscillante prima dell'avversaria! La sfida richiede coordinazione, determinazione e una buona dose di pazienza mentre il wurstel dondola davanti al vostro viso.</p>
                        <p>Preparatevi per una competizione esilarante che metterà alla prova le vostre abilità di masticazione e la vostra voglia di vincere!</p>
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
        },

        'container-11': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Cruciverba</h2>
                        <p>Preparatevi per la sfida di logica più personalizzata della festa! </p>
                        <p>Elisa e Nicole dovete completare un cruciverba speciale creato appositamente per voi con riferimenti alla vostra vita. </p>
                        <p>Preparatevi per una gara di intelligenza che celebra il vostro percorso personale e la vostra amicizia!</p>
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
        },

        'container-12': {
            type: 'full',
            content: `
                <div class="popup-content">
                    <div class="popup-header"></div>
                    <div class="popup-body">
                        <h1>Aprite i Regali</h1>
                        <p>REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI - REGALI</p>
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
