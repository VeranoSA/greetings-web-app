module.exports = function greetLangRadio() {
    // creating varibale
        var LanguageMsg = '';
        var names = '';
        var counter = 0;
        var local = {};


    // function that will pass the name with greetings
        function langON(languages, str) {
            if (local[languages] === undefined) {
                local[languages] = 0;
                counter++
            
            } 
            //If the name is there just increment the value
            else{
                local[languages]++;
            }

            if (languages == 'english'){
                LanguageMsg = 'Hello, ' 
            } if (languages == 'sesotho'){
                LanguageMsg = 'Dumela, '
            } if (languages == 'isixhosa'){
                LanguageMsg = 'Molweni, '
            }
            
            names = str;   
        }

        /**
         *This method/function does the error handling in case of non slected language or and empty string for the name 
         *@param {*} 
         */

        function checkErrors(name,language) {
            if (name == ''){
                return 'Please type in a name';
            } 
            if (language == '' || language == undefined){
                return 'Please Select a Language';
            }
        }
       
        /**
         * This method/function uppercases the first charater of the string and lowercases the rest of the charaters
         * @param {*} str 
         */
        
        function capFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        function greetnames(){
            return LanguageMsg + names
        }
        function getlocal(){
        return local
        }
        function getCounter(){
        return counter
        }
        function setlocal(AllNames){
        local = AllNames
        }

        return {
            greetnames,
            langON,
            checkErrors,
            capFirstLetter,
            getCounter,  
            getlocal,
            setlocal 
        }
    }