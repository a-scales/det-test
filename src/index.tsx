// alert("Hello!");
import {v4} from "uuid";
import {MD5} from "crypto-js";
import Fin from './t';
import E from './JSXEngine';
import { Node, vDOM } from './vDOM/V';
import ComponentBase from "./Components";

declare module JSX {
    interface ElementClass {
        render: any;      
        props: any;  
    }
    interface ElelentsAttributesProperty {
        props;
    }
    interface IntrinsicElements {

    }
    
}

interface ITemplate {
    new (): Template;
    render(): any;
}
class Template {
    ContentTemplate: any;
    constructor(e?:string) {
        this.ContentTemplate = <h1>FooBar</h1>
        if(e.length > 0) {
            this.ContentTemplate = <h1>{e}</h1>
        }
        return this;
    }
    render() {
        return(this.ContentTemplate)
    }
}


// TODO: Extension Component base that has a handle on constructing with child inner html for a custom component



interface IComponentTemplate {
    Props;
    // onInit();
    render();
    // onKill();
}
class ComponentTemplate implements IComponentTemplate {
    Props;
    constructor(props) {
        this.Props = props;
    }
    render() {

    }
    getClassName() {
        
    }
}

class TestComp extends ComponentBase{    
    constructor(props) {
        super(props);        
    }
    render() {
        return(<h2>{this.Props.test}</h2>)
    }
}
let menuItems = [{title:"one",link:"#"},{title:"two",link:"#"}];
let menu = menuItems.map(item => { return ( <li><a href={item.link}>{item.title}</a></li> )})


class App extends ComponentBase {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h1>Hello World!</h1>
                <h2>This is an example</h2>
                <TestComp test="Props!"></TestComp>
                <nav>{menu}</nav>
                <div>
                    <h3>let's go deeper</h3>
                    <ul>
                        <li>Get food</li>
                        <li>Pickup the dog</li>
                    </ul>
                </div>
            </div>
        )
    }
}




let v = new vDOM();
let aa = v.create(<App/>,document.getElementById("root"));
console.log(aa); // the root node;
console.log(v.nodeHash);


// console.log(E.vD.nodeArray);
// console.log(E.vD.vDOM_Tree);
// console.log(E.vD.vDOM_Tree[9]());
// document.body.appendChild(<Fin/>)


/*
process of construction-
Bind root app component to a root <div> on the page
Use a function that imports the main <app> component, and replaces the root <div>


*/
// 