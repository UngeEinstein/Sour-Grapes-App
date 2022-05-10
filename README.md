# project_4 - React Native

# Hvordan kjøre

**Last ned Expo app i enten Appstore eller Google play.**

Man kan enten gå til denne siden https://expo.io/@kanstad/projects/wineApp også scanne QR-koden eller følge stegene under.

`cd my_app/wineApp`

`npm install`

`npm start`

Hvis du ikke har expo lastet ned globalt, blir du spurt om du vil gjøre dette. her må du skrive "Y" og trykke enter.

Skann QR-koden med Expo appen i android eller kamera til Iphone.

**NB! Må enten være koblet til NTNU nettverk eller VPN.**

# React Native
Vi brukte expo init med typescript for å initialisere prosjektet. Etter dette brukte vi mye av koden fra prosjekt 3. Det var egentlig bare det som renderer i komponentene som måtte endres. React Native er ikke basert på HTML, så man må bruke andre innebygde komponenter. Det er f.eks. ikke div- eller p-tag i react native.

## Komponenter fra React Native
`View` er en svært essensiell komponent for å bygge et UI. Vi benytter oss av View i omtrent alle UI-relaterte komponenter. View mapper direkte til den ekvivalente View komponenten til plattformen React Native kjører på. Dette blir for eksempel div for web og android.view på android.

Vi benytter oss av `SafeAreaView` og `ScrollView` i WineAccordion komponenten. SafeAreaView legger automatisk til padding slik at innholdet som er innkapslet i dette elementet ikke overskrider områder på skjermen som har annen funksjonalitet enn kun å vise innhold. I vårt prosjekt gjør det at søkeresultatene ikke overskrider Home baren i bunnen av skjermen på iPhone. ScrollView tillater oss å scrolle gjennom resultatene innenfor et begrenset område på skjermen. Vi valgte å benytte oss av denne komponenten ettersom den gjør at brukeren kan scrolle gjennom de filtrerte resultatene samtidig som søk og filter feltene alltid vil være synlige.

Vi bruker `TextInput` i NumberField komponenten for å gi brukeren mulighet til å filtrere søkeresultat etter makspris. TextInput er i utgangspunktet en komponent som tar inn tekst, men ved å endre "keyboard" verdien til "numeric" vil brukeren kun få tilgang til et numerisk tastatur ved inntasting av informasjon. TextInput returnerer input-verdien som en string. Ved utføring av makspris-queries blir inputen parset til en int. Vi benytter oss også av TextInput i SearchBar-komponenten. Her var det ikke nødvendig å gjøre andre endringer på komponenten enn styling da funksjonaliteten i utgangspunktet passet fint med vårt bruksområde.

I CountryPicker har vi benyttet oss av `RNPickerSelect` importert fra `react-native-picker-select` for å lage en picker meny til å filtrere søk etter vinens produksjonsland. Vi prøvde her ut flere varianter, men det var vanskelig å finne en picker som fungerte som tiltenkt både IOS og android i tillegg til å ha de mulighetene for styling vi var ute etter. Vi landet så på RNPickerSelect da dette var den komponenten som i størst grad dekket kravene våre.

# Gjenbruk av kode
Vi prøvde å gjenbruke så mye kode som overhodet mulig. Klienten som kobler seg opp mot backend er lik og backend er helt lik prosjekt 3, men kjører på virtuell maskin. Alle GraphQL spørringene og funksjonene som kalles av komponentene er like. Vi måtte endre alle HTML-objekter til react native objekter, i tillegg til å finne nye tredjepartskomponenter som også var basert på react native. Ellers droppet vi forsidekunsten fra prosjekt 3 fordi vi mente selv at det kommer til å ta for stor plass på mobilskjermen, derfor byttet vi til en mer mobilvennlig header med logoen vår. Vi gjenbrukte Redux fra prosjekt 3 og benyttet oss av det i komponentene som tidligere. Vi kunne ikke gjenbruke noe av styling som er forståelig når vi kun skulle fokusere på mobilvennligdesign.

## Tilbakemelding fra prosjekt 3
Vi fikk tilbakemelding om at vi ikke burde søke etter hvert tastetrykk da det vil skape unødvendig mange kall til backend. Dette syntes vi var en god tilbakemelding så vi valgte å implementere en timeout funksjon som venter til det har gått 1 sekund uten bruker interaksjon før søkefunksjonen blir kalt.

# OS valg og problemer
Android og iPhone har forskjellige styling muligheter. Derfor vil de ikke alltid se og oppføre seg likt. Vi har i all hovedsak designet og utviklet for iPhone, men vi har testet for begge kontinuerlig gjennom prosessen. Hovedforskjellene vi ser er at CountryPicker komponenten ikke har border rundt og når man trykker på den får man opp forskjellige menyer. Deretter ser man at all hoved funksjonalitet fungerer som tiltenkt på begge enheter.

# Tredjepartskomponenter
Det var vanskeligere å finne gode tredjepartskomonenter for react native enn det var for react da det var mindre utvalg.

