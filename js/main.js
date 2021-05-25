document.getElementById("uncomment").addEventListener("click", removeComments);
var findNext = "";
document.querySelector('#copyCode').style.display="none";
function removeComments(){
    
    var lang = document.querySelector('#language').value;
    var code = document.querySelector('#code').value.trim();
    if (code==""){
        alert("Please Paste your Code below");
        return;
    }

    // var codeLines = code.split('\n');

    // for (var j = 0; j < codeLines.length; j++) {
    //     if (codeLines[j].trim()=="")
    //     {
    //         continue;
    //     }
    //     console.log('Line ' + j + ' is ' + codeLines[j]);
    //   }
    var myCode = code;
    if (lang=="cpp" || lang == "java")
    {
        myCode = uncommentLine(myCode.split('\n'), '/*', '*/');
        myCode = uncommentLine(myCode.split('\n'), '/*', '*/');
        myCode = uncommentLine(myCode.split('\n'), '//', '');
        myCode = uncommentLine(myCode.split('\n'), '//', '');
    }
    else if (lang=="python"){
        myCode = uncommentLine(myCode.split('\n'), '#', '');
        myCode = uncommentLine(myCode.split('\n'), '#', '');
    }
    else if (lang=="html")
    {
        myCode = uncommentLine(myCode.split('\n'), '<!--', '-->');
        myCode = uncommentLine(myCode.split('\n'), '<!--', '-->');
    }
    else if (lang=="css"){
        myCode = uncommentLine(myCode.split('\n'), '/*', '*/');
        myCode = uncommentLine(myCode.split('\n'), '/*', '*/');
    }
    else if (lang=="php"){
        myCode = uncommentLine(myCode.split('\n'), '#', '');
        myCode = uncommentLine(myCode.split('\n'), '#', '');
        myCode = uncommentLine(myCode.split('\n'), '/*', '*/');
        myCode = uncommentLine(myCode.split('\n'), '/*', '*/');
        myCode = uncommentLine(myCode.split('\n'), '//', '');
        myCode = uncommentLine(myCode.split('\n'), '//', '');
        
    }
    
    document.querySelector('#code').value = myCode;
    document.querySelector('#copyCode').style.display="unset";
    

}

function uncommentLine(codeLines, start, end){
    // code = code.trim();
    start = start.trim();
    end = end.trim();
    findNext = "";
    var singleQuotes = false;
    var doubleQuotes = false;
    var astQuotes = false;
    for (var j = 0; j < codeLines.length; j++) {
        if (codeLines[j].trim()=="")
        {
            continue;
        }
        if (findNext != ""){
            var n = codeLines[j].indexOf(findNext);
            if (n<0){
                codeLines[j] = "";
                continue;
            }
            codeLines[j] = codeLines[j].substr(n+findNext.length);
            findNext = "";

        }
        else{
            var n = codeLines[j].indexOf(start);
            if (n<0){
                continue;
            }
            
            var before = "";
            if (n>0){
                before = codeLines[j].substring(0, n);
            }
            if (char_count(before, "'")%2!=0){
                singleQuotes = !singleQuotes;
                if (char_count(codeLines[j].substring(n+1), "'")>0)
                {
                    singleQuotes = !singleQuotes;
                }
                codeLines[j] = codeLines[j].replace(start, '%commentRemover%%START_KEYWORD%');
                return uncommentLine(codeLines, start, end);
            }
            if (char_count(before, "`")%2!=0){
                astQuotes = !astQuotes;
                if (char_count(codeLines[j].substring(n+1), "`")>0)
                {
                    astQuotes = !astQuotes;
                }
                codeLines[j] = codeLines[j].replace(start, '%commentRemover%%START_KEYWORD%');
                return uncommentLine(codeLines, start, end);
            }
            if (char_count(before, '"')%2!=0){
                doubleQuotes = !doubleQuotes;
                if (char_count(codeLines[j].substring(n+1), '"')>0)
                {
                    doubleQuotes = !doubleQuotes;
                }
                codeLines[j] = codeLines[j].replace(start, '%commentRemover%%START_KEYWORD%');
                return uncommentLine(codeLines, start, end);
            }

            if (end != "")
            {
                findNext = end;
                var n2 = codeLines[j].indexOf(findNext);
                if (n2>=0){
                    var cmt = codeLines[j].substr(n);
                    var temp = cmt.substr(cmt.indexOf(end)+end.length);
                    cmt = cmt.replace(temp, '');
                    codeLines[j] = codeLines[j].replace(cmt, '');
                    findNext = "";

                }
                else{
                    codeLines[j] = codeLines[j].replace(codeLines[j].substr(n), '');
                }
            }
            else{
                codeLines[j] = codeLines[j].replace(codeLines[j].substr(n), '');
                findNext = "";
            }
            
        }
      }

      var myCode = "";
      for (var j = 0; j < codeLines.length; j++) {
        if (codeLines[j].trim()=="")
        continue;

        if (myCode != "")
        {
            myCode = myCode + "\n";
        }
        myCode = myCode + codeLines[j];
      }

    // return myCode;
    return myCode.replaceAll('%commentRemover%%START_KEYWORD%', start);
    

}

function char_count(str, letter) 
{
 var letter_Count = 0;
 for (var position = 0; position < str.length; position++) 
 {
    if (str.charAt(position) == letter) 
      {
          if (position>0)
          {
              if (str.charAt(position-1)=='\\')
              {
                continue;
              }
          }
      letter_Count += 1;
      }
  }
  return letter_Count;
}

document.getElementById("copyCode").addEventListener("click", copytoClipboard);

function copytoClipboard(){
    var code = document.querySelector('#code');
    if (code.value.trim()==""){
        alert("Nothing to copy!");
        return;
    }
    code.select();
  code.setSelectionRange(0, 9999999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Code Copied to Clipboard");

}