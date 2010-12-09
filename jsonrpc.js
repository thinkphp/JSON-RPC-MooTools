var JSONRPC = new Class({
 
    Implements: [Options, Events],
 
    options: {
        url: '/',
        methodname: null,
        params: null,
        method: 'post',
        encoding: 'urf-8',
        headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json, text/x-json, application/x-javascript'
        } 
    },
 
    initialize: function(options) {
        this.setOptions(options);
     return this;
    },

    send: function(opts) {
         var opts = opts || {},
             id = opts.id || String.uniqueID(), 
             params = {};

         var caller = new Request.JSON({
               url: this.options.url,
               method: this.options.method,
               encoding: this.options.encoding,
               headers: this.options.headers,
               onFailure: function(xhr) {
                   if(opts.onFailure && typeof(opts.onFailure) === 'function') {
                        opts.onFailure(xhr);
                   } else {
                        this.fireEvent('failure', xhr); 
                   }
               },
               onSuccess: function(response) {
                  if(response.id === id) {
                     if(response.error == null) {
                        if(opts.onSuccess && typeof(opts.onSuccess) === 'function') {
                                opts.onSuccess(response);  
                        } else {
                                this.fireEvent('success', response); 
                        } 
                     } else {
                        if(opts.onRemoteFailure && typeof(opts.onRemoteFailure) === 'function') {
                                opts.onRemoteFailure(response);  
                        } else {
                                this.fireEvent('remoteFailure', response); 
                        } 
                     }
                  } else {
                    if(opts.onIdMismatch && typeof(opts.onIdMismatch) === 'function') {
                           opts.onIdMismatch(response); 
                    } else {
                           this.fireEvent('idMismatch', response);   
                    }
                  }
               }.bind(this)
          }); 

          if(this.options.version === '1.1') {
            params.version = '1.1'; 
          } else if(this.options.version === '2.0') {
            params.jsonrpc = '2.0';
          } 

          params.method = opts.method || this.options.methodname;
          params.params = opts.params || this.options.params;
          params.id = id;

          caller.send(JSON.encode(params));
    }    
});