# Simple Tab Saver for Chrome.

Projecte iniciat com a treball final de curs, derivat a ús real.

Consisteix en una petita extensió que en clicar-la guarda automàticament la sessió actual i en pressionar-la altre cop la recupera.
Compta amb diferents maneres de treballar.

[![Available in the Chrome Store](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/LclHxMxqoswLNRcUW3m5.png )](https://chrome.google.com/webstore/detail/simple-tab-saver/poliinbejkeohgkakcjhnidgbalekdnj)

### Changelog: 


v.1.9.6:

* 🆙 Menos dependencia de Simplex.
* 🆙 Eliminació de part de Material Desing Lite.
* 🆙 Actualització a Bootstrap 4.4.1
* 🆙 Correccio de fallos de diseny.
* 🆙 Eliminació de Tether.js
* 🆕 Scoll horitzontal implementat en history.html
* 🆙 Generació preliminar dels historials i les pestanyes.
* 🆙 Les urls es formategen correctament en les targetes de history.html
* 🆙 Reducció de pes del objecte a guardar.
* 🆙 Millorar onError() i fer-la per a altres tipus de error.
* 🆕 Afegir acces desde el boto dret (ContextMenu)
* 🆙 Arreglat path de la icona del browser button
* 🆕 Preparació inicial de manifest v3
* 🆙 Canvis i correcció de bugs:
    *  Canvi de l'entrada Paypal per "mes"
    *  Implementades traduccions: More, Notificació de guardad, error, i Quota_bytes....
    *  Actualizació de copyright
    *  Acces directe desde shortcuts per editar el comando.
    *  Eliminació de la funcio datapreparation() conflictiva.
    *  Incorporació de l'icona (!) en taronja indicant error.
    *  Solucionat el problema en setings.html quan no es marcava la opció guardada de la base de dades.

v.1.9.5:

* 🆙 Control del error QUOTA_BYTES_PER_ITEM
* 🆙 Canvis en la funció de notificacions
* 🆙 Implementació de carregues asincrones en la part client
* 🆙 Implementació la funcio de Drag and Drop en History.html
* 🆙 Implementació de la opció de privacitat de respectar l'ingonito.
* 🆙 Afegit Popper.js
* 🆙 Dependencies de Bootstrap arreglades
* 🆕 Nova llibreria: dragula
* 🆙 Material icons en local.
* 🆙 Canviar titol de History.html segons la configuració
* 🆙 Historial arranca en totes les configuracions.
* 🆙 Actualizacio de Copyright


v.1.9.4:
* 🆙 Adaptació de Copyright
* 🆙 🆕 Restructuració i canvis de codi:
   * Nova pàgina en background
   * Deslocalització d'scripts en diferents scripts.
   * Canvis en Listener i Manager.
   * Canvis en el Provider: CRUD complet.
   * Actualizació del codi al nou Provider.
   * Nova funció per detectar incognito.
   * Correcció d'errors
* 🆙 Canvis en Settings.hmtl:
   * Implementació de Local Storage (retirada)
* 🆙 Actualizació de Lodash per motius de seguretat: Lodash 4.17.15
* 🆙 Canvis en els resources
* 🆙 Logica interna dels historials acabada
* 🆙 Logica (client) dels historials acabada
* 🆙 Utilizació del templates

v.1.9.3:
* 🆙 Adaptació de Copyright
* 🆙 Actualització a JQuery 3.4.1
* 🆕 Canvios en Settings.hmtl:
    * Respetar incognito. (no està llest)
    * Almacenamiento local. (no està llest)
* 🆕 Canvis en history.html

v.1.9.2:
* 🆙 Actualitzat a Bootstrap 4.1.3.
* 🆙 Adaptació a Bootstrap 4.1.3 
* 🆕 Nova pagina de Historial. (No està llest.)
* 🆕 Canvis en more.html: Agefit un boto rate me
* 🆙 Canvis en els menus. Afegit: History. Canviat de Donate.html a More.html
* 🆙 Canvis en Shortcuts.html.
* 🆕 Afegit Shared-styles.css
* 🆙 Canvis en el tema Simplex.
* 🆙 Canvis en la estructura del projecte.
* 🔤 Canvis en la descripció de l'store.

v.1.9.1:
* 🔤 Canvis per la Google Chrome Store
* 🆙 Retirats 2 permisos innecesaris de l'extensio.

v.1.9:
* 🔤 Idiomes com l'Alemany (de) i el Francès (fr) corregits.
* 🆕 Afegits idiomes: Italià (it), Portuguès (pt), Polonès (pl), Neerlandès (nl), Rus (ru).
* 🆕 Arreglat comandos externs a l'extensió.
* 🆙 Manteniment de codi: Canvis entre Listener i Manager. Neteja de codi en Listener. Reemplaçament de getJson();
* 🆙 Correccions en els _locales i traduccions de menús i internes.
* 🆙 Correcció del bug en la configuració inicial. Ara la configuració es precarrega localment.
* 🆕 Afegit botó de Buy me a Coffee.

v.1.8.6:
* 🆕 Francés i Alemany acabats.
* 🆙 Correcions de Català, Espanyol i Angles.

v1.8.5:
* 🆕 Francés i Alemany póximament.
* Store: 🆙 Canvis en les descripcións.

v.1.8.4:
* 🆙 Arreglada traducció del snackbar.
* 🆙 Canvi en les descripcions i noms del catala i l'anglés, es mostraven malament a l'store.
* Store: 🆙 Actualizació de les imatges

v.1.8.3:
* 🆕 Noves icones.

v.1.8.2:
* 🆙 Errors solucionats. Title page.

v.1.8.1 (Beta):
* 🆙 Arreglat titol.
* 🆕 Llengua per defecte angles.

v.1.7.3 (Beta):
* 🆕 Traducció español, catala i angles.
* 🆕 Pagines preparades per la traducció
* 🆕 Traducció español feta

v.1.7.2 (Beta):
* 🆕 Primeres traduccions
* 🆙 Retirat suport total a Google Analytics (built-in), i Firebase.

v.1.7.1 (Beta):
* 🆙 Neteja casi finalitzada
* 🆙 Menu del boto dret desactivat

v.1.7 (Beta):
* 🆙 Neteja general.

v.1.6.2 (Beta):
* 🆙 Canvis de noms.
* 🆙 Millores en els shortcuts.
* 🆕 Provider ara genera menus.
* 🆕 Implementat les sessions pre guardades.
* 🆙 Canvis interns del settings (JS).

v.1.5.3 (Beta):
* 🆕 Nova Interficie.
* 🆙 Restructuració de codi.

v.1.4.1 (Beta):
* 🆕 Serveis funcionant.
* 🆕 Paypal habilitat.
* 🆕 Usuari + Firebase funcionant.
