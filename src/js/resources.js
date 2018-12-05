export default class Resources {
    constructor() {
        // private stuff
        this.resourceCache = {};
        this.readyCallbacks = [];
        /* This is our private image loader function, it is
            * called by the public image loader function.
            */
        let _load = (url) => {
            // console.log(`in _load url: ${url} resourceCache: ${resourceCache}`);
            // console.log(resourceCache);
            // console.log(`resourceCache[url]: ${resourceCache[url]}`);
            if(this.resourceCache[url]) {
                /* If this URL has been previously loaded it will exist within
                    * our resourceCache array. Just return that image rather than
                    * re-loading the image.
                    */
                return this.resourceCache[url];
            } else {
                /* This URL has not been previously loaded and is not present
                    * within our cache; we'll need to load this image.
                    */
                var img = new Image();
                img.onload = () => {
                    /* Once our image has properly loaded, add it to our cache
                        * so that we can simply return this image if the developer
                        * attempts to load this file in the future.
                        */
                    this.resourceCache[url] = img;

                    /* Once the image is actually loaded and properly cached,
                        * call all of the onReady() callbacks we have defined.
                        */
                    if(isReady()) {
                        this.readyCallbacks.forEach(function(func) { func(); });
                    }
                };

                /* Set the initial cache value to false, this will change when
                    * the image's onload event handler is called. Finally, point
                    * the image's src attribute to the passed in URL.
                    */
                this.resourceCache[url] = false;
                img.src = url;
            }
        }

        // public stuff
            /* This is the publicly accessible image loading function. It accepts
            * an array of strings pointing to image files or a string for a single
            * image. It will then call our private image loading function accordingly.
            */
        let load = (urlOrArr) => {
            if(urlOrArr instanceof Array) {
                /* If the developer passed in an array of images
                * loop through each value and call our image
                * loader on that image file
                */
                urlOrArr.forEach(function(url) {
                    _load(url);
                });
            } else {
                /* The developer did not pass an array to this function,
                * assume the value is a string and call our image loader
                * directly.
                */
                _load(urlOrArr);
            }
        }

        /* This is used by developers to grab references to images they know
        * have been previously loaded. If an image is cached, this functions
        * the same as calling load() on that URL.
        */
        let getResourceCached = (url) => {
            return this.resourceCache[url];
        }

        /* This function determines if all of the images that have been requested
        * for loading have in fact been properly loaded.
        */
        let isReady = () => {
            var ready = true;
            for(var k in this.resourceCache) {
                if(this.resourceCache.hasOwnProperty(k) &&
                !this.resourceCache[k]) {
                    ready = false;
                }
            }
            return ready;
        }

        /* This function will add a function to the callback stack that is called
        * when all requested images are properly loaded.
        */
        let onReady = (func) => {
            this.readyCallbacks.push(func);
        }

        this.onReady = onReady;
        this.isReady = isReady;
        this.getResourceCached = getResourceCached;
        this.load = load;
        // this.resourceCache = resourceCache;
        // this.readyCallbacks = readyCallbacks;
    }
}


/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */


// (function() {


//     /* This object defines the publicly accessible functions available to
//      * developers by creating a global Resources object.
//      */
//     window.Resources = {
//         load: load,
//         get: get,
//         onReady: onReady,
//         isReady: isReady
//     };
// })();
