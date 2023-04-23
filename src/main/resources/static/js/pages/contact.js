$(document).ready(()=>{
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target).entries());

        console.log(data)

        $.ajax({
            url: `${LINK_API}contact-us`,
            type: "POST",
            data: data,
            success: function (response) {
                alert("Gửi thành công");
                window.location.href="/contact-us";
            },
        }).fail(function (error){
            alert("Gửi thất bại");
            window.location.href="/contact-us";
        })
    })

})