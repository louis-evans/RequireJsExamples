define([], function() {

    return {
        info: (msg) => toastr.info(msg),
        warn: (msg) => toastr.warning(msg),
        error: (msg) => toastr.error(msg),
        success: (msg) => toastr.success(msg)
    }

});