# Arcade client application

## Instalatie

* node installeren
* PM2 installeren

http://pm2.keymetrics.io/

https://www.danpurdy.co.uk/web-development/raspberry-pi-kiosk-screen-tutorial/

Chrome automatisch starten in "kiosk modus" in het autostart bestand van de raspberry

`sudo nano /etc/xdg/lxsession/LXDE/autostart`

De volgende line toevoegen:

`@chromium --noerrdialogs --kiosk http://localhost:8080`

Met PM2 zorgen we er voor dat de node applicatie automatisch gestart word en word geherstart mocht er iets mis gaan.

`pm2 start app.js --name="arcade-server"`

PM2 starten bij de boot van het systeem:

`pm2 startup`

## Updates

Na het binnenhalen van de git aanpassingen moet de PM2 deamon even worden herstart

`pm2 reload arcade-server`

## Belangrijke dingen:

De keycodes die aan de knoppen van de kast zitten kunnen worden aangepast met WinIpac

http://www.ultimarc.com/winipacv2.html

https://www.ultimarc.com/mp_inst.html

In `data/games.json` staat de lijst met games die worden getoond in het menu. Deze moet worden aangevuld met de repo's van de studenten.



