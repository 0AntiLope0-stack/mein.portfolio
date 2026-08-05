// script.js
// Globaler Zustand (State)
let sanity = 100;

// Alle Szenen im Spiel
const story = {
    intro: {
        text: "Die kühle Abendluft drückt den Nebel gegen die verwitterte Steinfassade der Villa. Die schwere Eichentür vor dir knarrt leise, als würde sie dich atmen hören. Ein Spalt steht offen... einladend und tödlich zugleich.",
        bild: "intro.png.jpg",
        entscheidungen: [
            { text: "Durch die offene Pforte eintreten", naechsteSzene: "flur" },
            { text: "Umkehren und im Nebel verschwinden", naechsteSzene: "ende_flucht" }
        ]
    },
    ende_flucht: {
        text: "Feige rennst du zurück in den Nebel. Du überlebst... aber die Ungewissheit wird dich deinen Lebtag lang verfolgen. GAME OVER.",
        bild: "image_12.png", // Bild vom Nebel/Ausgang
        entscheidungen: [
            { text: "Neustart", naechsteSzene: "intro" }
        ]
    },
    flur: {
        text: "Du trittst durch die schwere Tür. Der Modergeruch schlägt dir entgegen. Vor dir teilt sich der dunkle Korridor: Links führt eine knarrende Treppe hinab in den Keller, rechts führt ein langer Flur zu einer geschlossenen Tür.",
        bild: "flur.png",
        entscheidungen: [
            { text: "Die Treppe hinab in den Keller gehen", naechsteSzene: "keller_schock" },
            { text: "Dem Flur folgen", naechsteSzene: "flur_ende" }
        ]
    },

    // --- Keller-Pfad ---
    keller_schock: {
        text: "", // Keinerlei Text für den maximalen visuellen Schreckmoment
        bild: "keller_dämon.png",
        sanitySchaden: 20,
        autoNext: "keller_leer",
        autoNextDelay: 800, // Blitzt für 800ms auf
        entscheidungen: []
    },
    keller_leer: {
        text: "Ein keuchender Laut entweicht deiner Kehle. Du blinzelst. Nichts. Die dämonische Gestalt ist verschwunden. Vor dir liegt nur ein leerer, modriger Kellerraum, beleuchtet von einer einzigen, flackernden Glühbirne. Ein rostiges Gittertor führt tiefer in die Finsternis.",
        bild: "keller_leer.png",
        entscheidungen: [
            { text: "Das Gittertor untersuchen", naechsteSzene: "keller_gitter" },
            { text: "Die Treppe wieder hinaufgehen", naechsteSzene: "flur" }
        ]
    },
    keller_gitter: {
        text: "Du näherst dich dem kalten Eisen. Plötzlich zuckt in der tiefen Finsternis hinter den Stäben eine schemenhafte Schattengestalt auf. Ein gellender, verzerrter Schrei hallt durch die Katakomben und dringt dir durch Mark und Bein! Das Tor ist fest verriegelt.",
        bild: "keller_gitter.png",
        sanitySchaden: 10,
        entscheidungen: [
            { text: "Den Messingschlüssel benutzen", naechsteSzene: "keller_aufschliessen" },
            { text: "Panisch die Treppe wieder hochrennen", naechsteSzene: "flur" }
        ]
    },

    // --- Flur-Pfad ---
    flur_ende: {
        text: "Du folgst dem Korridor. Die Türen links und rechts sind verschlossen. Am Ende stehst du vor einer schweren, beschlagenen Tür, die einen Spalt offen steht. Musik dringt heraus...",
        bild: "flur_ende.png",
        entscheidungen: [
            { text: "Die Tür öffnen", naechsteSzene: "salon" }
        ]
    },
    salon: { 
        text: "Du öffnest leise die Tür und versuchst hindurch zu schauen und siehst einen brennenden Kamin und einen alten Plattenspieler, einen Stuhl mit einem kleinen Tisch worauf ein alter Weinkrug steht und eine regungslose Hand.",
        bild: "salon.png",
        entscheidungen: [
            { text: "Weiter zum Stuhl schleichen", naechsteSzene: "stuhl" },
            { text: "Zurück in den Flur gehen", naechsteSzene: "flur" }
        ]
    },
    stuhl: {
        text: "Du schleichst dich leise zum Stuhl, um zu sehen wer sich darin befindet, und ob dir die Person vielleicht helfen kann.",
        bild: "person.png",
        entscheidungen: [
            { text: "Den Salon weiter untersuchen", naechsteSzene: "salon2" },
            { text: "Vor lauter Angst weglaufen", naechsteSzene: "ende_flucht" }
        ]
    },
    salon2: {
        text: "Du überwindest deine Angst und beginnst, den Salon zu untersuchen. Der Kamin knistert, der Plattenspieler läuft... als du plötzlich hinter dir ein Keuchen vernimmst.",
        bild: "salon.png",
        entscheidungen: [
            { text: "Umdrehen", naechsteSzene: "salon_schock" },
            { text: "Weglaufen", naechsteSzene: "salon_schock" }
        ]
    },
    salon_schock: {
        text: "", 
        bild: "schock.png",
        sanitySchaden: 20,
        autoNext: "salon_leer",
        autoNextDelay: 900,
        entscheidungen: [] 
    },
    salon_leer: {
        text: "Ein gellender Schrei entweicht deiner Kehle. Du blinzelst panisch. Nichts. Die Tür ist leer. Der Raum ist wieder so creepy wie zuvor, aber die Gestalt ist verschwunden. Dein Herz hämmerte wie verrückt.",
        bild: "salon.png", 
        entscheidungen: [
            { text: "Den Sessel und die Leiche untersuchen", naechsteSzene: "salon_leiche_untersuchen" },
            { text: "Sofort zurück in den Flur fliehen", naechsteSzene: "flur" }
        ]
    },
    salon_leiche_untersuchen: {
        text: "Mit zitternden Händen näherst du dich der leblosen Gestalt. Das Licht des Kamins wirft lange, unruhige Schatten. In der verkrampften, blutigen Hand der Leiche entdeckst du einen schweren, verzierten Messingschlüssel. Um den Hals der Person liegt ein merkwürdiges, im Holz eingraviertes Symbol.",
        bild: "schlüssel.png",
        entscheidungen: [
            { text: "Den Messingschlüssel an dich nehmen", naechsteSzene: "schluessel_nehmen" },
            { text: "Das Symbol um ihren Hals genauer ansehen", naechsteSzene: "symbol_ansehen" },
            { text: "Zurückweichen und den Raum durch den Flur verlassen", naechsteSzene: "flur" }
        ]
    },
    schluessel_nehmen: {
        text: "Kalt und schwer liegt der Messingschlüssel in deiner Hand. Als du ihn aus den starren Fingern ziehst, spürst du plötzlich ein eiskaltes Hauchen an deinem Nacken. Ein leises Flüstern hallt durch den Raum: 'Gefunden...'. Du weichst panisch zurück.",
        bild: "key.png",
        sanitySchaden: 10,
        entscheidungen: [
            { text: "In den Keller zur Gittertür gehen und versuchen ob der Schlüssel passt", naechsteSzene: "keller_aufschliessen" },
            { text: "Zurückweichen und den Raum durch den Flur verlassen", naechsteSzene: "flur" }
        ]
    },
    symbol_ansehen: {
        text: "Du siehst dir ängstlich die Symbole auf der Halskette an.",
        bild: "hals.png",
        entscheidungen: [
            { text: "Den Messingschlüssel an dich nehmen", naechsteSzene: "schluessel_nehmen" },
            { text: "Zurückweichen und den Raum durch den Flur verlassen", naechsteSzene: "flur" }
        ]
    },
    keller_aufschliessen: {
        text: "Das alte Eisen kreischt laut, als du den Messingschlüssel ins Schloss steckst und ihn mit etwas Kraft herumdrehst. Ein schweres Klacken ertönt. Das rostige Gittertor schwingt langsam nach innen auf. Dahinter enthüllt das flackernde Licht einen langen, feuchten Stein-Tunnel, an dessen Ende eine wuchtige Holztür steht.",
        bild: "tunnel.png",
        entscheidungen: [
            { text: "Den feuchten Tunnel hinabgehen", naechsteSzene: "keller_tunnel" },
            { text: "Aus Angst lieber wieder umkehren", naechsteSzene: "flur" }
        ]
    },
    keller_tunnel: {
        text: "Schritt für Schritt tastest du dich an den glitschigen Steinwänden entlang. Der Modergeruch wird unerträglich. Schließlich stehst du vor einer beschlagenen Eichentür. Ein seltsames, rhythmisches Summen ist dahinter zu hören.",
        bild: "tunnel_tür.png", 
        entscheidungen: [
            { text: "Klinke herunterdrücken und die Tür öffnen", naechsteSzene: "labor_entdeckung" },
            { text: "Erst durch das Schlüsselloch linsen", naechsteSzene: "labor_schlüsselloch" }
        ]
    },
    labor_schlüsselloch: {
        text: "Du beugst dich vor und presst dein Auge an das kalte Schlüsselloch.Drinnen erkennst du seltsame Glasapparaturen, Brodeln und grünes Leuchten. Doch plötzlich bewegt sich etwas direkt aufn der anderen Seite.... Ein blutunterlaufenes Auge starrt aus der Dunkelheit direkt zurück in deins!",
        bild: "auge.png",
        entscheidungen: [
            {text: "Vor Schreck die Tür aufstoßen!", naechsteSzene: "labor_endeckung"},
            {text: "Panisch den Weg zurück durch den Tunnel rennen", naechsteSzene: "flur"}
        ]
    },
    labor_entdeckung: {
        text: "Die Tür quitscht laut, als du sie aufdrückst. Du betrittst einen großen, steinernen Raum voller Bücherregale, staubiger Reagenzgläser und mysteriöser Apperaturen.Auf einem massiven Arbeitstisch in der Mitte liegt ein aufgeschlagenes, ledergebundenes Buch. Auf dem Boden ist ein glühendes Kreis-Symbol gezeichnet.",
        bild: "kreis.png",
        entscheidungen: [
            {text: "Das Buch auf dem tisch lesen",naechsteSzene: "labor_buch"},
            {text: "Dasglühende Symbol am Boden untersuchen", naechsteSzene: "labor_symbol"},
            {text: "Einen Fluchtweg suchen", naechsteSzene: "labor_ausgang"}

        ]
    }
};

