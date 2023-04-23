$(document).ready(function (){
    $('.module-slider .slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        // speed: 500,
        // autoplay: true,
        fade: true,
        prevArrow: "<a class=\"slick-prev slick-arrow\" aria-label=\"Previous\" type=\"button\" style=\"\"><i class=\"fa-sharp fa-solid fa-angle-left\"></i>\n</a>",
        nextArrow: "<a class=\"slick-next slick-arrow\" aria-label=\"Next\" type=\"button\" style=\"\"><i class=\"fa-sharp fa-solid fa-angle-right\"></i></a>",
    });

    let page = 1;
    let optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    $("#btn-more-read").click(()=>{
        $("#btn-more-read").hide();
        $("#loadinggif").show();
        getApi(`blogs/pagination?status=PUBLISH&page=${page}`,(res)=>{
            console.log(res)
            if(!res.data.empty){
                let htmls="";
                res.data.content.forEach(item => {
                    let dateFormat = new Date(item.createdDate);
                    htmls += `<div class="col-12">
                                    <div class="item-post">
                                        <a href="/${item.slug}">
                                            <img width="270" height="235" src="${item.thumbnail}" class="" alt="" loading="lazy">
                                        </a>
                                        <div>
                                            <h2 class="item-title">
                                                <a href="/${item.slug}">
                                                    ${item.title}
                                                </a>
                                            </h2>
                                            <p>
                                                <span>${dateFormat.toLocaleDateString("en-US", optionsDate)}</span>
<!--                                                <a href="#"><i class="fa-regular fa-thumbs-up"></i> <span>2</span></a>-->
<!--                                                <span><i class="fa-solid fa-trophy"></i> 1623 Plays</span>-->
                                            </p>
                                        </div>
                                    </div>
                                </div>
`
                })
                $("#container-posts").append(htmls)
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