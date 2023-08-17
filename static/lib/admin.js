let userName = $('div.sidebar').find('div.info').find('a').text()
let notification_count = 0
let notification_html = ""

var content_HTML = ''
content_HTML = document.getElementById('content').innerHTML;
if (typeof userName == 'undefined' || userName == "") {
    userName = $('div.sidebar').find('div.info').find('span').text()
}

async function fn_GetAsyncCall(api) {
    var response = await fetch(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Token ae6365791869a7cae9caa0411a659f5090bf8397"
        }
    }).then(fn_EncryptResponse).then(function (response) {
        return response
    }).catch(function (err) {
        return {
            'ok': 0,
            "error": err
        }
    });

    return response;
}


function fn_EncryptResponse(response) {
    try {

        if (response.status >= 200 && response.status < 300) {
            let clone = response.clone();
            var data = clone.json();
            return Promise.resolve(data).then(function (res) {
                return res
            });
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    } catch (objErrorText) {
        fn_CatchError(objErrorText, 0, true);
        fn_UnblockUI('.pendingLoader');
    }
}

function fn_TestJSON(text) {
    if (typeof text == "string") {
        return false;
    }
    try {
        text = JSON.stringify(text)
        JSON.parse(text);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
if (window.location.pathname == '/admin/') {

    document.getElementById('content').innerHTML = "Loading Dashboard..."
    $('.sidebar').find('nav').hide()



    fn_getRole()

    jQuery.loadScript = function (url, callback) {
        jQuery.ajax({
            url: url,
            dataType: 'script',
            success: callback,
            async: true
        });
    }

}


function fn_SignBaseHtml() {
    return `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card mb-3">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-4"><span id="dvBuzName"><b>Rules and Regulations</b></span></div>
                        <div class="col-md-7 "></div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row" id="dvCityPricing">
                        <div class="col-md-6"><div id="pdfAcademicContainer"></div></div>
                        <div class="col-md-6"><div id="pdfAdministrationContainer"></div></div>
                    </div>
                    <div class="row" id="dvRuleSign">
                        <div class="col-md-12 form-group">
                            <div><canvas style="border: 1px solid #ccc" id="myCanvas"></canvas></div>
                        </div>

                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-md-12">
                            <input type="button" id="btnDone" class="btn btn-success float-right mr-2" value="Done"/>
                            <input type="button" class="btn btn-danger float-right mr-2" value="Reset" id="resetSign">
                            <input type="button" id="btnAccept" class="btn btn-primary float-right mr-2" value="Accept & Continue"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
`
}


// checking Role and assigning dashboard
function fn_GetNotifications() {
    fetch(`/api/dashboard/notification/${userName}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(fn_EncryptResponse).then(function (response) {
        console.log('-----------', response)
        if (response.ok > 0) {
            let data = response.data
            if ('candidate' in data) {
                if (Object.keys(data.candidate).length > 0) {
                    append_notification(data.candidate, data.candidate.data.length)
                }
            }
            if ('diploma' in data) {
                if (Object.keys(data.diploma).length > 0) {
                    append_notification(data.diploma, data.diploma.data.length)
                }
            }
            if ('tc_cc' in data) {
                if (Object.keys(data.tc_cc).length > 0) {
                    append_notification(data.tc_cc, data.tc_cc.data.length)
                }
            }
            if ('nodues' in data) {
                if (Object.keys(data.nodues).length > 0) {
                    append_notification(data.nodues, data.nodues.data.length)
                }
            }

            if ('uniform' in data) {
                if (Object.keys(data.uniform).length > 0) {
                    append_notification(data.uniform, data.uniform.data.length)
                }
            }

            if ('books' in data) {
                if (Object.keys(data.books).length > 0) {
                    append_notification(data.books, data.books.data.length)
                }
            }

            let html =
                `
            <li class="nav-item dropdown">
                <a class="nav-link btn" data-toggle="dropdown" href="#" title="Notifications">
                    <i class="far fa-bell pr-2" aria-hidden="true"></i> <span class="float-right badge badge-danger">${notification_count}</span>
                </a>

                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" id="jazzy-usermenu">
                    <span class="dropdown-header">Notifications</span>
                    <div class="dropdown-divider"></div>${notification_html}
                    <a href="javascript:fn_Working()" class="dropdown-item dropdown-footer">Mark as all read</a>
                </div>
            </li>
            `

            $('ul.navbar-nav:eq(1)').prepend(html);
        }

    });
}

function isCanvasEmpty(canvas) {
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Loop through the image data to check for any non-transparent pixels
    for (var i = 0; i < imageData.length; i += 4) {
        // If any non-transparent pixel is found, the canvas is not empty
        if (imageData[i + 3] !== 0) {
            return false;
        }
    }

    // If no non-transparent pixels were found, the canvas is empty
    return true;
}

// checking Role and assigning dashboard
function fn_getRole() {
    fetch(`/api/dashboard/check-rules/${userName}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(fn_EncryptResponse).then(function (response) {
        console.log(response)
        if (response.ok > 0) {

            role = response.data[0]['role']

            let ind = ''
            if (response.data[1] != undefined) {
                ind = response.data[1]['industry']

            }

            let welcomeMsg = ''
            if (role == 'Admin') {
                welcomeMsg = 'Welcome to RCMT Rudrapur Administration'
                $('.sidebar').find('nav').show()
                if (window.location.pathname == '/admin/') {
                    // document.getElementById('content').innerHTML = content_HTML;
                    $.loadScript("/static/lib/admin_dashboard.js", function () {
                        document.getElementById('content').innerHTML = fn_BaseHTMLAdmin()
                        fn_GetAdminData()

                    })

                }
            } else if (role == 'Industry Admin') {
                welcomeMsg = 'Welcome to RCMT Rudrapur Industry Admin'
                $('.sidebar').find('nav').show()
                if (window.location.pathname == '/admin/') {

                    $.loadScript("/static/lib/industry_dashboard.js", function () {
                        fn_GetIndustryData(ind.id)

                    })


                }
            }
            else if (role == 'Candidate') {
                welcomeMsg = 'Welcome to RCMT Rudrapur Candidate Account'
                if (response.data[0]['is_accepted_rules']) {
                    $('.sidebar').find('nav').show()
                    if (window.location.pathname == '/admin/') {
                        $.loadScript("/static/lib/candidate_dashboard.js", function () {

                        })
                        // document.getElementById('content').innerHTML = content_HTML
                    }
                } else {

                    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js", function () {
                        document.getElementById('content').innerHTML = `<div id="dvProjectSidePanel" class="sidepanel pt-0">${fn_SignBaseHtml()}</div>`
                        document.getElementById("dvProjectSidePanel").style.width = "100%";
                        document.getElementById("dvProjectSidePanel").style.padding = "10px";
                        fn_setPDF("/static/files/Academic-Rules.pdf", 'pdfAcademicContainer')
                        fn_setPDF("/static/files/Administration-Rules.pdf", 'pdfAdministrationContainer')
                        $('#dvRuleSign, #btnDone, #resetSign').hide()
                        $.getScript("/static/lib/sign.js", function () {
                            $('#btnAccept').on('click', function () {
                                $('#dvCityPricing, #btnAccept').hide()
                                $('#dvRuleSign, #btnDone, #resetSign').show()
                                $('#myCanvas').sign({
                                    resetButton: $('#resetSign'),
                                    width: 400,// default: 500
                                    height: 200, // default: 300
                                    lineWidth: 5
                                });
                            })

                            $('#btnDone').on('click', function () {
                                var canvas = document.getElementById('myCanvas');
                                var isEmpty = isCanvasEmpty(canvas);

                                if (isEmpty) {
                                    console.log("Canvas is empty.");
                                    alert('invalid Signature')
                                } else {

                                    $('#resetSign').hide()
                                    $('#btnDone').val('Submitting...')
                                    fetch(`/api/dashboard/accept-rules/${userName}/`, {
                                        method: 'POST',
                                        body: JSON.stringify({ "signature": canvas.toDataURL("image/png") }),
                                        headers: { 'Content-Type': 'application/json' }
                                    }).then(fn_EncryptResponse).then(function (response) {
                                        if (response.ok > 0) {
                                            window.location.reload()
                                        } else {
                                            console.log(response)
                                        }
                                    });
                                }


                            })
                        });
                    });
                }
            }
            else if (role == 'Accountant') {
                welcomeMsg = 'Welcome to RCMT Rudrapur Accountant Account'
                $('.sidebar').find('nav').show()
                if (window.location.pathname == '/admin/') {
                    document.getElementById('content').innerHTML = content_HTML
                }
            } else {
                console.log(response)
            }

            $($('#jazzy-navbar').find('ul')[0]).append(`<li class="nav-item d-none d-sm-inline-block"><a href="javascript:void()" class="nav-link active">${welcomeMsg}</a></li>`)

        }
        else {
            console.log(response)
        }
    });
}


function fn_setPDF(url, selectorID) {
    // const url = 'path/to/your/file.pdf';
    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Asynchronous download of PDF
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        // Create a container for each page
        const pdfContainer = document.getElementById(selectorID);
        $(`#${selectorID}`).empty().append('')
        console.log($(`#${selectorID}`))
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const pageContainer = document.createElement('div');
            pageContainer.className = 'pageContainer';
            pdfContainer.appendChild(pageContainer);

            // Apply CSS styles to create the bottom border line
            pageContainer.style.position = 'relative';
            pageContainer.style.border = '1px solid #ccc';

            // Fetch the page and render it
            pdf.getPage(pageNumber).then(function (page) {
                const scale = 1.0;
                const viewport = page.getViewport({ scale: scale });

                function updateCanvasSize() {
                    // Prepare canvas using PDF page dimensions
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    pageContainer.appendChild(canvas);
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const parentWidth = pageContainer.clientWidth;
                    const parentHeight = pageContainer.clientHeight;

                    const canvasWidth = parentWidth > viewport.width ? viewport.width : parentWidth;
                    const canvasHeight = parentHeight > viewport.height ? viewport.height : parentHeight;

                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;


                    // Render PDF page into canvas context
                    const renderContext = {
                        canvasContext: context,
                        viewport: page.getViewport({ scale: canvasWidth / viewport.width }),
                    };
                    page.render(renderContext);

                    // // Calculate and display the page content length in percentage
                    // const contentLengthPercentage = (canvasHeight / viewport.height) * 100;
                    // console.log(`Page Content Length: ${contentLengthPercentage.toFixed(2)}%`);
                }
                // Initial render on page load
                updateCanvasSize();

                // Re-render the page when the window is resized
                // window.addEventListener('resize', updateCanvasSize);

            });
        }
    });
}


