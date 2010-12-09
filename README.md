JSON-RPC plugin for MooTools
-----------------------------

JSON-RPC is a lightweight remote procedure call protocol similar to XML-RPC. It's designedto be simple!
The general mechanism consists of two peers establishing a data connection. During the lifetime of a connection, peers invoke methods provided by the othe peer. To invoke a remote method, o request is sent.

This plugin implements the ``JSONRPC`` class with a ``send`` function can be used for performing [JSON-RPC](http://json-rpc.org/) calls.

JSON-RPC Specifications: [http://json-rpc.org/wiki/specification](http://json-rpc.org/wiki/specification)


## How to Use:
 
The JSON-RPC setup has two parts: configuration and call.

   var myClientRPC = new JSONRPC({
       url: 'http://localhost/jsonrpcphp/server.php',
       methodname: 'bubblesort',
       onSuccess: function(resp) {
               console.log(resp.result);
       }   
   });

The above code creates a client JSON-RPC object, that is bound to remote ``bubblesort`` method. This binding allows us to call the remote method passing only parameters and callback, without repeating the method multiple times:

   myClientRPC.send({params: [9,8,7,6,5,4,3,2,1], 
                     onSuccess: function(resp){
                            if(window.console) {console.log(resp.result);}
                     }
   }); 

### Options:

Options for JSON-RPC configuration are as follows:

* ``url``: __String__ The URL of the JSON-RPC service. Defaults to ``/``.
* ``methodname``: __String__ The name of the remote method. Defaults to ``null``. This option is not required, it can be specified later using ``send`` method.
* ``params``: __Array__ or __Object__ Either a vector of parameters, or an object containing the parameters that will be passed to the remote method. This options is optional (not mandatory).
* ``encoding``: __String__ Encoding scheme. It is passed through to ``Request.JSON``. 
* ``headers``: __String__ Request headers. Passed through to ``Request.JSON``.

### Events:

* ``success``: __Function__ this event is fired when the JSON-RPC call is finished, and the ID is returned from the server matches the one used in the request.
* ``failure``: __Function__ this event is fired when the HTTP request fails. This event does not signify that the actual RPC call failed. For the RPC failure use the ``idMismatch`` and ``remoteFailure``.
* ``remoteFailure``: __Function__ this event is fired when the remote method raises an exception. Only the ``error`` key of the complete response  is returned.
* ``idMismatch``: __Function__ this event is fired when the JSON-RPC ID returned by the server does not match the one sent by client JSONRPC call. Thus, the complete ``response`` object is passed to the callback function, it would probably by unwise to treat it as safe.


### Sending requests:

You send JSON-RPC requests using ``send`` method. This function takes a single object as argument. If any of the object properties matches the one specified in the configuration, it will override the 
configuration. The object can have the following properties:

* ``method``: __String__ the remote method name.
* ``params``: __Array__ or __Object__ parameters to pass to remote method.
* ``id``: The JSON_RPC id.
* ``onSuccess``: __Function__ this event is fired when the JSON-RPC call is finished, and the ID is returned from the server matches the one used in the request.
* ``onFailure``: __Function__ this event is fired when the HTTP request fails. This event does not signify that the actual RPC call failed. For the RPC failure use the ``idMismatch`` and ``remoteFailure``.
* ``onRemoteFailure``: __Function__ this event is fired when the remote method raises an exception. Only the ``error`` key of the complete response  is returned.
* ``onIdMismatch``: __Function__ this event is fired when the JSON-RPC ID returned by the server does not match the one sent by client JSONRPC call. Thus, the complete ``response`` object is passed to the callback function, it would probably by unwise to treat it as safe.
Note that specifying callback functions when calling ``send`` will not only override the configured callbacks, but also prevent the events from being fired, as anything listening to the events will not be able to catch them.
