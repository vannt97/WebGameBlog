$(document).ready(function () {
        $(".silder-header").slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            // fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        })

        $(".mt-controls-prev").click(()=>{
            $(".silder-header").slick("slickPrev");
        })

        $(".mt-controls-next").click(()=>{
            $(".silder-header").slick("slickNext");
        })

        const offsetHeightHeader = $(".navbar-header")[1].offsetTop;
        if (window.innerWidth < 991.98) {
            window.addEventListener('scroll',function (e){
                if(window.scrollY > 0 ){
                    $(".navbar-header")[0].classList.add("navbar-stick");
                }else {
                    $(".navbar-header")[0].classList.remove("navbar-stick");
                }
            })
        }else {
            window.addEventListener('scroll',function (e){
                if(window.scrollY > offsetHeightHeader ){
                    $(".navbar-header")[1].classList.add("navbar-stick");
                }else {
                    $(".navbar-header")[1].classList.remove("navbar-stick");
                }
            })
        }
        $('.shooter-games .slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplay: true,
        });
}
)
