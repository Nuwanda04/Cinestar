import bcrypt from "bcrypt";

export const stubUsers = [
  {
    name: "admin",
    email: "admin@mediacollege.dk",
    picture: "/users/no-user.jpg",
    role: "admin",
    hashedPassword: await bcrypt.hash("admin", 10),
  },
  {
    name: "guest",
    email: "guest@mediacollege.dk",
    picture: "/users/no-user.jpg",
    role: "guest",
    hashedPassword: await bcrypt.hash("guest", 10),
  },
];

export const stubBlogs = [
  {
    title: "Optagelserne til musikalbummet af Ruri",
    teaser:
      "Bag kulisserne på en kreativ proces, hvor hvert øjeblik tæller. Vi samarbejdede tæt med Ruri for at skabe en visuel fortælling, der komplementerer musikkens dybde og stemning.",
    description:
      "Et samarbejde, hvor kreativitet og teknologi forenes. Vi arbejdede tæt med Ruri for at skabe unikke visuelle elementer, der matcher albummets lydunivers og fortælling. Optagelserne var en dybt inspirerende proces, hvor vi kombinerede moderne filmteknikker med en kunstnerisk tilgang for at fange albummets sjæl. Fra planlægningen af visuelle koncepter til det endelige produkt, blev hvert trin nøje koordineret i tæt dialog med Ruri og hans team. Vores mål var at skabe en visuel oplevelse, der ikke blot komplementerer musikken, men også forstærker de følelser og budskaber, som albummet formidler.  Hvert billede er fyldt med stemning og symbolik, nøje afstemt med Ruris lydunivers for at skabe en helhedsoplevelse, der rører publikum. Resultatet blev en imponerende visuel fortælling, hvor musik og billeder smelter sammen og forstærker hinandens udtryk.  Samarbejdet med Ruri er et eksempel på, hvordan vi hos Cinestar stræber efter at skabe unikke og mindeværdige produktioner, der går ud over det sædvanlige.",
    image: "/blogs/seed_photoshoot.jpg",
    created: "2025-01-30T08:39:52.338Z",
  },
  {
    title: "TV-Produktion er en unik udfordring med visse kompleksiteter",
    teaser:
      "Tv-reklameproduktion kræver præcision, kreativitet og en effektiv tidsplan. Hvert sekund tæller, og vores team arbejder målrettet for at overkomme udfordringer og levere et resultat, der fanger seernes opmærksomhed.",
    description:
      "At producere en tv-reklame er ikke bare en opgave – det er en kunstform, hvor hvert sekund er nøje koreograferet for at skabe maksimal effekt. Fra idéudvikling til det færdige produkt er processen fyldt med beslutninger, der kræver både præcision og kreativitet. Alt starter med en idé – en fortælling, der skal formidles på få sekunder. Vores kreative team arbejder tæt sammen for at forstå brandets budskab og skabe en historie, der rammer målgruppen i hjertet. Gennem visuelle elementer, lyd og budskabsformidling sørger vi for, at reklamen skiller sig ud i et hav af indhold. Tidsstyring er afgørende i en tv-reklameproduktion. Hvert sekund koster penge, og derfor er vores proces struktureret ned til mindste detalje. Vi arbejder tæt sammen med kunder, skuespillere, filmfotografer og post-produktionsspecialister for at sikre, at alle elementer smelter sammen til en helstøbt produktion.",
    image: "/blogs/seed_studio3.jpg",
    created: "2024-09-04T08:39:52.338Z",
  },
  {
    title: "Historien bag filmproduktion, der berører dig",
    teaser:
      "Bag enhver stor film ligger en omhyggelig proces med passion, kreativitet og hårdt arbejde. Vi skaber levende fortællinger, der engagerer, inspirerer og får publikum til at føle hvert eneste øjeblik.",
    description:
      "En film er mere end bare billeder og lyd. Det er en levende fortælling, der har kraften til at røre hjerter, vække følelser og forandre perspektiver. Bag enhver stor film ligger en omhyggelig proces, hvor passion, kreativitet og hårdt arbejde smelter sammen for at skabe noget unikt og mindeværdigt. Alt begynder med en historie. Vi arbejder tæt sammen med manuskriptforfattere og kreative visionære for at udvikle et narrativ, der engagerer og inspirerer. Med fokus på karakterudvikling, plotstruktur og temaer skaber vi en solid grundsten, hvorpå den visuelle fortælling kan bygges. Filmproduktion er en kompleks proces, hvor intet overlades til tilfældighederne. Hvert kameraindstilling, lysvalg og replik leveres med præcision for at sikre, at fortællingen føles autentisk og engagerende. Vores team kombinerer teknisk ekspertise med en kunstnerisk sans for at skabe scener, der brænder sig fast i hukommelsen.",
    image: "/blogs/seed_studio2.jpg",
    created: "2024-12-06T08:39:52.338Z",
  },
];

