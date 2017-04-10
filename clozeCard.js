function closeCard(text, cloze) {
    this.full = text;
    this.cloze = cloze;
    this.partial = makePartial(text, cloze);
}

function makePartial(text,cloze){
    if(text.includes(cloze)){
        return text.replace(cloze,"....");
    }else{
        console.log("Please check again");
    }
}


module.exports = closeCard;