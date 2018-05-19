const allPostsParents = document.querySelector('#posts ul');
const postsElement = document.getElementById('posts');
const bodyElement = document.getElementById('body');
const contentView = document.querySelector('#body > div');
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        fill(JSON.parse(this.responseText));
    }
    
}
xhr.open('GET', 'posts.json', true);
xhr.send();

function fill(jsonArray){
    const len = jsonArray.length;
    for (let i = 0; i < len; i++) {
        let postNode = document.createElement('li');
        let titleElement = document.createElement('h5');
        let infoElement = document.createElement('span');
        titleElement.innerText = jsonArray[i].title;
        infoElement.innerText = jsonArray[i].info;
        postNode.appendChild(titleElement);
        postNode.appendChild(infoElement);
        postNode.onclick = function(){
            postsElement.parentElement.classList.add('col-30');
            postsElement.parentElement.classList.remove('col-100');
            bodyElement.style.display = 'block';
            
            let allChild = this.parentElement.children;
            for (let i = 0; i < allChild.length; i++) {
                const element = allChild[i];
                element.classList.remove('active');
            }

            this.classList.add('active');
            contentView.innerHTML = this.innerHTML + '<hr/>';
            contentView.innerHTML += jsonArray[i].body;
            location.hash = '#body';
        }
        allPostsParents.appendChild(postNode);
    }
}

document.onreadystatechange = function(){
    if (document.readyState == 'complete'){
        document.getElementById('waiting').remove();
    }
}