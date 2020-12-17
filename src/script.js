window.addEventListener('load',function(){

const sect1=document.querySelector('#section1');
const sect2=document.querySelector('#section2');
const affiche=document.querySelector('#search');
const retour=document.querySelector('#retour');
const form=document.querySelector('form');
const titreOeuvre=document.querySelector('#titre-oeuvre');
const auteur=document.querySelector('#auteur');
const bas= document.querySelector('#bas');
var lyrics=document.createElement("p");
var request = new XMLHttpRequest();


form.addEventListener('submit',function(e){
    e.preventDefault();
    sect1.style.width=0+'vw';
    sect2.style.width=100+'vw';

    parole();

    

});

function parole(){
    

const artiste=form.artiste.value;
const titre=form.titre.value;

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



retour.addEventListener('click',function(){
    sect1.style.width=100+'vw';
    sect2.style.width=0+'vw';
    lyrics.innerHTML='';
    form.titre.value='';
    form.artiste.value='';
    titreOeuvre.innerHTML='';
    auteur.innerHTML="";
    retour.style.opacity=0;


})
    

})



