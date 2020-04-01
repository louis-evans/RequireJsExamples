define([], function(){
    return {
        debug: (msg) => console.log("DEBUG:", msg),
        warn: (msg, ex) => ex ? console.log("WARN:", msg, ex) :console.log("WARN!!!:", msg),
        error: (msg, ex) => console.error(msg, ex)
    }
})