
let searchBox = document.querySelector('.searchBox');
let container = document.querySelector('.galery')
let label = document.querySelector('.input-galery label');


searchBox.addEventListener("input", function(){
    console.log(this.value);
    let images = document.querySelectorAll('.image');

    searchBox.setAttribute('style', 'height: 64px !important');
    if (this.value.length > 0){
        label.setAttribute('style', 'top: -12px');
        container.setAttribute('style', 'height: 100vh !important');
        for (i = 0; i < images.length; i++){
            let image = images[i];
            let name =  image.querySelector('h3').textContent;
            var expressao = new RegExp(this.value, "i");
            
            
            if (!expressao.test(name)){
                image.classList.add("invisivel");
    
            }else {
                image.classList.remove("invisivel");
    
            }
    
        }
    }else {
        label.setAttribute('style', 'top: 50%');
        container.setAttribute('style', 'height: 100% !important');
        for (i = 0; i < images.length; i++){
            var image = images[i];
            image.classList.remove("invisivel");
        }
    }
    
});