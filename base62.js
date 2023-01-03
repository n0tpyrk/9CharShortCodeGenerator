// Customised base62 encoding function
function base62Encode(inputInt){
  // Check input
  if(isNaN(inputInt)){
    console.log("Input Error!");
    return null;
  }
  inputInt = parseInt(inputInt);
  var base = 62;
  var base62 = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var result = "";
  var quotient = -1;
  quotient = Math.floor(inputInt / base);

  // Generate base62 string
  while(quotient != 0){
    quotient = Math.floor(inputInt / base);
    var remainder = inputInt % base;
    result = base62[remainder] + result;
    inputInt = quotient;
  }
  return result;
}


// Customised base62 decoding function
function base62Decode(inputStr){
  var base = 62;
  var base62 = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"A":10,"B":11,"C":12,"D":13,"E":14,"F":15,"G":16,"H":17,"I":18,"J":19,"K":20,"L":21,"M":22,"N":23,"O":24,"P":25,"Q":26,"R":27,"S":28,"T":29,"U":30,"V":31,"W":32,"X":33,"Y":34,"Z":35,"a":36,"b":37,"c":38,"d":39,"e":40,"f":41,"g":42,"h":43,"i":44,"j":45,"k":46,"l":47,"m":48,"n":49,"o":50,"p":51,"q":52,"r":53,"s":54,"t":55,"u":56,"v":57,"w":58,"x":59,"y":60,"z":61};
  var result = 0;
  
  // Calculate the original int value
  for(var i = 0; i < inputStr.length ; i++){
    result = base62[inputStr[i]] * (base ** (8-i)) + result;
  }
  
  return result;
}


// Use branch ID, release ID, and today's date to generate and return a short code.
function generateShortCode(branchId, releaseId) {
    var shopDate = new Date();
    var strShopYear = shopDate.getFullYear();
    var strShopMonth = shopDate.getMonth()+1;
    if(strShopMonth < 10){
      strShopMonth = "0" + strShopMonth;
    }
    
    var strShopDate = shopDate.getDate();
    if(strShopDate < 10){
      strShopDate = "0" + strShopDate;
    }
    
    var dateInfo = "" + strShopYear + strShopMonth + strShopDate;
    
    // Format store ID
    var branchIdLength = branchId.toString().length;
    for(var i = branchIdLength;  i < 3; i++){
      branchId = "0" + branchId;
    }
  
    // Format transaction ID
    var releaseIdLength = releaseId.toString().length;
    for(var i = releaseIdLength;  i < 5; i++){
      releaseId = "0" + releaseId;
    }
    
    // Generate the short code with the base62 function
    var longCode = "" + dateInfo + branchId + releaseId;
    var shortCode = base62Encode(longCode);
    // console.log(longCode, shortCode);
    return shortCode;
}


// Decode a short code and return the info in the promo code
function decodeShortCode(shortCode) {
    var longCode = "" + base62Decode(shortCode);
    
    // Extract data from the long code
    var branchId = parseInt(longCode.substr(8,3));
    var releaseId = parseInt(longCode.substr(11));
    var shopDateStr = longCode.substr(0,4)+"/"+longCode.substr(4,2)+"/"+longCode.substr(6,2);

    return {
        branchId: branchId, 
        shopDate: new Date(shopDateStr), 
        releaseId: releaseId, 
    };
}



// Test
var branchId = 123;
var releaseId = 9876;
var shortCode = generateShortCode(branchId, releaseId);
var decodeResult = decodeShortCode(shortCode);
console.log("Short Code:\n", shortCode);
console.log("Decode:\n", decodeResult);