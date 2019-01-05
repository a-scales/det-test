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
class ComponentTemplate {
    Props;
    constructor(props) {
        this.Props = props;
    }
    render() {

    }
}

class TestComp extends ComponentTemplate {    
    constructor(props) {
        super(props);        
    }
    render() {
        return(<h2>{this.Props.test}</h2>)
    }
}


let menuItems = [{title:"one",link:"#"},{title:"two",link:"#"}];
let menu = menuItems.map(item => { return ( <li><a href={item.link}>{item.title}</a></li> )})
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
        <TestComp test="ree"/>
                        
    </section>
</div>)

// document.body.appendChild(<Fin/>)