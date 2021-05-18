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
let id_chanson=0;
let musiqueCourante=0;

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




  const parallax =  document.getElementById("fond2")
  const parallax2 =  document.getElementById("fond3")
  const parallax3 =  document.getElementById("fond4")


window.addEventListener("scroll",function()
	{
		let hauteurPage = window.pageYOffset;
		parallax.style.backgroundPositionY= hauteurPage * -0.1+"px"
    parallax2.style.backgroundPositionY= hauteurPage * -0.3+"px"
		parallax3.style.backgroundPositionY= hauteurPage * -0.5+"px"
  }

  )
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
  console.log('tu las bg');
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


//-----Retour page d'accueil----

lyrimacs_bouton.addEventListener('click',function () {
  sect1.style.width=100+'vw';
  sect3.style.width=0+'vw';
  retour1.style.opacity=0;
  cache.style.opacity=0;
  setTimeout(function(){
    sect3.style.display='none';
  },900);

});



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



//------------------ RECHERCHE CHANSONS-------------



const form4=document.querySelector('#form4');
const search_type=document.querySelector('.search-type');

rechercher.addEventListener("click", function(e){
  e.preventDefault();
  if(form4.nom.value != ""){
    const form= {};
    form.nom= form4.nom.value;
    form.search_type=search_type.options[search_type.selectedIndex].value;
    //console.log('./src/routeur.php/chansons/'+form.search_type+"/"+form.nom);
    fetch('./src/routeur.php/chansons/'+form.search_type+"/"+form.nom )
    .then(response=>response.json())
    .then(response=>{
      afficheChansons(response);
    })
    .catch(error => { console.log(error) });
  }
})


//------------------ AFFICHAGE CHANSONS-------------

document.ready(affichage())

function affichage(){
  
  fetch('./src/routeur.php/chansons/modif')
  .then(response=>response.json())
  .then(response=>{
    afficheChansons(response)
  })
  .catch(error => { console.log(error) });
  
}


function afficheChansons(response){

  var content = "<div id='chansons'>";
  
  console.log('afficheChanson')
  let i=0;

  response.forEach(function (chanson) {
    
    i++;
  
        content += "<div class='chanson' >"
          content += "<div class='info-chanson'>"
            content += "<h3>"+chanson.titre+"</h3>";
            content += "<h4>"+chanson.artiste+"</h4>"
          content += "</div>"
          content +="<div class='info-genre'>"
            content +="<h5>" +chanson.nom_Gen+"</h5>"
          
          content+="</div>"

          content += "<div id='like-cont" +i+"'></div>"
        
          content += "<div class='commentaire'>";
            content +="<button onclick='affCom("+chanson.id_Ch+','+i+")' class='button_commentaire'>commentaires</button>";
          content += "</div>"
        content += "</div>"

        content += "<div  class='commentaires' id='chansonNum" +i+"'></div>";

      content += "</div>"

      chansons.innerHTML = content;

    });

  i=0

  response.forEach(function(song){
    
    
    i++;
    let likezone=document.querySelector("#like-cont"+i+"")

    verifFav(song.id_Ch).then(json=>{

      

     
      if(json==false)
      {
        likezone.innerHTML= "<img src='./assets/like-base.png' id='like' onclick='addFav(\"" + song.id_Ch+  "\")'>";
      }

      else
      {
        likezone.innerHTML = "<img src='./assets/like-act.png' id='like' onclick='supprFav(\"" + song.id_Ch+  "\")'>";
      }

    })
      
  })  

  }
    

//-----Verification Fav-----

async function verifFav(idChanson){ 
    
    let reponse = await fetch('./src/routeur.php/fav/'+idChanson+','+id_utilisateur);
    let json= await reponse.json();
    
  return json;   
}

//------------------ TRI CHANSONS-------------

//--tri par NOMBRE de Favoris---

const fav=document.querySelector('#triFav');
fav.addEventListener('click',function(e){
  e.preventDefault();
  affichageParFav();
})

function affichageParFav(){
  fetch('./src/routeur.php/triParFav/')
  .then(response=>response.json())
  .then(response=>{
    afficheChansons(response)
  })
  .catch(error => { console.log(error) });
  
}
 

//---Tri par date d'ajout---//

const ajout=document.querySelector('#triAjout');
ajout.addEventListener('click',function(e){
  e.preventDefault();
  affichage();
});

//----- Tri par MES FAVORIS-----

const mesFavs_bouton=document.querySelector('#mesFavs');
mesFavs_bouton.addEventListener('click', function(e){
  e.preventDefault();

  fetch('./src/routeur.php/MesFavs/'+ id_utilisateur)
  .then(response=>response.json())
  .then(response=>{
    console.log(response)
    afficheChansons(response);
   
  })
  .catch(error => { console.log(error) });

});



//------------------ Ajout CHANSONS-----------------


const genre=document.querySelector('.genre');
const ajout_chanson=document.querySelector('#valide_ajout_bouton');
const form5=document.querySelector("#form5");