// Die Hauptfunktion, die das Spiel steuert
function zeigeSzene(szenenName) {
    const szene = story[szenenName];
    if (!szene) return;

    // Sanity-Schaden abziehen, falls definiert
    if (szene.sanitySchaden) {
        sanity -= szene.sanitySchaden;
        if (sanity < 0) sanity = 0;
    }

    // Bild & Text updaten
    document.getElementById("story-bild").src = szene.bild;
    document.getElementById("story-text").innerText = szene.text;

    // Sanity-Balken aktualisieren
    const sanityInner = document.getElementById("sanity-bar-inner");
    if (sanityInner) {
        sanityInner.style.width = sanity + "%";
        
        // Farbe je nach Wahnsinns-Zustand ändern
        if (sanity < 30) {
            sanityInner.style.backgroundColor = "#ff0000"; // Rot bei wenig Sanity
        } else {
            sanityInner.style.backgroundColor = "#00ff66"; // Giftgrün bei normaler Sanity
        }
    }

    // Buttons neu aufbauen
    const buttonContainer = document.getElementById("button-container");
    if (buttonContainer) {
        buttonContainer.innerHTML = ""; // Alte Buttons löschen

        // Automatische Weiterleitung (für Schreckmomente)
        if (szene.autoNext) {
            setTimeout(() => {
                zeigeSzene(szene.autoNext);
            }, szene.autoNextDelay || 1000);
            return; // Keine Buttons im Schockmoment rendern
        }

        // Normale Entscheidungs-Buttons rendern
        szene.entscheidungen.forEach(option => {
            const btn = document.createElement("button");
            btn.innerText = option.text;
            btn.onclick = () => zeigeSzene(option.naechsteSzene);
            buttonContainer.appendChild(btn);
        });
    }
}

// Spiel beim Laden starten
zeigeSzene("intro");