## WineAccordion:
Vinlisten er laget med tredjepartskomponentene Collapse, CollapseHeader og CollapseBody fra biblioteket accordion-collapse-react-native (https://www.npmjs.com/package/accordion-collapse-react-native). Header og body ligger inne i collapse og når man trykker på headeren så vises eller skjules body. Dette er for å gjenspeile valgene vi gjorde i prosjekt 3. Biblioteket er lastet ned ca 2400 ganger i uken og er på 21.1kB som er praktisk da vi vil ha en rask nettside. Dokumentasjonen til biblioteket er også lettlest med visuelle eksempler.

## React Native Elements:
Når vi lette etter tredjepartskomponenter leste vi gjennom leserinnlegget «15+ React Native Component Libraries You Should Know in 2020» (codeinwp.com/blog/react-native-component-libraries/). Der fant vi React native elements som var på plass nr.4 og var beskrevet som enkle å bruke og veldig customizable som passet for oss. I tillegg var det et mye brukt bibliotek som hadde mange komponenter vi trengte som Header og AirbnbRating. Header er en standard mobil header med mulighet for 3 ikoner, tekst eller ingenting. Denne brukte vi til å lage en header med logo i venstre hjørne. AirbnbRating brukte vi for å gjenskape StarRating fra prosjekt 3. For å gjøre det mer mobilvennlig gikk vi vekk fra fraksjonene vi hadde i prosjekt 3 og nå kan man bare gi hele stjerner som rating.  

## React Native Vector Icons
Vi brukte ikoner fra react native vector icons (https://www.npmjs.com/package/react-native-vector-icons). De har over 3000 ikoner og de har et veldig enkelt oppsett med Icon komponenten og noen få argumenter som navn for valg av ikon og size for størrelse. Pilene til de ulike knappene samt drink ikonet i logoen er instanser av Icon komponenten. 

# Design
## Styling
En av hovedforskjellene mellom React og React Native er at React Native ikke bruker CSS. Derimot styles det med JavaScript der hver komponent kan ta inn en prop «style» hvor man kan style den. Syntaksen er veldig lik CSS, men der CSS bruker bindestrek må man som oftest bruke Camel Case som f.eks. «background-color» blir til «backgroundColor». For å gjøre filene mer oversiktlig abstraherte vi stylen til et StyleSheet. I StyleSheet’et definerer man variabelnavn f.eks. «homeLogo» hvor man kan sette styling attributter som «width». Deretter setter man f.eks. et ikon komponent sin style til `style={styles.homeLogo}`, hvor styles er StyleSheetet.

## Layout
Layoutet til mobilapplikasjonen er veldig enkel og mobilvennlig. Sett fra toppen nedover har den en header for helhetlig design etterfulgt av et søkefelt og en filterknapp. Filterknappen er lagt til for at filtrene ikke skal ta opp unødvendig plass når de ikke er i bruk. Alle knappene og feltene er laget store nok for at det skal være enkelt å trykke, men ikke så store at de tar vekk fra hovedinnholdet på nettsiden. Tekstfeltene er bredere enn knappene for at man enklere skal kunne se valgene man har tatt. 

Pagination er lagt over listen og viser nåværende side. Vi har valgt å ikke vise totalt antall sider som i prosjekt 3 på basis av at det er over 100.000 sider så hvis man er på side 2000 av 100.000 vil dette ta opp veldig mye av skjermplassen. Deretter er selve listen laget for å scrolle og alle listeobjektene er store nok til at det skal være enkelt å trykke på riktig vin. Etter man har trykket vil vinobjektet ta opp rundt 60% av skjermen som gjør det enkelt og oversiktlig for brukeren å lese mer om denne vinen. Der får man ekstra info og muligheten til å sende inn et review. Når man trykker på en av stjernene vil man få feedback fra systemet av at man har avgitt en review, i tillegg til å få opp gjennomsnittlig reviews fra alle brukergenererte reviews. Grunnen til at gjennomsnittet ikke vises før reviewt er gitt er for at brukeren ikke skal bli påvirket av flertallets konsensus og dermed gi sin egen uavhengige mening. 

# Testing
Vi har utført manuell testing av appen før vi har lagt inn merge request og mens vi har jobbet med ulike issues. Når vi har testet har vi prøvd å finne svake punkt med appen hvor den feiler eller ikke virker optimalt. I tillegg har vi også fått andre som ikke har vært med på å utvikle appen til å teste den. Det har hovedsakelig vært for å forbedre layoutet. Appen er hovedsaklig testet på Iphone, men det har også blitt testet på android, som nevnt tidligere. 

# State Management
## Redux
I dette prosjektet bruker vi Redux til state management. 
Vi har flere komponenter som inneholder input-informasjon brukt til søk og filtrering.
Når brukeren fyller inn disse feltene lagres denne input-informasjonen i Redux. Denne informasjonen blir så hentet ut i "WineAccordion" komponenten som utfører queries og rendrer søkeresultatene basert på brukerens input. 
Vi valgte å bruke Redux til nettopp dette for å gjøre det enklere å dele opp i mindre komponenter uten å måtte tenke på hvordan vi skulle sende informasjon mellom komponentener som props. Dette
i tillegg til at det også fører til en enklere komponentstruktur.

