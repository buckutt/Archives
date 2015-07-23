

function verif_vide(txtarea)
{
	if(txtarea.value.length < 1)  {
		alert("Un des champs obligatoire est vide !");
		return false;
	}
    else 
		return true;
}

function open_smileys(zone) {
	var zone = zone;
      fenetre = window.open("smileys.php?txtarea=" + zone, "smileys", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=300,height=400");
}


//fonction qui permet de metre en gras citer ... pour l envoi dun message sur le forum !( récupéré sur un autre site )
function Boutons(tagOpen, tagClose, sampleText , txtarea ) {
	//var txtarea = legender.legende;
var clientPC = navigator.userAgent.toLowerCase(); // Get client info
var is_gecko = ((clientPC.indexOf("gecko")!=-1) && (clientPC.indexOf("spoofer")==-1)
	&& (clientPC.indexOf("khtml") == -1) && (clientPC.indexOf("netscape/7.0")==-1));
var is_safari = ((clientPC.indexOf("AppleWebKit")!=-1) && (clientPC.indexOf("spoofer")==-1));
var is_khtml = (navigator.vendor == "KDE" || ( document.childNodes && !document.all && !navigator.taintEnabled ));
if (clientPC.indexOf("opera")!=-1) {
	var is_opera = true;
	var is_opera_preseven = (window.opera && !document.childNodes);
	var is_opera_seven = (window.opera && document.childNodes);
}

	// IE
	if(document.selection  && !is_gecko) {
		var theSelection = document.selection.createRange().text;
		if(!theSelection) { theSelection=sampleText;}
		txtarea.focus();
		if(theSelection.charAt(theSelection.length - 1) == " "){// exclude ending space char, if any
			theSelection = theSelection.substring(0, theSelection.length - 1);
			document.selection.createRange().text = tagOpen + theSelection + tagClose + " ";
		} else {
			document.selection.createRange().text = tagOpen + theSelection + tagClose;
		}
	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		var scrollTop=txtarea.scrollTop;
		var myText = (txtarea.value).substring(startPos, endPos);
		if(!myText) { myText=sampleText;}
		if(myText.charAt(myText.length - 1) == " "){ // exclude ending space char, if any
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
		} else {
			subst = tagOpen + myText + tagClose;
		}
		txtarea.value = txtarea.value.substring(0, startPos) + subst +
		txtarea.value.substring(endPos, txtarea.value.length);
		txtarea.focus()//fonction qui permet de metre ();
		var cPos=startPos+(tagOpen.length+myText.length+tagClose.length);
		txtarea.selectionStart=cPos;
		txtarea.selectionEnd=cPos;
		txtarea.scrollTop=scrollTop;
	// All others
	} else {
		// can t insert inside, so insert at end ...
		txtarea.value += tagOpen + sampleText + tagClose ;
	}
	// reposition cursor if possible
	if (txtarea.createTextRange) txtarea.caretPos = document.selection.createRange().duplicate();
}

