$(document).ready(()=>{
    getApi("count/blogs", (res)=>{
        $("#dashboard-blogs").html(res.data.size)
    })
    getApi("count/categories", (res)=>{
        $("#dashboard-categories").html(res.data.size)
    })
    getApi("count/accounts", (res)=>{
        $("#dashboard-accounts").html(res.data.size)
    })
})