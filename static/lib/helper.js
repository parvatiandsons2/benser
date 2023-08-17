function fn_CatchError(ex) {
    console.log(ex)
    notie.alert({ type: 'error', text: `${ex}`, stay: false, position: 'bottom' })
}

function fn_QueryStringToJSON(qs) {
    qs = qs || location.search.slice(1);

    var pairs = qs.split('&');
    var result = {};
    var is_result = false;
    pairs.forEach(function (p) {
        var pair = p.split('=');
        var key = pair[0];
        var value = decodeURIComponent(pair[1] || '');
        if (key.length > 0) {
            is_result = true;

            if (result[key]) {
                if (Object.prototype.toString.call(result[key]) === '[object Array]') {
                    result[key].push(value);
                } else {
                    result[key] = [result[key], value];
                }
            } else {
                result[key] = value;
            }
        }
    });

    if (is_result) {
        return JSON.parse(JSON.stringify(result));
    } else { return null }
};

function jsonToQueryString(json) {
    return '?' +
        Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

function fn_ErrorFound(err) {
    notie.alert({ type: 'error', text: `${err}`, stay: false, position: 'bottom' })
}

function fn_EncryptResponse(response) {
    try {
        if (response.status >= 200 && response.status < 300) {
            let clone = response.clone();
            var data = clone.json();
            return Promise.resolve(data).then(function (res) { return res });
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    } catch (objErrorText) {
        fn_CatchError(objErrorText);
    }
}

function fn_ConvertImageToBase64(input, fn) {
    if (input.files && input.files[0]) {
        count = 1
        $.each(input.files, function () {
            let file = this
            var reader = new FileReader();

            reader.onload = function (e) {
                fn(e.target.result, (count == input.files.length))
                count++;
            }

            reader.readAsDataURL(file);

        })
    }
}

async function fn_GetAsyncCall(api) {
    var response = await fetch(api, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(fn_EncryptResponse).then(function (response) {
        return response
    }).catch(function (err) {
        return { 'ok': 0, "error": err }
    });

    return response;
}

async function fn_PostAsyncCall(api, jsonBody) {
    var response = fetch(api, {
        method: 'POST',
        body: jsonBody,
        headers: { 'Content-Type': 'application/json' }
    }).then(fn_EncryptResponse).then(function (response) {
        return response
    }).catch(function (err) {
        return { 'ok': 0, "error": err }
    });

    return response;
}

async function fn_PatchAsyncCall(api, jsonBody) {
    var response = fetch(api, {
        method: 'PATCH',
        body: jsonBody,
        headers: { 'Content-Type': 'application/json' }
    }).then(fn_EncryptResponse).then(function (response) {
        return response
    }).catch(function (err) {
        return { 'ok': 0, "error": err }
    });

    return response;
}

async function fn_DeleteAsyncCall(api) {
    var response = fetch(api, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(fn_EncryptResponse).then(function (response) {
        return response
    }).catch(function (err) {
        return { 'ok': 0, "error": err }
    });

    return response;
}

function fn_Logout() {
    window.localStorage.removeItem('userID')
    window.location.assign('/account/logout/')
}

function fn_RatingStars(avg_rating) {
    // console.log(avg_rating)
    avg_rating = parseInt(avg_rating)
    half = 5 - avg_rating
    stars = ""
    for (var index = 0; index < avg_rating; index++) {
        stars += `<i class="fas fa-star"></i>`
    }

    for (var index = 0; index < half; index++) {
        stars += `<i class="far fa-star"></i>`
    }

    return stars
}

function fn_Loading(text) {
    return `<img width="20" src="/static/images/loading.gif" style="display:inline-block;" />&nbsp;&nbsp;${text}`
}

function getVerticalScrollPercentage(elm) {
    var p = elm.parentNode
    return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight) * 100
}