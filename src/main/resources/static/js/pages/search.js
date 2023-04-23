$(document).ready(()=>{
    let page = 1;
    let searchText = $("#search-input-2").val();
    $("#search-more-post").click(()=>{
        getApi(`blogs/pagination?status=PUBLISH&page=${page}&search=${searchText}`,(res)=>{
            if(!res.data.empty){
                $("#loadinggif").show();
                let htmls="";
                res.data.content.forEach(item => {
                    htmls += `<div class="col-12">
                            <div class="search-post">
                                <a  href="/${item.slug}">
                                    <img width="90" height="90" src="${item.thumbnail}" title="${item.title}" alt="game">
                                </a>
                                <div>
                                    <a title="${item.title}"  href="/${item.slug}">
                                        ${item.title}
                                    </a>
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        </div>
`
                })
                $("#search-container").append(htmls)
                page++;
                if(page >= res.data.totalPages){
                    $("#search-more-post").hide();
                }
                $("#loadinggif").hide();
            }else {
                $("#search-more-post").hide()
            }
        },(res)=>{
            console.log(res)
        })
    })
})