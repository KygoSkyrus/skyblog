function getBlogFromSearch() {
    var value = $("#search").val();

    var container = $(".results"); //result container
    var srch = $(".srch"); //search button

    let reslt = document.getElementById("results");
    reslt.classList.remove("dnone");

    var formdata1 = new FormData();

    formdata1.append("val", value);

    console.log(value);

    $.ajax({
        url: "/searchblog",
        data: formdata1,
        contentType: false,
        processData: false,
        type: "POST",
        success: function (data) {
            console.log(data);
            let resultsdata = "";

            //if there is no result then this will show
            if (data.length === 0) {
                console.log("is zero");
                resultsdata += `<section class="" style="padding:8px; text-align:center;background:#14213d;color:white;">No related blogs found!!!</section>`;
            }

            for (var i = 0; i < data.length; i++) {
                resultsdata += `<a href="/${data[i].url}" target="_blank"><section class="results-data">${data[i].title}</section></a>`;
            }
            $(".results").html(resultsdata);

            $(document).click(function (e) {
                // if the target of the click isn't the container nor a descendant of the container
                if (
                    !container.is(e.target) &&
                    container.has(e.target).length === 0
                ) {
                    if (!srch.is(e.target)) {
                        reslt.classList.add("dnone");
                    }
                }
            });
        },
    });
}