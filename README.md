# DanonServer — strona wizytówka

Statyczna strona (HTML/CSS/JS, bez frameworka) dla DanonServer — usługi instalacji prywatnych serwerów NAS w domach i małych firmach: przechowywanie zdjęć, filmów i dokumentów bez miesięcznych abonamentów.

## Struktura

- `index.html` — cała strona (nawigacja, hero, usługi, demo, panel, FAQ, kontakt)
- `css/style.css` — style, w tym pełna responsywność (telefon / tablet / desktop)
- `js/main.js` — dekoracyjne tło, obsługa okna modalnego z formularzem kontaktowym
- `assets/og-image.png` — obrazek podglądu linku (Open Graph / social media)

## Formularz kontaktowy

Formularz w oknie modalnym (przycisk „Skontaktuj się”) obecnie otwiera domyślny program pocztowy odwiedzającego z gotową, wypełnioną wiadomością. Żeby zgłoszenia trafiały bezpośrednio na e-mail bez tej dodatkowej akcji ze strony klienta, trzeba podłączyć darmową usługę typu Web3Forms lub Formspree w `js/main.js`.

## Uruchomienie lokalnie

Wystarczy otworzyć `index.html` w przeglądarce, albo z katalogu repo:

```
python3 -m http.server 8000
```

i wejść na `http://localhost:8000`.
