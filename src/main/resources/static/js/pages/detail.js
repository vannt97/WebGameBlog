$(document).ready(()=>{
    getApi("blogs?status=PUBLISH",(res)=>{
        if(res.succes){
            let arrRender = [];
            res.data = res.data.filter(item => item.id !== id);
            arrRender = shuffleArray(res.data);
            let htmls = "";
            arrRender.forEach((i,index) => {
                if(index <4){
                    htmls += `<div class="col-12 col-lg-6">
                    <div class="item-post">
                        <a href="/${i.slug}" title="${i.title}">
                            <img style="aspect-ratio: 16/10; object-fit: cover" width="302" height="180" src="${i.thumbnail}" alt="game" title="${i.title}"/>
                        </a>
                        <h2 class="item-title">
                            <a href="/${i.slug}" title="${i.title}">
                                ${i.title}
                            </a>
                        </h2>
                        <p>Feb 15, 2021
                           <span>-</span> <a href="#"><span>No Comments</span></a>
                        </p>
                    </div>
                </div>`
                }
            });

            $("#related-news").html(htmls)
        }
    })
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}