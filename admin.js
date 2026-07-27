// 1. Supabase Client initialisieren (Variable in supabaseClient umbenannt)
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
}

// BILD UPLOAD LOGIK
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    uploadStatus.innerText = "Hochladen läuft...";

    const title = document.getElementById('cat-title').value;
    const fileInput = document.getElementById('cat-image');
    const file = fileInput.files[0];

    if (!file) return;

    // Einzigartigen Dateinamen generieren (z.B. 17123456_katze.jpg)
    const fileName = `${Date.now()}_${file.name}`;

    // 1. Datei in den Supabase Storage Bucket hochladen
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

    // 3. Eintrag in der Datenbank-Tabelle speichern
    const { error: dbError } = await supabaseClient
        .from('katzen')
        .insert([{ title: title, image_url: imageUrl }]);

    if (dbError) {
        uploadStatus.innerText = "Datenbank-Fehler: " + dbError.message;
    } else {
        uploadStatus.innerText = "Erfolgreich hochgeladen! 🎉";
        uploadForm.reset();
    }
});
