$(document).ready(()=>{
    let page = 1;
    $("#btn-more-read").click(()=>{
        $("#btn-more-read").hide();
        $("#loadinggif").show();
        getApi(`blogs/pagination?status=PUBLISH&page=${page}&category=${categorySlug}`,(res)=>{
            if(!res.data.empty){
                let htmls="";
                res.data.content.forEach(item => {
                    htmls += `<div class="col-12 col-lg-6">
                                <div class="item-post">
                                    <a href="/${item.slug}" title="${item.title}">
                                        <img style="aspect-ratio: 16/10; object-fit: cover" width="662" height="335" src="${item.thumbnail}" class="" alt="game">
                                        <div class="dark-cover">
                                        </div>
                                    </a>
                                    <h3 class="item-post-title">
                                        <a title="${item.title}" href="/${item.slug}">${item.title}</a>
                                    </h3>
                                    <p>${item.description}</p>
                                </div>
                            </div>
`
                })
                $("#container-posts-category").append(htmls)
                page++;
                $("#btn-more-read").show();
                $("#loadinggif").hide();
                if(page >= res.data.totalPages){
                    $("#btn-more-read").hide();
                }
            }else {
                $("#btn-more-read").hide()
            }
        },(res)=>{
            console.log(res)
        })
    })
})