export const stubMessages = [
  {
    name: "Name 1",
    subject: "About 1 Something",
    description: "Message 1 description",
  },
  {
    name: "Name 2",
    subject: "About 2 Something",
    description: "Message 2 description",
  },
];

export const stubReviews = [
  {
    name: "Maria Jensen",
    position: "Kommunikationschef hos Creative Minds Agency",
    text: "Cinestar imponerede os fra start til slut. Deres passion for historiefortælling og tekniske ekspertise skinner igennem i hvert projekt. Resultatet var ikke bare professionelt, men også fuldstændig unikt og engagerende.",
    rating: 4,
  },
  {
    name: "Louise Madsen",
    position: "Kreativ Direktør hos VisionWorks Studios",
    text: "Cinestar leverer altid resultater i topklasse. Deres team er dedikeret, detaljeorienteret og ekstremt kreative. Uanset projektets størrelse formår de at bringe visioner til live med imponerende kvalitet og professionalisme.",
    rating: 5,
  },
  {
    name: "Jakob Sørensen",
    position: "Producent hos Nordic Film Productions",
    text: "Cinestar er en pålidelig partner, der altid overgår forventningerne. Deres kreativitet, tekniske ekspertise og evne til at forstå vores behov gør dem til et oplagt valg for enhver produktion.",
    rating: 3,
  },
  {
    name: "Svend Svendsen",
    position: "Producer hos Production",
    text: "Jeg blev desværre skuffet fra start til slut. Det virkede, som om der manglede både passion og teknisk forståelse i projektet. Resultatet føltes uprofessionelt og slet ikke unikt eller engagerende, hvilket var en stor skuffelse.",
    rating: 2,
  },
  {
    name: "Morten Clausen",
    position: "CEO",
    text: "Cinestar leverede en solid præstation. Deres arbejde var både gennemtænkt og veludført, hvilket gjorde hele processen glidende. Resultatet var tilfredsstillende, engagerende og levede op til forventningerne.",
    rating: 2,
  },
  {
    name: "Anders Mikkelsen",
    position: "Projektleder",
    text: "Cinestar imponerede med deres professionelle tilgang og kreative løsninger. Hele projektet blev håndteret effektivt, og resultatet var både flot og funktionelt. En oplevelse, der klart kan anbefales.",
    rating: 4,
  },
];

export const stubFaqs = [
  {
    question: "Hvad gør Cinestar speciel?",
    answer:
      "Cinestar skiller sig ud ved at kombinere kreativt håndværk med teknisk ekspertise. Vi tror på at fortælle historier, der berører, inspirerer og efterlader et varigt indtryk. Vores dedikerede team arbejder passioneret for at skabe unikke produktioner med høj kvalitet og et personligt præg, der gør hver film og hvert projekt helt specielt.",
  },
  {
    question: "Hvorfor vælge Cinestar ?",
    answer:
      "CineStar er det oplagte valg for dem, der søger en filmoplevelse skabt med passion, kvalitet og kreativitet. Vi forener teknisk ekspertise med ægte fortællerglæde for at skabe produktioner, der berører, inspirerer og efterlader et varigt indtryk. Vores dedikerede team arbejder målrettet for at levere unikke filmoplevelser, hvor hvert projekt bliver behandlet med omhu og et personligt præg. Vi tror på styrken i gode historier og på at skabe film, der ikke blot underholder, men også skaber eftertanke og følelser hos publikum. Når du vælger CineStar, vælger du kvalitet, engagement og en dybere forbindelse til filmens kunst",
  },
  {
    question: "Hvad koster det?",
    answer:
      "Prisen afhænger af projektets omfang, kompleksitet og specifikke behov. Vi skræddersyr hver produktion, så du får den bedste løsning til din vision og budget. For at give en præcis pris vurderer vi faktorer som produktionstid, tekniske krav, specialeffekter og efterbehandling. Kontakt os for en uforpligtende samtale, hvor vi kan gennemgå dine ønsker og finde den rette løsning til dig.",
  },
  {
    question: "Hvordan betaler jeg?",
    answer:
      "Betaling kan foretages via bankoverførsel, kreditkort eller anden aftalt betalingsmetode. Afhængigt af projektets størrelse kan der være en forudbetaling, ratebetaling eller samlet betaling ved levering. Vi gennemgår betalingsbetingelserne med dig på forhånd, så alt er klart og gennemsigtigt. Har du særlige ønsker eller behov, finder vi en løsning, der passer til dig. Kontakt os for mere information om betalingsmuligheder.",
  },
];

export const stubSubscribers = [
  {
    email: "cinestarsubscriber@mail.com",
  },
];
