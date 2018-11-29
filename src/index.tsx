// alert("Hello!");

import Fin from './t';
import E from './JSXEngine';
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
        return(<h4>{this.props.test}</h4>)
    }
}
// let FinalComp = new OtherComponent

let menuItems = ["one","two","three","Covenant is Gay"];
let menu = menuItems.map(item => { return ( <li><a href="#">{item}</a></li> )})
console.log("MENU",menu);
document.body.appendChild(
<div>
    <h1 id="title">Hello</h1>
    <nav>  
        <ul>
            {menu}
        </ul>
    </nav>
    <section>
        <h2 test="123">Section</h2>        
            <OtherComponent test="bar">123</OtherComponent>            
    </section>
</div>)

// document.body.appendChild(<Fin/>)