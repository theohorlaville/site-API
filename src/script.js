Document.prototype.ready = callback => {
	if(callback && typeof callback === 'function') {
		document.addEventListener("DOMContentLoaded", () =>  {
			if(document.readyState === "interactive" || document.readyState === "complete") {
				return callback();
			}
		});
	}
};

window.addEventListener('load',function(){

const sect1=document.querySelector('#section1');
const sect2=document.querySelector('#section2');
const sect3=document.querySelector('#section3');
const commu=document.querySelector('#commu');
const affiche=document.querySelector('#search');
const retour=document.querySelector('#retour');
const form1=document.querySelector('#form1');
const form2=document.querySelector('#form2');
const titreOeuvre=document.querySelector('#titre-oeuvre');
const auteur=document.querySelector('#auteur');
const bas= document.querySelector('#bas');
const envoyer=document.querySelector('#envoyer');
const connexion=document.querySelector("#connexion");
const inscriptionBouton=document.querySelector("#inscription-button");
const inscription=document.querySelector('#inscription');
const creaCompte=document.querySelector("#crea-compte");
const cache=document.querySelector("#cache");
const message=document.querySelector("#message");
const retourConnexion=document.querySelector("#retour-connexion");
const user=document.querySelector("#user");
const communaute=document.querySelector("#communaute");
const interface=document.querySelector("#interface");
const interface_bouton = document.querySelector(".interface_bouton");
const nvl_chanson_bouton = document.querySelector(".nvl_chanson_bouton");
const annul_ajout_bouton = document.querySelector("#annul_ajout_bouton");
let flagCache=false;

var lyrics=document.createElement("p");
var request = new XMLHttpRequest();


form1.addEventListener('submit',function(e){
    e.preventDefault();
    sect1.style.width=0+'vw';
    sect2.style.width=100+'vw';
    retour2.style.opacity=1;
    parole();
});

commu.addEventListener("click",function(){
  sect1.style.width=0+'vw';
  sect3.style.width=100+'vw';
  retour1.style.opacity=1;
  if(!flagCache){
  setTimeout(function(){
    cache.style.opacity='40%';
  },800);}
  if(!flagCache){
    setTimeout(function(){
      cache.style.display='block';
    },900);}

})

function parole(){
    

const artiste=form1.artiste.value;
const titre=form1.titre.value;

titreOeuvre.innerHTML=titre;
auteur.innerHTML=artiste;

request.open('GET', 'https://api.lyrics.ovh/v1/'+artiste+'/'+titre);

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    var reponse= JSON.parse(this.responseText);
    if(reponse.lyrics===''){
      lyrics.innerHTML="Pas de parole trouvée pour "+titre+" de "+artiste;
      sect2.insertBefore(lyrics,bas);
    }

    else{
    lyrics.classList.add("parole");
    lyrics.innerHTML=reponse.lyrics;
    sect2.insertBefore(lyrics,bas);
    console.log(this.responseText);
    }
  }
};
request.send();
retour.style.opacity=1;
}

retour2.addEventListener('click',function(){
  sect1.style.width=100+'vw';
  sect2.style.width=0+'vw';
  lyrics.innerHTML='';
  form.titre.value='';
  form.artiste.value='';
  titreOeuvre.innerHTML='';
  auteur.innerHTML="";
  retour2.style.opacity=0;
})


/*---------------------------------------------------S2------------------------------------------------------------- */


retour1.addEventListener('click',function(){
  sect1.style.width=100+'vw';
  sect3.style.width=0+'vw';
  retour1.style.opacity=0;
  cache.style.opacity=0;
})

let photo1=document.querySelector('#photo1');
let photo2=document.querySelector('#photo2');
let photo3=document.querySelector('#photo3');
let photo4=document.querySelector('#photo4');
let photo5=document.querySelector('#photo5');
let photo6=document.querySelector('#photo6');

let photo=0;
photo1.addEventListener('click',function(){
  photo=1;
})
photo2.addEventListener('click',function(){
  photo=2;
})
photo3.addEventListener('click',function(){
  photo=3;
})
photo4.addEventListener('click',function(){
  photo=4;
})
photo5.addEventListener('click',function(){
  photo=5;
})
photo6.addEventListener('click',function(){
  photo=6;
})
  
envoyer.addEventListener('click',function(e){
  e.preventDefault();
  connexion.style.height=0;
  cache.style.opacity=0;
  if(!flagCache){
    setTimeout(function(){
      cache.style.display='none';
      user.style.display='none';
    },600);}
  flagCache=true;
  communaute.style.filter='blur(0px)';

})

inscriptionBouton.addEventListener('click',function(){
  connexion.style.height=0;
  inscription.style.height='auto'
})


creaCompte.addEventListener('click',function(e){
  e.preventDefault();
 
  if(form3.mdp.value!="" && form3.pseudo.value!="" && form3.email.value!="" && photo!=0)
  {
  
    console.log(form3.email.value)
    fetch('./src/routeur.php/users/'+form3.email.value)
    .then(response=>response.json())
    .then(response=>{
      verif(response)})

    .catch(error => { console.log(error) });

    
  }
  else
  {
    const erreur="<p>Veuillez remplir chaque champs</p>"
    info(erreur);
  }
})

function ajouteCompte(){
  const form = {};
  form.pseudo = document.querySelector('.pseudo').value;
  form.email = document.querySelector('.email').value;
  form.mdp=document.querySelector('.password').value;
  form.photo=photo;
  console.log(JSON.stringify(form))
  fetch('./src/routeur.php/users', { method: 'POST', body: JSON.stringify(form)})
  .catch(error => { console.log(error) });

  connexion.style.height='40vh';
  inscription.style.height='0';
  message.style.opacity='1';
  message.innerHTML="";
  setTimeout(function(){
    message.style.opacity='0';
  }, 3000)
}

function verif(data){
  console.log(data)
  if(data=='0')
  {
    const information='<p>Email déja pris</p>';
    info(information)
    form3.mdp.value='';
    form3.pseudo.value='';
    form3.email.value='';

  }
  if(data=='1')
  {
    ajouteCompte();
    const information='<p>Compte créé</p>';
    info(information)
    form3.mdp.value='';
    form3.pseudo.value='';
    form3.email.value='';
  }
}

function info(information){
  message.innerHTML=information;
  message.style.opacity='1';
  setTimeout(function(){
    message.style.opacity='0';
  }, 3000)

}


retourConnexion.addEventListener('click',function(e){
  e.preventDefault();
  connexion.style.height='40vh';
  inscription.style.height='0';
})




interface_bouton.addEventListener('click', () => {
  interface.classList.toggle('displayed');
  accueil.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});

nvl_chanson_bouton.addEventListener('click', () => {
  ajoute_chanson.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});

annul_ajout_bouton.addEventListener('click', () => {
  ajoute_chanson.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});


})



