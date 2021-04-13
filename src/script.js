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
  inscription.style.height='60vh'
})

creaCompte.addEventListener('click',function(e){
  e.preventDefault();
  connexion.style.height='40vh';
  inscription.style.height='0';
  message.style.opacity='1';
  setTimeout(function(){
    message.style.opacity='0';
  }, 3000)
})

retourConnexion.addEventListener('click',function(e){
  e.preventDefault();
  connexion.style.height='40vh';
  inscription.style.height='0';
})


})



