Document.prototype.ready = callback => {
	if(callback && typeof callback === 'function') {
		document.addEventListener("DOMContentLoaded", () =>  {
			if(document.readyState === "interactive" || document.readyState === "complete") {
				return callback();
			}
		});
	}
};

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
const interface_bouton = document.querySelector("#interface_bouton");
const pdp = document.querySelector("#interface #pdp ");
const pseudo = document.querySelector("#interface #pseudo");
const nvl_chanson_bouton = document.querySelector("#nvl_chanson_bouton");
const annul_ajout_bouton = document.querySelector("#annul_ajout_bouton");
const deco_bouton = document.querySelector("#deco_bouton");
const lyrimacs_bouton = document.querySelector("#lyrimacs_bouton");
const chansons=document.querySelector('#affiche_chansons');
const accueil=document.querySelector('#accueil')
let flagCache=false;


//---------Utilisateur connecté --------//
let id_utilisateur=0;

/*---------------------------------------------------S1------------------------------------------------------------- */

var lyrics=document.createElement("p");
var request = new XMLHttpRequest();


form1.addEventListener('submit',function(e){
    e.preventDefault();
    sect1.style.width=0+'vw';
    sect2.style.width=100+'vw';
    retour2.style.opacity=1;
    parole();
});


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


accueil.style.display='none'; // cache les musiques au début pour pas que l'écran descende dans la page d'accueil