// Making Active Menu And Bottom Copyright
$(function () {

    let nav = $('nav').find('ul.nav-pills')
    let path = window.location.pathname
    $('.main-footer').find('div.float-right').empty().append('Developed by <b>Parvati and sons</b> | <small>designed by Jazzmin version 2.4.8</small>')

    let spt = path.split('/'),
        anc = ''

    if (spt.length > 5) {
        let newPath = '',
            index = 0
        $.each(spt, function () {

            if (index < 4) {
                if (this == '') {
                    newPath += '/'
                } else {
                    newPath += this + '/'
                }


            }
            index++;
        })

        anc = $(nav).find('a[href="' + newPath + '"]')

    } else {
        anc = $(nav).find('a[href="' + path + '"]')
    }

    $(anc).parent().parent().css('display', 'block')
    $(anc).parent().parent().parent('li').addClass('menu-is-opening menu-open')
    $(anc).parent().parent().parent('li').children('a.nav-link').addClass('active')

    fn_GetNotifications()

})

function isVisible($el) {
    if ($el.length) {
        var winTop = $(window).scrollTop();
        var winBottom = winTop + $(window).height();
        var elTop = $el.offset().top;

        var elBottom = elTop + $el.height();
        return ((elTop >= winTop));
    }
    return false
}

