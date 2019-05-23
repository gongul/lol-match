export default class Container{
    private static container:Container;

    private constructor() {}

    public static getInstance(){
        if ( this.container == null || this.container == undefined)
            this.container = new Container();

		return this.container;
    };
}