commu.addEventListener("click",function(){
  
  sect3.style.display='block';
  setTimeout(function(){
    sect1.style.width=0+'vw';
    sect3.style.width=100+'vw';
    accueil.style.display='block';
  },1);

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

retour1.addEventListener('click', function () {
  sect1.style.width=100+'vw';
  sect3.style.width=0+'vw';
  accueil.style.display='none';
  retour1.style.opacity=0;
  cache.style.opacity=0;
});



let classPhoto=document.querySelector('.photo');
let photo1=document.querySelector('#photo1');
let photo2=document.querySelector('#photo2');
let photo3=document.querySelector('#photo3');
let photo4=document.querySelector('#photo4');
let photo5=document.querySelector('#photo5');
let photo6=document.querySelector('#photo6');

let photo=0;

photo1.addEventListener('click',function(){
  photo=1;
  photo1.style.width='20%';
  photo2.style.width='15%';
  photo3.style.width='15%';
  photo4.style.width='15%';
  photo5.style.width='15%';
  photo6.style.width='15%';
})

photo2.addEventListener('click',function(){
  photo=2;
  photo1.style.width='15%';
  photo2.style.width='20%';
  photo3.style.width='15%';
  photo4.style.width='15%';
  photo5.style.width='15%';
  photo6.style.width='15%';
})
photo3.addEventListener('click',function(){
  photo=3;
  photo1.style.width='15%';
  photo2.style.width='15%';
  photo3.style.width='20%';
  photo4.style.width='15%';
  photo5.style.width='15%';
  photo6.style.width='15%';
})
photo4.addEventListener('click',function(){
  photo=4;
  photo1.style.width='15%';
  photo2.style.width='15%';
  photo3.style.width='15%';
  photo4.style.width='20%';
  photo5.style.width='15%';
  photo6.style.width='15%';
})
photo5.addEventListener('click',function(){
  photo=5;
  photo1.style.width='15%';
  photo2.style.width='15%';
  photo3.style.width='15%';
  photo4.style.width='15%';
  photo5.style.width='20%';
  photo6.style.width='15%';
})
photo6.addEventListener('click',function(){
  photo=6;
  photo1.style.width='15%';
  photo2.style.width='15%';
  photo3.style.width='15%';
  photo4.style.width='15%';
  photo5.style.width='15%';
  photo6.style.width='20%';
})





//----------------------CONNEXION----------------------





envoyer.addEventListener('click',function(e){
  e.preventDefault();
  if(form2.mdp.value!="" && form2.pseudo.value!=""){
  
    fetch('./src/routeur.php/connexion/'+form2.pseudo.value+','+form2.mdp.value)
    .then(response=>response.json())
    .then(response=>{
      verifConnexion(response)
    })
    .catch(error => { console.log(error) });
  }

  else
  {
    const erreur="<p>Veuillez remplir chaque champs</p>"
    info(erreur);
  }

})

function verifConnexion(data){
  id_utilisateur=data;
  console.log('Utilisateur connecté :'+id_utilisateur)
  if(data=='0')
  {
    const information='<p>Pseudo ou mot de passe incorrect</p>';
    info(information)
    form3.mdp.value='';
    form3.pseudo.value='';
    form3.email.value='';
  }
  else {
    access();
    const information='<p>Bienvenue</p>';
    info(information)
    form3.mdp.value='';
    form3.pseudo.value='';
    form3.email.value='';
  }
}

function access(){
  affichage();
  connexion.style.height=0;
  cache.style.opacity=0;
  if(!flagCache){
    setTimeout(function(){
      cache.style.display='none';
      user.style.display='none';
    },600);}
  flagCache=true;
  communaute.style.filter='blur(0px)';
}





//----------------------INSCRIPTION----------------------





inscriptionBouton.addEventListener('click',function(){
  connexion.style.height=0;
  inscription.style.height='auto'
})

creaCompte.addEventListener('click',function(e){
  e.preventDefault();
 
  if(form3.mdp.value!="" && form3.pseudo.value!="" && form3.email.value!="" && photo!=0)
  {
  
    console.log(form3.email.value)
    fetch('./src/routeur.php/inscription/'+form3.email.value)
    .then(response=>response.json())
    .then(response=>{
      verifInscription(response)})

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
  fetch('./src/routeur.php/inscription', { method: 'POST', body: JSON.stringify(form)})
  .catch(error => { console.log(error) });

  connexion.style.height='40vh';
  inscription.style.height='0';
  message.style.opacity='1';
  message.innerHTML="";
  setTimeout(function(){
    message.style.opacity='0';
  }, 3000)
}

function verifInscription(data){
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




//------------------ AFFICHAGE CHANSONS-------------


let val=0;


document.ready(affichage())

function affichage(){
  
  let numChanson;
  fetch('./src/routeur.php/chansons')
  .then(response=>response.json())
  .then(response=>{
    afficheChansons(response,numChanson)
  })
  .catch(error => { console.log(error) });
  
}


function afficheChansons(response,numChanson){

  
  var content = "<div id='chansons'>";

  response.forEach(function (chanson) {
    verifFav(chanson.id_Ch);
    numChanson=chanson.id_Ch;
    content += "<div class='chanson'><div class='info-chanson'><h3>"+chanson.titre+"</h3><h4>"+chanson.artiste+"</h4></div>";
    content += "<a href='#' onclick='toogleCom(\"" + numChanson+  "\")'>Voir les commentaires</a>";
    content += "<a href='#'>Ajouter un commentaire</a>";
    content += "<div class='commentaire' id='com"+numChanson+"'>";
    
    if(val==1)
    {
      content += "<img src='./assets/like-act' id='like' onclick='supprFav(\"" + numChanson+  "\")'>";
    }
    if(val==0)
    {
      content += "<img src='./assets/like-base' id='like' onclick='addFav(\"" + numChanson+  "\")'>";
    }
    
    content += "</div></div>";
  
  });

  chansons.innerHTML = content;
 
}

function toogleCom(numChanson){
  let com = document.querySelector('#com'+numChanson);
  com.classList.toggle("hide");
}

function verifFav(idChanson){ 

  
  fetch('./src/routeur.php/fav/'+idChanson+','+id_utilisateur)
    .then(data=>data.json())
    .then(data=>{
     
     if(data==false){ val=0}
     else {val=1}
     
     console.log(val)
    })
    .catch(error => { console.log(error) });
    

    
    
}

//------------------ Ajout FAVORI-------------

function addFav(numChanson){
  const form={};
  form.numCh=numChanson;
  form.user=id_utilisateur;
  console.log('add' +form);
  fetch('./src/routeur.php/fav', { method: 'POST', body: JSON.stringify(form)})
  .then(response=>response.json())
  .then(response=>{
  afficheChansons(response)
})
  
}

//------------------ Supprimme FAVORI-------------

function supprFav(numChanson){
  const form={};
  form.numCh=numChanson;
  form.user=id_utilisateur;
  console.log('del' +form);
  fetch('./src/routeur.php/fav', { method: 'DELETE', body: JSON.stringify(form)}) // peut être devoir faire passer par l'uri 
  .then(response=>response.json())
  .then(response=>{
  afficheChansons(response)
})
  
}

//------------------ Ajout CHANSONS-------------




const genre=document.querySelector('.genre');
const ajout_chanson=document.querySelector('#valide_ajout_bouton');
const form5=document.querySelector("#form5");
ajout_chanson.addEventListener('click',function(e){
  e.preventDefault();

  console.log(form5.titre.value);
  console.log(form5.artiste.value);
  console.log(genre.options[genre.selectedIndex].value);

  if(form5.artiste.value!="" && form5.titre.value!="") {
    const form = {};
    form.titre = document.querySelector('.barre-titre').value;
    form.artiste = document.querySelector('.barre-artiste').value;
    form.genre= genre.options[genre.selectedIndex].value;

    console.log(JSON.stringify(form))
    fetch('./src/routeur.php/chansons', { method: 'POST', body: JSON.stringify(form)})
    .then(response=>response.json())
    .then(response=>{
    afficheChansons(response)
  })
    .catch(error => { console.log(error) });
  }
  else { alert('Veuillez remplir tous les champs')}


})




//-------------------------------Interface ------------------





function afficheInfo(data){
  let content = " <img id='photo_uti' src='./assets/"+ data.photo_num +".png' > " ;
  pdp.innerHTML = content;
  let content2= "<h4>"+ data.pseudo +"</h4>" ;
  pseudo.innerHTML = content2 ;
}

interface_bouton.addEventListener('click', () => {

  interface.classList.toggle('displayed');
  accueil.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';

  console.log(id_utilisateur)
  fetch('./src/routeur.php/user/'+ id_utilisateur)
  .then(response=>response.json())
  .then(response=>{
    afficheInfo(response);
  })
  .catch(error => { console.log(error) });

  
});

deco_bouton.addEventListener('click', function() {
  document.location.reload();
  sect1.style.width=100+'vw';
  sect3.style.width=0+'vw';
  retour1.style.opacity=0;
  cache.style.opacity=0;
});

lyrimacs_bouton.addEventListener('click',function () {
  sect1.style.width=100+'vw';
  sect3.style.width=0+'vw';

  retour1.style.opacity=0;
  cache.style.opacity=0;
  setTimeout(function(){
    sect3.style.display='none';
  },900);
});

nvl_chanson_bouton.addEventListener('click', () => {
  ajoute_chanson.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});

annul_ajout_bouton.addEventListener('click', (e) => {
  e.preventDefault();
  ajoute_chanson.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});