ajout_chanson.addEventListener('click',function(e){
  e.preventDefault();

  if(form5.artiste.value!="" && form5.titre.value!="") {
    const form = {};
    form.titre = document.querySelector('.barre-titre').value;
    form.artiste = document.querySelector('.barre-artiste').value;
    form.genre= genre.options[genre.selectedIndex].value;

    console.log(JSON.stringify(form))
    fetch('./src/routeur.php/chansons/modif', { method: 'POST', body: JSON.stringify(form)})
    .then(response=>response.json())
    .then(response=>{
    afficheChansons(response)
  })
    .catch(error => { console.log(error) });
  }
  else { alert('Veuillez remplir tous les champs')}


})

//--Formulaire ajout de chanson


nvl_chanson_bouton.addEventListener('click', () => {
  ajoute_chanson.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});

annul_ajout_bouton.addEventListener('click', (e) => {
  e.preventDefault();	
  ajoute_chanson.classList.toggle('displayed');
  document.querySelector('html body').style.overflowY = 'scroll';
});





//------------------ Ajout FAVORI-------------

function addFav(numChanson){
  console.log(numChanson)
  const form={};
  form.numCh=numChanson;
  form.user=id_utilisateur;
  fetch('./src/routeur.php/fav', { method: 'POST', body: JSON.stringify(form)})
  .then(response=>response.json())
  .then(response=>{
  afficheChansons(response)
})
  
}

//------------------ Supprime FAVORI-------------

function supprFav(numChanson){
  const form={};
  form.numCh=numChanson;
  form.user=id_utilisateur;
  fetch('./src/routeur.php/fav', { method: 'DELETE', body: JSON.stringify(form)}) // peut être devoir faire passer par l'uri 
  .then(response=>response.json())
  .then(response=>{
  afficheChansons(response)
})
  
}

//------------------ Affiche COMMENTAIRE-------------


function affCom(idChanson,place){

  musiqueCourante=place;
  id_chanson=idChanson;

  fetch('./src/routeur.php/commentaire/'+ idChanson)
  .then(response=>response.json())
  .then(response=>{
    afficheCommentaire(response); 
  })
  .catch(error => { console.log(error) });
}

function afficheCommentaire(data){
  
  var content='<div class="ajoutCom"><p> ajouter votre commentaire</p><input id="button_ajout_com'+musiqueCourante+'" type="text" size="40"></input><button onclick=ajouteCommentaire('+""+musiqueCourante+","+id_chanson+""+')>Valider</button></div>';
  let zone=document.querySelector("#chansonNum" +musiqueCourante+"")

  zone.classList.toggle('com-displayed');

  zone.innerHTML=content;

    data.forEach(function (commentaire) {
      content+='<div class="com">'
      content+='<p>'+commentaire.pseudo +'&nbsp : &nbsp'+'</p>'
      content+='<p>'+'"'+commentaire.com+'"'+'</p>';
      content+='</div>';
      zone.innerHTML=content;

    })
}

//-------------- AJOUT COMMENTAIRE-------------



function ajouteCommentaire(placeMusique,idMusique){

  console.log(placeMusique);
  console.log(idMusique);
  com=document.querySelector('#button_ajout_com'+placeMusique+"").value;


  form={};
  form.com=com;
  form.idChanson=idMusique;
  form.id_utilisateur=id_utilisateur;
  
  let zone=document.querySelector("#chansonNum" +placeMusique+"")

  zone.classList.toggle('com-displayed');

  
  fetch('./src/routeur.php/commentaire', { method: 'POST', body: JSON.stringify(form)})
  .then(response=>response.json())
  .then(response=>{
  afficheCommentaire(response)
  })
  .catch(error => { console.log(error) });
  
}



//--------------------Interface ------------------

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

  console.log('testInterface')
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


//------------------------Change pdp-------------------//


let photo11=document.querySelector('#photo11');
let photo12=document.querySelector('#photo12');
let photo13=document.querySelector('#photo13');
let photo14=document.querySelector('#photo14');
let photo15=document.querySelector('#photo15');
let photo16=document.querySelector('#photo16');

photo11.addEventListener('click',function(){
  photo=1;
})
photo12.addEventListener('click',function(){
  photo=2;
})
photo13.addEventListener('click',function(){
  photo=3;
})
photo14.addEventListener('click',function(){
  photo=4;
})
photo15.addEventListener('click',function(){
  photo=5;
})
photo16.addEventListener('click',function(){
  photo=6;
})

const changepdp_bouton=document.querySelector('#changepdp_bouton');
const changePdp=document.querySelector('#changePdp');
const valid_change_pdp=document.querySelector('#valid_change_pdp');

changepdp_bouton.addEventListener('click', () => {
  changePdp.classList.toggle('displayed');
  accueil.style.filter='blur(4px)';
  document.querySelector('html body').style.overflowY = 'scroll';
});

valid_change_pdp.addEventListener('click', () => {
 
  form={}
  form.photo=photo;
  form.utilisateur=id_utilisateur;

  console.log(JSON.stringify(form))
  fetch('./src/routeur.php/user/', { method: 'PUT', body: JSON.stringify(form)})
  .then(response=>response.json())
  .then(response=>{
    afficheNvellePdp(response);
  })
  .catch(error => { console.log(error) });

});

function afficheNvellePdp(data){
  console.log(data)
  if(data!=0)
  {
    let content = " <img id='photo_uti' src='./assets/"+ data +".png' > " ;
    pdp.innerHTML = content;
    changePdp.classList.toggle('displayed');
    accueil.style.filter='blur(0px)';
    console.log('c change');
  }
  else alert('veuillez selectionner une photo')
}