function append_notification(res, count) {
    console.log('noti-------', res, count)
    if (count > 0) {
        let nav = $('nav').find('ul.nav-pills')
        let anc = $(nav).find('a[href="/admin/' + res.url + '"]')

        $(anc).find('p').append('&nbsp;<span class="float-right badge badge-danger">' + count + '</span>')

        if ($(anc).parent().parent().parent('li').children('a.nav-link').find('p').find('span').length > 0) {
            let no = $(anc).parent().parent().parent('li').children('a.nav-link').find('p').find('span').text()
            no = parseInt(no) + count
            $(anc).parent().parent().parent('li').children('a.nav-link').find('p').find('span').text(no)
        } else {
            $(anc).parent().parent().parent('li').children('a.nav-link').find('p').append('&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge badge-danger">' + count + '</span>')
        }

        notification_count += count

        $.each(res.data, function () {
            let src = res.url.toString().split('/')

            notification_html +=
                '<a href="/admin/' + res.url + '" class="dropdown-item">' +
                '    <i class="fas fa-circle mr-2"></i> ' + this.name + ' - <small> ' + src[1] + '</small>' +
                '</a>' +
                '<div class="dropdown-divider"></div>';
        });
    }
}

// Making List Display Static
if (window.location.pathname != '/admin/') {
    $(function () {



        if ($('#result_list')) {

            let wdth = $('#result_list').width() + 'px'
            let dv_wdth = $('#result_list').parent().width() + 'px'

            $('#result_list').parent().append('<div  style="width:' + dv_wdth + '" class="bottom-scroll"><div style="width:' + wdth + '" >&nbsp;</div></div>')

            $('.bottom-scroll, #stickyhead').on('scroll', function () {
                $('#result_list').parent().prop("scrollLeft", this.scrollLeft);
                $('#stickyhead').prop("scrollLeft", this.scrollLeft);
            })

            let html_th = ''
            $.each($('#result_list').find('thead').find('tr').find('th'), function () {
                html_th += '<th style="width:' + $(this).width() + 'px;">' + $(this).html() + '</th>'
            })

            let html_tr = ''

            $('#result_list').parent().append('<div id="stickyhead" style="width:' + dv_wdth + '" class="table table-striped no-sticky" "> <table style="width: ' + wdth + ';"> <thead><tr>' + html_th + '</tr> </thead> <tbody>' + html_tr + '</tbody> </table></div>')

            $('#stickyhead').find('thead').find('input[type="checkbox"]').on('change', function () {
                $('#result_list').find('thead').find('input[type="checkbox"]').click()
            })


            $(window).scroll(function () {
                if (!isVisible($("#result_list"))) {
                    $('#stickyhead').addClass("sticky")
                    $('#stickyhead').removeClass("no-sticky")
                } else {
                    $('#stickyhead').addClass("no-sticky")
                    $('#stickyhead').removeClass("sticky")
                }
            });

            $('#result_list').parent().on('scroll', function () {
                $('#stickyhead').parent().prop("scrollLeft", this.scrollLeft);
                $('.bottom-scroll').prop("scrollLeft", this.scrollLeft);
            })

            $('#result_list').find('td.field-is_sean').find('img[alt="False"]').parent().parent().addClass('unread')

            $('span[data-id="is_seen"][data-value="False"]').parent().parent().addClass('unread')
        }

    })
}



