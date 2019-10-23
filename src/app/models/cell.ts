export class Cell{
    content:string;
    color:string;
    column:number = -1;
    row:number = -1;
    
    constructor(){

        this.content = "";
        this.color = "black";
        
    }
}