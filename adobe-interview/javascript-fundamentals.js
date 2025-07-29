function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}


// !TODO promisify fn


function promisify(fn) {
    return function(...args) {
        return new Promise((res, rej) => {
            function callback(err, result) {
                if(err) rej(err)
                else {
                    res(result)
                }
            }

            args.push(callback)

            fn.apply(this, args)
            // fn.call(this, ...args)
        })
    }
}



let promisifiedLoadScript = promisify(loadScript);

promisifiedLoadScript('./').then(v => console.log(v));
