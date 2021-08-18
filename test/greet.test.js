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
        it('Should return the name greated in isiZulu', function(){
            greetFunc.langON('isiZulu', caraName)
            assert.equal('Sao Bona, Cara', greetFunc.greetnames())
        })
        it('Should return the name greated in xiTsonga', function(){
            greetFunc.langON('xiTsonga', busiName)
            assert.equal('Avu sheni, Busi', greetFunc.greetnames())
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
        it('Should return the name greated in isiZulu', function(){
            greetFunc.langON('isiZulu', vascoName)

            assert.equal('Sao Bona, Vasco', greetFunc.greetnames())
        })
        it('Should return the name greated in xiTsonga', function(){
            greetFunc.langON('xiTsonga', vascoName)
            assert.equal('Avu sheni, Vasco', greetFunc.greetnames())
        });
    });
    
    describe('counter', function(){
    it('Should increment counter for each different name greeted', function () {
        var greetFunc = greetLangRadio()
        greetFunc.langON('Vasco','English');
        greetFunc.langON('Lucky','isiZulu');
        greetFunc.langON('Cara','xiTsonga');
       
        assert.equal(3,greetFunc.getCounter());
    });
  
    it('Should not increment counter if the name has been greeted even if you greet in different language', function () {
        var greetFunc = greetLangRadio()
        greetFunc.langON('Cara','English');
        greetFunc.langON('Cara','isiZulu');
        greetFunc.langON('Cara','xiTsonga');
        greetFunc.langON('Eddie','English');
        greetFunc.langON('Eddie','isiZulu');
        greetFunc.langON('Eddie','xiTsonga');
        greetFunc.langON('Lucky','English');
        greetFunc.langON('Lucky','isiZulu');
        greetFunc.langON('Lucky','xiTsonga');
        greetFunc.langON('Tebogo','English');
        greetFunc.langON('Tebogo','isiZulu');
        greetFunc.langON('Tebogo','xiTsonga');
       
        assert.equal(4,greetFunc.getCounter());
        });
    })

});