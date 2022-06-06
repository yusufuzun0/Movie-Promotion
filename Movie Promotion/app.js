
const API_KEY = '5cf01a2a662986ba6bed84dc26f8a022';
const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`;
const url = `http://api.themoviedb.org/3/search/movie?api_key=5cf01a2a662986ba6bed84dc26f8a022&language=eu`;


const searchInput = document.querySelector('#inputValue');
const searchButton = document.querySelector('#search');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container')

function generateUrl(path) {
    const url = `http://api.themoviedb.org/3${path}?api_key=5cf01a2a662986ba6bed84dc26f8a022`;
    return url;
}


function movieSection(movies) {

    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id = ${movie.id} />`;
        }
    })

}

function createMovieContainer(movies, title) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    // <div class="movie"> </div>
    if (typeof title === 'undefined') {
        title = searchInput.value;
    }
    const movieTemplate = `
        <h2>${title}</h2>
        <br />
        <section class="section">
            ${movieSection(movies)}
       </section>
       <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}


function renderSearchMovies(data) {

    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
}
function renderMovies(data, title) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, title);
    moviesContainer.appendChild(movieBlock);
}

function getUpComingMovies() {

    const path = '/movie/upcoming';
    const url = generateUrl(path);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const title = 'UpComing Movies';
            renderMovies(data, title);
        })
        .catch(err => {
            console.log(err);
        })

}
function getNowMovies() {

    const path = '/movie/now_playing';
    const url = generateUrl(path);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const title = 'Now Playing Movies';
            renderMovies(data, title);
        })
        .catch(err => {
            console.log(err);
        })

}
function getUpTopMovies() {

    const path = '/movie/top_rated';
    const url = generateUrl(path);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const title = 'Top Movies';
            renderMovies(data, title);
        })
        .catch(err => {
            console.log(err);
        })

}
function getUpPopularMovies() {
    const path = '/movie/popular';
    const url = generateUrl(path);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const title = 'Popular Movies'
            renderMovies(data, title);
        })
        .catch(err => {
            console.log(err);
        })

}


function createIframe(video) {
    const videoKey = (video && video.key) || 'No key found!!!';
    const iframe = document.createElement('iframe');
    iframe.src = `http://www.youtube.com/embed/${videoKey}`;
    iframe.width = 560;
    iframe.height = 515;
    iframe.allowFullscreen = true;
    return iframe;
}



function createVideoTemplate(data, content) {
    content.innerHTML = '<div id="content-close" style="background-color:aqua;">Close</div>';
    const videos = data.results;
    const length = videos.length > 2 ? 2 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}
function StorogeC(user){

    let users;
    if(localStorage.getItem('users')===null){
        users=[];
        users.push(user);
    }else{
        users=JSON.parse(localStorage.getItem('users'));
        users.push(user);
    }
    localStorage.setItem('users',JSON.stringify(users));
    
}
function StorogeGET(){
    let users;
    if(localStorage.getItem('users')===null){
        users=[];
    }else{
        users=JSON.parse(localStorage.getItem('users'));
    }

    return users;
}


function commentTemplate(content,movieId){

    const user = function(id,name,userComment,userVote){
        this.movieId=movieId;
        this.id=id;
        this.name=name;
        this.userComment=userComment;
        this.userVote=userVote;
    } 

    const data = {
        users : StorogeGET(),
    }

    const commentElement=document.createElement('div');
    commentElement.setAttribute('class',' form-group');
    
    commentElement.innerHTML=
    `
    <form>
    <span class="input-group-text" style="width:20%">Your Name</span>
      <input type="text" id="nameInput" class="form-control" placeholder ="" style="margin-right:910px; margin-bottom:10px; width:20%">  
      <span class="input-group-text" style="width:20%" >Vote</span>
     <select class="form-control" id="voteInput" style="margin-bottom:10px; width:20%">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
    </select>
    
    
        <span class="input-group-text">Comment</span>
        <textarea type="text" placeholder="text" maxlength="100" id="commentInput" class="form-control"  style=" margin-bottom:10px;"> </textarea>
 
      <button type="submit" class="btn btn-primary" rows="4" id="createComment" style="margin-top:20px; margin-right:910px;">Create</button>
    <form>  
    `;
    content.appendChild(commentElement);
    
    var table=document.createElement('div');
    table.setAttribute('class','container')
    table.innerHTML=
    `
    <table class=" table container" style="margin-left:220px">
        <thead>
            <tr>
                <th width=10px>Name<th>
                <th width=10px>Vote<th>
                <th>Comment<th>
            </tr>
        </thead>
        <tbody id="item-list">
            
        </tbody>
    </table>
    `;

    content.appendChild(table);
    
     document.querySelector('#createComment').addEventListener('click',function(e){
        
        var name=document.querySelector('#nameInput').value;
        var comment=document.querySelector('#commentInput').value;
        var vote=document.querySelector('#voteInput').value;

        //users

        let id;

        if (data.users.length > 0) {
            id = data.users[data.users.length - 1].id + 1;
        } else {
            id = 0;
        }
        const newUser = new user(id,name,comment,vote);
        data.users.push(newUser);
        //
        function add(user){
            var html = `
            <tr>
                 <td>${user.name}<td>
                 <td>${user.userVote}<td>
                 <td>${user.userComment}<td>
            </tr>
            `;
            var itemList=document.querySelector('#item-list');
            itemList.innerHTML+=html;
        }
        add(newUser);
        StorogeC(newUser);
        

        function clear(){
            document.querySelector('#nameInput').value='';
            document.querySelector('#commentInput').value='';
            document.querySelector('#voteInput').value='';
        }
        clear();

        e.preventDefault();
    }); 

}

