pragma solidity ^0.4.0;

contract BlockNapTEST {

    string public fecha;
    string public emisor;
    string public receptor;
    string public asunto;


    event logEvent(
        address indexed _from,
        string indexed typeM,
        string indexed value
    );

    /**
     * Constructor
     */
    function BlockNapTEST(string _fecha, string _emisor, string _receptor, string _asunto){
        fecha = _fecha;
        emisor = _emisor;
        receptor = _receptor;
        asunto = _asunto;
    }

    function getFecha() constant returns (string) {
        emit logEvent(msg.sender,"fecha",fecha);
        return fecha;
    }

    function getEmisor() constant returns (string) {
        emit logEvent(msg.sender,"emisor",emisor);
        return emisor;
    }

    function getReceptor() constant returns (string) {
        return receptor;
    }

    function getAsunto() constant returns (string) {
        return asunto;
    }

}
