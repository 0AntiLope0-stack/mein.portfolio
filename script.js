document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    
    if (slides.length === 0) return;

    let aktuelleSlide = 0;

    function zeigeNaechsteSlide() {
        // Entfernt active vom aktuellen Bild
        slides[aktuelleSlide].classList.remove("active");

        // Springt zum nächsten Bild (und nach dem letzten wieder zu 0)
        aktuelleSlide = (aktuelleSlide + 1) % slides.length;

        // Gibt dem neuen Bild die Klasse active
        slides[aktuelleSlide].classList.add("active");
    }

    // Wechselt alle 5000ms (5 Sekunden)
    setInterval(zeigeNaechsteSlide, 5000);
});