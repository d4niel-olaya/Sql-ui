

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

    setMainDimension(d:number):void
    {
        localStorage.setItem("main-dimension", d.toString())
    }

    getMainDimension() : number
    {
        let result = localStorage.getItem("main-dimension") || null
        if(result != null)
        {
            return parseInt(result)
        }
        return 0;
    }

    setToggleDimension(d:number):void{
        localStorage.setItem("toggle-dimension", d.toString())
    }
    getToggleDimension() :number
    {
        let result = localStorage.getItem("toggle-dimension") || null
        if(result != null)
        {
            return parseInt(result)
        }
        return 0;
    }
}