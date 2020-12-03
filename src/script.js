window.addEventListener('load',function(){

const sect1=document.querySelector('#section1');
const sect2=document.querySelector('#section2');
const affiche=document.querySelector('#search');
const retour=document.querySelector('#retour');

affiche.addEventListener('click',function(){
    sect1.style.width=0+'vw';
    sect2.style.width=100+'vw';
})

retour.addEventListener('click',function(){
    sect1.style.width=100+'vw';
    sect2.style.width=0+'vw';
})
    

})