document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        

        const section = e.target.parentElement; // section
        const content = section.nextElementSibling; // content
        content.classList.add('content-display');

        const path = '/movie/' + movieId + '/videos';
        const url = generateUrl(path);

        //fetch videos
        fetch(url)
            .then(res => res.json())
            .then(data => {
                createVideoTemplate(data, content)
            })
            .catch(err => {
                console.log(err);
            });


        const path3 = `/movie/` + movieId;
        const url3 = generateUrl(path3);
        fetch(url3)
            .then(res => res.json())
            .then(data => {
                
                var titleElement = document.createElement('div');
                titleElement.innerHTML = `<h1 style="margin-bottom:25px">${data.original_title}</h1>`
                content.appendChild(titleElement);

                var descriptionElement = document.createElement('p');
                descriptionElement.innerHTML = `<p class="container">${data.overview}</p>`;
                content.appendChild(descriptionElement);

                var filmGenres = document.createElement('p');
                data.genres.forEach(item => {
                    filmGenres.innerHTML = `<p class="container"><span style="color:red">Film Genres</span> : ${item.name}</p>`;
                });
                content.appendChild(filmGenres);

                var dateElement = document.createElement('p');
                dateElement.innerHTML = `<p class="container"><span style="color:red">Release Date</span> : ${data.release_date}</p>`;
                content.appendChild(dateElement);
                //////////////////////////////////////////////////////////////////////////////////////////
                var renevueElement = document.createElement('p');
                renevueElement.innerHTML = `<p class="container"><span style="color:red">Renevue </span> : ${data.revenue}$</p>`;
                content.appendChild(renevueElement);

                var voteElement = document.createElement('p');
                voteElement.innerHTML = `<p class="container"><span style="color:red">Vote Avarage </span> : ${data.vote_average}</p>`;
                content.appendChild(voteElement);

                commentTemplate(content,movieId);


                var items=document.querySelector('#item-list');
                StorogeGET().forEach(item=>{
                    if(item.movieId==movieId){

                        items.innerHTML+=
                        `
                        <tr>
                            <td>${item.name}<td>
                            <td>${item.userVote}<td>
                            <td>${item.userComment}<td>
                         </tr>
                        
                        `;
                    }
                });
                

            })
            .catch(err => {
                console.log(err);
            });   

            
    }
    if (target.id === 'content-close') {
        target.parentElement.classList.remove('content-display')
        //content.classList
    }

   
});

searchButton.addEventListener('click', function (e) {
    const value = searchInput.value;
    var stitle=document.querySelector('#search-title');
    stitle.innerHTML=`"${value}" Results`;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;

    fetch(newUrl)
        .then(res => res.json())
        .then(renderSearchMovies)
        .catch(err => {
            console.log(err);
        });

    searchInput.value = '';
    e.preventDefault();
});
$(document).ready(function(){
    $(window).scroll(function () {
        if ($(window).scrollTop() > 70) {
            $(".ornek").show(500);
        }
        else {
            $(".ornek").hide(500);
        }
    });
    $(".ornek").click(function(){
        $("body").animate({
            scrollTop:0
        },1500);
    });
    $("img").click(function(){
        console.log('tıklandı')
    })

});

getUpTopMovies();
getNowMovies();
getUpComingMovies();
getUpPopularMovies();