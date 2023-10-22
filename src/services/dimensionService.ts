

export class dimensionService
{
    setDimension(d:number):void{
        localStorage.setItem("board-dimension", d.toString())
    }
    getDimension() :number
    {
        let result = localStorage.getItem("board-dimension") || null
        if(result != null)
        {
            return parseInt(result)
        }
        return 0;
    }
}