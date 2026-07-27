// 1. Supabase Client initialisieren (supabaseClient zur Vermeidung von Namenskonflikten)
const SUPABASE_URL = 'https://suxgpwkmqflupbjrzxwm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1eGdwd2ttcWZsdXBianJ6eHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzcyODMsImV4cCI6MjEwMDcxMzI4M30.HSYgfrIqdO-o7S3mkTy6RnJOl-iF1heLNVNHOanIk5c';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Bilder aus der Datenbank laden und im Grid anzeigen
async function ladeKatzen() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Lade-Hinweis anzeigen
    galleryGrid.innerHTML = '<p style="color: #a0a0b1; grid-column: 1/-1; text-align: center;">Lade Katzenbilder...</p>';

    // Bilder aus der Tabelle "katzen" abfragen (neueste zuerst)
    const { data: katzen, error } = await supabaseClient
        .from('katzen')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fehler beim Laden:", error);
        galleryGrid.innerHTML = '<p style="color: #ffb703; grid-column: 1/-1; text-align: center;">Fehler beim Laden der Galerie.</p>';
        return;
    }

    if (!katzen || katzen.length === 0) {
        galleryGrid.innerHTML = '<p style="color: #a0a0b1; grid-column: 1/-1; text-align: center;">Noch keine Bilder hochgeladen!</p>';
        return;
    }

    // Grid leeren und neue Bilder einfügen
    galleryGrid.innerHTML = '';

    katzen.forEach(katze => {
        const card = document.createElement('div');
        card.classList.add('gallery-card');
        card.innerHTML = `
            <img src="${katze.image_url}" alt="${katze.title || 'Katze'}">
        `;
        galleryGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', ladeKatzen);
