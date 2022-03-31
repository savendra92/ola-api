exports.pass = (res, message, data = null, status = 200) => {


    const resp = {
        success: true,
        message
    };

    if (data) resp.data = data;
    return res.status(status).json(resp);
}

exports.fail = (res, message, data = null, status = 200) => {


    const resp = {
        success: false,
        message
    };

    if (data) resp.data = data;
    return res.status(status).json(resp);
}