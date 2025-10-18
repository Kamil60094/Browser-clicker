function pracapracownikow(liczbapracownikow, wynik)
{
    if(liczbapracownikow > 0)
        {
            const przychod = liczbapracownikow * 8 * liczbapracownikow;
            return wynik + przychod
        }
    else
        return wynik
}

function zarobkinaminute(aktualnywynik, poprzedniwynik)
{
    let zysk = aktualnywynik - poprzedniwynik
    zysk*=12 //bo co 5 sekund sie odswieza
    return zysk
}

function kopanie(wynik, licznik)
{
    const przychod = licznik
    return wynik + przychod
}


//zmienne przychowujace dane
const wynik1 = document.getElementById("wynik");
const licznik = document.getElementById("licznik");
const licznikpracownikow = document.getElementById("licznikpracownikow")
const kosztawansu = document.getElementById("kosztawansu")
const kosztpracownika = document.getElementById("kosztpracownika")
const kosztkoparki = document.getElementById("kosztkoparki")
const zarobki = document.getElementById("zarobki")
let poprzedniwynik = 0
let koparkainterval = null

//audio
const clicksound = document.getElementById("audio-klik");
const wrongsound = document.getElementById("audio-wrong");
const buysound = document.getElementById("audio-buy");

//przyciski
const buttonclick = document.getElementById("klik");
const buttonawans = document.getElementById("awans")
const buttonpracownik = document.getElementById("pracownik")
const buttonswitchkoparka = document.getElementById("koparka1")
const buttonbuykoparka = document.getElementById("koparka")


buttonclick.addEventListener("click", () => {
    clicksound.play();

    let obecnyWynik = parseInt(wynik1.textContent) 
    obecnyWynik += parseInt(licznik.textContent) 

    wynik1.textContent = obecnyWynik
});

buttonawans.addEventListener("click", ()=>{
    let obecnyWynik = parseInt(wynik1.textContent)
    let kosztawansu1 = parseInt(kosztawansu.textContent)
    
    if(obecnyWynik >= kosztawansu1)
        {
            obecnyWynik -= kosztawansu1
            wynik1.textContent = obecnyWynik
            kosztawansu.textContent*=5
            licznik.textContent*=2
            buysound.play()

        }
    else
        wrongsound.play()
})

buttonpracownik.addEventListener("click", ()=>{
    let obecnyWynik = parseInt(wynik1.textContent)
    let kosztpracownika1 = parseInt(kosztpracownika.textContent)
    let licznikpracownikow1 = parseInt(licznikpracownikow.textContent)
    
    if(obecnyWynik >= kosztpracownika1)
        {
            obecnyWynik -= kosztpracownika1
            wynik1.textContent = obecnyWynik
            kosztpracownika.textContent*=6
            licznikpracownikow1 += 1
            licznikpracownikow.textContent = licznikpracownikow1
            buysound.play()

        }
    else
        wrongsound.play()
})

buttonbuykoparka.addEventListener("click", ()=>{
    let obecnyWynik = parseInt(wynik1.textContent)
    let kosztkoparki1 = parseInt(kosztkoparki.textContent)
    
    if(obecnyWynik >= kosztkoparki1)
        {
            obecnyWynik -= kosztkoparki1
            wynik1.textContent = obecnyWynik
            buttonbuykoparka.disabled = true
            buttonswitchkoparka.disabled = false
            buysound.play()
        }
    else
        wrongsound.play()
})

buttonswitchkoparka.addEventListener("click", ()=>{
    clicksound.play()
    if(buttonswitchkoparka.textContent == "Kopanie bitcoinow")
        {
            buttonswitchkoparka.textContent = "Przestan kopac"
            koparkainterval = setInterval(() =>{
                const wynikaktualny2 = parseInt(wynik1.textContent)
                const licznikaktualny = parseInt(licznik.textContent)

                const zyskzkoparki = kopanie(wynikaktualny2, licznikaktualny)
                wynik1.textContent = zyskzkoparki
            },500)
            buttonclick.disabled = true
        }
    else
        {
            buttonswitchkoparka.textContent = "Kopanie bitcoinow"
            clearInterval(koparkainterval)
            koparkainterval = null
            buttonclick.disabled = false
        }
})

setInterval(() => {
    const liczbaPracownikow = parseInt(licznikpracownikow.textContent)
    const wynikTeraz = parseInt(wynik1.textContent)

    const nowyWynik = pracapracownikow(liczbaPracownikow, wynikTeraz)
    wynik1.textContent = nowyWynik
}, 250);

setInterval(() => {
    const wynikaktualny = parseInt(wynik1.textContent)

    const zysknaminute = zarobkinaminute(wynikaktualny, poprzedniwynik)
    zarobki.textContent = zysknaminute
    poprzedniwynik = wynikaktualny
}, 5000);