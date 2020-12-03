window.addEventListener('load',function(){

const sect1=document.querySelector('#section1');
const sect2=document.querySelector('#section2');
const affiche=document.querySelector('#search');
const retour=document.querySelector('#retour');
const form=document.querySelector('form');
const titreOeuvre=document.querySelector('#titre_oeuvre');
const auteur=document.querySelector('#auteur');

affiche.addEventListener('click',function(){
    sect1.style.width=0+'vw';
    sect2.style.width=100+'vw';

    parole();

});

function parole(){
    

const artiste=form.artiste.value;
const titre=form.titre.value;

titreOeuvre.innerHTML=titre;
auteur.innerHTML=artiste;

var request = new XMLHttpRequest();
request.open('GET', 'https://api.lyrics.ovh/v1/'+artiste+'/'+titre);

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    var reponse= JSON.parse(this.responseText);
    var lyrics=document.createElement("p");
    lyrics.textContent=reponse.lyrics;
    sect2.appendChild(lyrics);
    console.log(this.responseText);
  }
};
request.send();



}



retour.addEventListener('click',function(){
    sect1.style.width=100+'vw';
    sect2.style.width=0+'vw';
})
    

})
