Function.prototype.delay = function(delay=75){
    const m = this;
    return function(...rest){
        let t = this;
        m.__delay = setTimeout(__=>{
            m.__delay = null;
            m.call(t, ...rest);
        }, delay)
    }
}

Function.prototype.cancelDelay = function(run, ...rest){
    const m = this;
    if (m.__delay) {
        clearTimeout(m.__delay);
        if (run) {
            m(...rest);
        }
    }
}
