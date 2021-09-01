module.exports = function(){
    let objName = {};
    let errorMsg  = "";
    let counter = 0;
    let messages = "";

    const RegExp = /^[A-Za-z]+$/;

    var greeting = function(names, language){
        let StrName = ""
        let ArrName = names.trim()

        if (ArrName !== ""){
            if(ArrName.match(RegExp)){
                StrName = ArrName.charAt(0).toUpperCase() + ArrName.slice(1).toLowerCase();

                if( language === "english" || language === "isiZulu" || language === "xiTsonga"){
                    if(language === "english"){
                        messages = "Hello, " + StrName;
                    }
                    else if(language === "isiZulu"){
                        messages = "Sawubona, " + StrName;
                    }
                    else if(language === "xiTsonga"){
                        messages = "Avuxeni, " + StrName;
                    }
                    errorMsg = "You have enterd you name correct";

                    if(objName[StrName]){
                        objName[StrName] = 1;
                        counter++;
                    }
                    else{
                        objName[StrName]++;
                    }
                }
            }
        }
        if(StrName === "" && language === undefined){
            messages = "";
        }
        else if (StrName === "" && language !== undefined){
            messages = "";
        }
        else if (StrName !== "" && language === undefined){
            messages = "";
        }
    }
    var getMsg = function(){
        return messages;
    }
    var greetedNames = function(){
        return objName;
    }
    var allErrors = function(){
        if (errorMsg === "error"){
            return "error"
        }
        else{
            return "You have enterd you name correct"
        }
    }
    var getCounter = function(){
        return Object.keys(objName).length;
    }
    return{
        greeting,
        getMsg,
        getCounter,
        greetedNames,
        allErrors
    }
}