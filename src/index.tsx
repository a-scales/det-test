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
// declare function OtherComponent(prop: {name: string});

// const E = new Engine();

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
// document.body.appendChild(

function MyComponent (): any {
    return <h3>Test!</h3>
}
// TODO: Extension Component base that has a handle on constructing with child inner html for a custom component
class OtherComponent implements JSX.ElementClass{
    props;
    constructor(props) {
        // super(props);
        console.log("props",props);
        this.props = props;
    }
    render(){
        return(<div><h4>{this.props.test}</h4></div>)
    }
}
// let FinalComp = new OtherComponent






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

class TestComp extends ComponentTemplate{    
    constructor(props) {
        super(props);        
    }
    render() {
        return(<h2>{this.Props.test}</h2>)
    }
}

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
                <div>
                    let's go deep
                    <ul>
                        <li>Get food</li>
                        <li>Pickup the dog</li>
                    </ul>
                </div>
            </div>
        )
    }
}


let menuItems = [{title:"one",link:"#"},{title:"two",link:"#"}];
let menu = menuItems.map(item => { return ( <li><a href={item.link}>{item.title}</a></li> )})
// console.log("MENU",menu);
let x = MD5("Test123")
// console.log(x.toString())
// document.body.appendChild(
let xxx = (<div>
    <div>What?</div>
    <h1 id="title">Hello</h1>
    <nav>  
        <ul>
            {menu}
        </ul>
    </nav>
    <section>
        <h2 test="123">Section</h2>        
        <TestComp test="ree"/>        
    </section>
</div>)
let v = new vDOM();
let x2 = (<div><h1>Test!</h1></div>)
// )
let root = E.vD.vDOM_Tree[E.vD.vDOM_Tree.length-1]; // the tree is initialized with the root node from the specific implementation of a tree
let r = new Node(xxx);
let r2 = new Node(x2);
let t = v.buildVDOM(r);
let t2 = v.buildVDOM(r2);
console.log("dt",t);
console.log("dt",t2);

console.log(xxx);
console.log(x2);

v.create(<App/>,document.getElementById("root"))
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