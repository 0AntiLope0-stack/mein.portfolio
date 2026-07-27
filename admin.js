// 1. Supabase Client initialisieren
const SUPABASE_URL = 'https://suxgpwkmqflupbjrzxwm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1eGdwd2ttcWZsdXBianJ6eHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzcyODMsImV4cCI6MjEwMDcxMzI4M30.HSYgfrIqdO-o7S3mkTy6RnJOl-iF1heLNVNHOanIk5c'; 

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// DOM-Elemente
const loginSection = document.getElementById('login-section');
const uploadSection = document.getElementById('upload-section');
const loginForm = document.getElementById('login-form');
const uploadForm = document.getElementById('upload-form');
const loginMessage = document.getElementById('login-message');
const uploadStatus = document.getElementById('upload-status');
const logoutBtn = document.getElementById('logout-btn');
const adminGalleryList = document.getElementById('admin-gallery-list');

// Prüfen, ob der Admin bereits eingeloggt ist
document.addEventListener("DOMContentLoaded", async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        zeigUploadBereich();
    }
});

// LOGIN LOGIK
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginMessage.innerText = "Lade...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        loginMessage.innerText = "Fehler: " + error.message;
    } else {
        loginMessage.innerText = "";
        zeigUploadBereich();
    }
});

// LOGOUT LOGIK
logoutBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    location.reload();
});

function zeigUploadBereich() {
    loginSection.style.display = 'none';
    uploadSection.style.display = 'block';
    ladeAdminBilder(); // Lade die Liste zum Löschen
}

// BILD UPLOAD LOGIK
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadStatus.innerText = "Hochladen läuft...";

    const title = document.getElementById('cat-title').value;
    const fileInput = document.getElementById('cat-image');
    const file = fileInput.files[0];

    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;

    // 1. Datei in Storage hochladen
    const { data: storageData, error: storageError } = await supabaseClient
        .storage
        .from('katzen-bilder')
        .upload(fileName, file);

    if (storageError) {
        uploadStatus.innerText = "Upload-Fehler: " + storageError.message;
        return;
    }

    // 2. Öffentliche Bild-URL abrufen
    const { data: urlData } = supabaseClient
        .storage
        .from('katzen-bilder')
        .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // 3. Eintrag in Datenbank speichern
    const { error: dbError } = await supabaseClient
        .from('katzen')
        .insert([{ title: title, image_url: imageUrl, storage_path: fileName }]);

    if (dbError) {
        uploadStatus.innerText = "Datenbank-Fehler: " + dbError.message;
    } else {
        uploadStatus.innerText = "Erfolgreich hochgeladen! 🎉";
        uploadForm.reset();
        ladeAdminBilder(); // Bild-Liste im Admin-Bereich aktualisieren
    }
});

// BILDER IM ADMIN-BEREICH LADEN (ZUM LÖSCHEN)
async function ladeAdminBilder() {
    if (!adminGalleryList) return;

    adminGalleryList.innerHTML = '<p style="color: #a0a0b1; grid-column: 1/-1;">Lade hochgeladene Bilder...</p>';

    const { data: katzen, error } = await supabaseClient
        .from('katzen')
        .select('*')
        .order('created_at', { ascending: false });

    if (error || !katzen || katzen.length === 0) {
        adminGalleryList.innerHTML = '<p style="color: #a0a0b1; grid-column: 1/-1;">Keine Bilder vorhanden.</p>';
        return;
    }

    adminGalleryList.innerHTML = '';

    katzen.forEach(katze => {
        const item = document.createElement('div');
        item.style.backgroundColor = '#16161a';
        item.style.border = '1px solid #24242e';
        item.style.borderRadius = '8px';
        item.style.padding = '10px';
        item.style.textAlign = 'center';

        item.innerHTML = `
            <img src="${katze.image_url}" alt="${katze.title || 'Katze'}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
            <p style="font-size: 14px; color: #fff; margin-bottom: 8px;">${katze.title || 'Ohne Titel'}</p>
            <button onclick="loescheKatze(${katze.id}, '${katze.storage_path}')" style="background-color: #e63946; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%;">Löschen</button>
        `;
        adminGalleryList.appendChild(item);
    });
}

// BILD LÖSCHEN LOGIK
async function loescheKatze(id, storagePath) {
    if (!confirm("Möchtest du dieses Bild wirklich löschen?")) return;

    // 1. Aus Datenbank löschen
    const { error: dbError } = await supabaseClient
        .from('katzen')
        .delete()
        .eq('id', id);

    if (dbError) {
        alert("Fehler beim Löschen aus der Datenbank: " + dbError.message);
        return;
    }

    // 2. Falls ein Pfad vorhanden ist, auch Datei aus dem Storage löschen
    if (storagePath && storagePath !== 'undefined') {
        await supabaseClient.storage.from('katzen-bilder').remove([storagePath]);
    }

    // Liste aktualisieren
    ladeAdminBilder();
}
