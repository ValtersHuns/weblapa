const ATJAUNOT = 1000;
const VERSIJA = "0.5"
var vards = "Viesis"


/*
Klase, kas satur visu chata saturu, struktūru un metainformāciju
Inicializē ar no servera atgriezto json objektu
Un veic dažas vienkāršas pārbaudes
*/
class Chats {
  constructor(dati) {
    this.vards = vards;
    this.zinjas = [];

    // pārbaudām vai ir vispār kāda jau esoša ziņa
    // ja nav, parādām paziņojumu (tikai lokāli!)
    if (dati.chats.length == 0) {
      this.zinjas = [new Zinja("Pārlūkprogramma", "Čatā pašlaik ziņu nav, uzrakstiet kaut ko!")];
    }

    // no atsūtītajiem datiem izveidojam masīvu ar zinju objektiem
    for (const rinda of dati.chats) {
      const zinja = new Zinja(rinda.vards, rinda.zinja);
      this.add(zinja);
    }
  }

  add(zinja) {
    this.zinjas.push(zinja);
  }

  raadiChataRindas() {
    const chatUL = document.getElementById("chats");
    // novaacam ieprieksheejo saturu
    while (chatUL.firstChild) {
        chatUL.firstChild.remove();
    }
    // pievienojam visas zinjas
    for (const zinja of this.zinjas) {
      let chatLI = zinja.formateRindu();
      chatUL.appendChild(chatLI);
    }
    // noskrolleejam uz leju pie peedeejaa chata texta
    var chatScrollBox = chatUL.parentNode;
    chatScrollBox.scrollTop = chatScrollBox.scrollHeight;
  }
}

/*
Klase, kas satur visu vienas ziņas saturu, struktūru un metainformāciju
Inicializē ar no servera atgrieztā json objekta vienu rindu
*/
class Zinja {
  constructor(vards, zinja) {
    this.vards = vards;
    this.zinja = zinja;
  }

  formateRindu() {
    const LIclassName = "left clearfix";
    const newDivclassName = "chat-body clearfix";
    
    let newLI = document.createElement("li");
    newLI.className = LIclassName;
    let newDiv = document.createElement("div"); 
    newDiv.className = newDivclassName;
    let teksts = this.vards + ": " + this.zinja;
    let newContent = document.createTextNode(teksts); 
    newLI.appendChild(newDiv); 
    newDiv.appendChild(newContent); 
    return newLI;
  }
}


/*
Ielādē tērzēšanas datus no servera
Uzstāda laiku pēc kāda atkārtoti izsaukt šo pašu funkciju
*/
async function lasiChatu() {
    const atbilde = await fetch('/chats/lasi');
    const datuObjekts = await atbilde.json();
    let dati = new Chats(datuObjekts);
    dati.raadiChataRindas();
    await new Promise(resolve => setTimeout(resolve, ATJAUNOT));
    await lasiChatu();
}


/*
Publicē tērzēšanas ziņas datus uz serveri
*/
async function suutiZinju() {
    // Nolasa ievades lauka saturu
    let zinjasElements = document.getElementById("zinja");
    let zinja = zinjasElements.value;

    // pārbaudām vai ir vispār kaut kas ierakstīts
    if (zinja.length > 0) {

        if (zinja.startsWith("/")) {
            zinja = saprotiKomandu(zinja);
        }

        // izdzēš ievades lauku
        zinjasElements.value = "";
        // izveido jaunu chata rindinju no vārda, ziņas utml datiem
        const rinda = new Zinja(vards, zinja)

        const atbilde = await fetch('/chats/suuti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "chats": rinda })
        });
        const datuObjekts = await atbilde.json();

        // parāda jauno chata saturu
        let dati = new Chats(datuObjekts);
        dati.raadiChataRindas();
    } else {
        console.log("Tukšu ziņu nesūtām uz serveri")
    }
}


function saprotiKomandu(teksts) {
  let vardi = teksts.split(" ");
  let komanda = vardi[0];
  let zinja;
  switch (komanda) {
    case "/vards":
    case "/vaards":
      if (vardi.length < 2) {
        zinja = "Norādi jauno vārdu, piemēram: /vards MansJaunaisVards"
      } else {
        zinja = uzstadiVaardu(vardi[1]);
      }
      break;
    case "/versija":
    case "/v":
      zinja = "Javascript versija: " + VERSIJA;
      break;
    case "/paliigaa":
    case "/paliga":
    case "/help":
    case "/?":
    default:
      zinja = paradiPalidzibu();
      break;
  }
  return zinja;
}


function uzstadiVaardu(jaunaisVards) {
  let vecaisVards = vards;
  vards = jaunaisVards;
  let teksts = vecaisVards + " kļuva par " + vards;
  return teksts;
}


function paradiPalidzibu() {
  return 'Pieejamās komandas : "/vards JaunaisVards", "/palidziba", "/versija"'
}


// Ērtības funkcionalitāte
var versijasLauks = document.getElementById("versija");
versijasLauks.innerHTML = "JS versija: " + VERSIJA;
// Atrod ievades lauku
var ievadesLauks = document.getElementById("zinja");
// Gaida signālu no klaviatūras, ka ir nospiests Enter taustiņš
ievadesLauks.addEventListener("keyup", function(event) {
  // Numur 13 ir "Enter" taustiņš
  if (event.keyCode === 13) {
    suutiZinju();
  }
});
