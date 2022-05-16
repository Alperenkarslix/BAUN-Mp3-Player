var mp3Klasoru = "./assetler/mp3/"
var mp3Uzantisi = ".mp3"
var mp3Listesi = [
    'Maşallah',
    'Sakiler-CanımaMinnet',
    'Sefo-Tutsak',
];
// youtube-dl --extract-audio --audio-format mp3 <video URL>


// - - - - - - - - -
// - - Degiskenler


var sonCalinanSarki = Math.floor(Math.random() * mp3Listesi.length)

var ses = new Audio(mp3Klasoru + mp3Listesi[sonCalinanSarki] + mp3Uzantisi);
ses.preload;

var renk = [
    "kirmizi", "turuncu", "mavi",
    "pembe", "beyaz", "yesil", "siyah"
]
var rastgeleRenk = renk[Math.floor(Math.random() * renk.length)];


// - - - - - - - -
// - - Methodlar

function calistir() {
    // ilk calistirmada rastgele bi renk ile baslatir.
    renkDegistir(rastgeleRenk);

    // butonlara tiklaninca gerekli methodlari cagirir.
    document.getElementById("oynat").onclick = function () { baslatDurdur() };
    document.getElementById("sonraki").onclick = function () { sonrakiSarkiyaGec() };

    // sarki bittiginde sonraki sarkiyi calar.
    ses.addEventListener('ended', (event) => {
        sonrakiSarkiyaGec();
    });
}


function baslatDurdur() {
    if (document.getElementById("oynat").innerHTML == "ll") {
        document.getElementById("oynat").innerHTML = "▶";
        ses.pause();
    }
    else {
        if (ses.paused == true) {
            var promise = ses.play();
            if (promise !== undefined) {
                promise.then(_ => {
                    let sarkiAdi = mp3Listesi[sonCalinanSarki]
                    document.getElementById("sarkiismi").innerHTML = sarkiAdi;
                    ses.play();
                }).catch(error => {
                });
            }
        }
        document.getElementById("oynat").innerHTML = "ll";
    }
}


function sonrakiSarkiyaGec() {
    let geciciSayi;
    do {
        geciciSayi = Math.floor(Math.random() * mp3Listesi.length);
    } while (geciciSayi == sonCalinanSarki);
    sonCalinanSarki = geciciSayi;
    ses.src = mp3Klasoru + mp3Listesi[sonCalinanSarki] + mp3Uzantisi;
    ses.preload;
    let sarkiAdi = mp3Listesi[sonCalinanSarki]
    document.getElementById("sarkiismi").innerHTML = sarkiAdi;
    let geciciRenk;
    do {
        geciciRenk = Math.floor(Math.random() * renk.length);
    } while (geciciRenk == rastgeleRenk);
    rastgeleRenk = geciciRenk;
    renkDegistir(renk[rastgeleRenk]);

    document.getElementById("oynat").innerHTML = "ll";
    ses.play();
}


function renkDegistir(_renk) {
    document.getElementsByClassName("dugme")[0].style.background = "var(--" + _renk + ")";
    document.getElementsByClassName("dugme")[1].style.background = "var(--" + _renk + ")";
    document.getElementsByClassName("kasa")[0].style.background = "var(--" + _renk + ")";
    document.getElementsByClassName("kapaktaki-hoparlor-deligi")[0].style.background = "var(--" + _renk + ")";
    if(_renk == "siyah") {
        isimEkrani.style.color= "white"
    }
      else { isimEkrani.style.color= "black"}
}


// - - - - - - - - - - - -
// - - Programi calistir

calistir();