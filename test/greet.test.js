const assert = require('assert');
const greetLangRadio = require("../greet")

describe('Greet with factory function' , function(){


    describe('Returning all the names', function(){
        var greetFunc = greetLangRadio()
        var tebogoName = "Tebogo" 
        var caraName = "Cara"
        var busiName = "Busi"
        it('Should return the name greeted in english', function(){
            greetFunc.langON('english', tebogoName)
            assert.equal('Hello, Tebogo', greetFunc.greetnames())
        })
        it('Should return the name greated in sesotho and add', function(){
            greetFunc.langON('sesotho', caraName)
            assert.equal('Dumela, Cara', greetFunc.greetnames())
        })
        it('Should return the name greated in Isixhosa and add', function(){
            greetFunc.langON('isixhosa', busiName)
            assert.equal('Molweni, Busi', greetFunc.greetnames())
        });
    });

    describe('In case of non selected language or and empty string for the name', function(){
        var greetFunc = greetLangRadio()
        var caraName = "Cara" 
        it('Should return "Please type in a name" if the string is empy for name', function(){
          greetFunc.checkErrors('', 'english')
          assert.equal('Please type in a name', greetFunc.checkErrors('', 'english') )
        })

        it('Should return "Please Select a Language" if the radio has not been selected', function(){
            var name = greetFunc.langON('english', caraName)
            var returnedMsg =  greetFunc.checkErrors(name, '')
            assert.equal('Please Select a Language', returnedMsg )
          })
    })
    describe('function uppercases the first charater' , function(){
        var eddieName = "Eddie"
        var vascoName = "Vasco" 
        it('should change the first letter to upperCase', function(){
            var greetFunc = greetLangRadio();
            assert.equal(vascoName, greetFunc.capFirstLetter(vascoName));
            
        });
        it('should change the uppercase to lower can when you write name', function(){
            var greetFunc = greetLangRadio();
            assert.equal(eddieName, greetFunc.capFirstLetter(eddieName));
            
        });
    });

    describe('Differnt languages and name', function(){
        var greetFunc = greetLangRadio()
        var vascoName = "Vasco" 
        it('Should return the name greated in Engilish', function(){
            greetFunc.langON('english', vascoName)
            assert.equal('Hello, Vasco', greetFunc.greetnames())
        })
        it('Should return the name greated in Sesotho', function(){
            greetFunc.langON('sesotho', vascoName)

            assert.equal('Dumela, Vasco', greetFunc.greetnames())
        })
        it('Should return the name greated in Isixhosa', function(){
            greetFunc.langON('isixhosa', vascoName)
            assert.equal('Molweni, Vasco', greetFunc.greetnames())
        });
    });
    
    describe('counter for name', function(){
    it('Should increment counter for each different name greeted', function () {
        var greetFunc = greetLangRadio()
        greetFunc.langON('Vasco','English');
        greetFunc.langON('Lucky','Sesotho');
        greetFunc.langON('Cara','Isixhosa');
       
        assert.equal(3,greetFunc.getCounter());
    });
  
    it('Should not increment counter if the name has been greeted even if you greet in different language', function () {
        var greetFunc = greetLangRadio()
        greetFunc.langON('Cara','English');
        greetFunc.langON('Cara','Sesotho');
        greetFunc.langON('Cara','Isixhosa');
        greetFunc.langON('Eddie','English');
        greetFunc.langON('Eddie','Sesotho');
        greetFunc.langON('Eddie','Isixhosa');
        greetFunc.langON('Lucky','English');
        greetFunc.langON('Lucky','Sesotho');
        greetFunc.langON('Lucky','Isixhosa');
        greetFunc.langON('Tebogo','English');
        greetFunc.langON('Tebogo','Sesotho');
        greetFunc.langON('Tebogo','Isixhosa');
       
        assert.equal(4,greetFunc.getCounter());
        });
    })

});