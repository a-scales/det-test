import { Node, vDOM } from "./vDOM/V";
class E {

    vD: vDOM;
    constructor(){
        this.vD = new vDOM();        
        // this.vD.vDOM_Tree = [];        
    }

    /**
     * Rendering JSX/TSX elements into a useable tree. This is called where TSX/JSX elements are used.
     * @param tag Tag of the object, either text or a Component base
     * @param attrs Attributes on that TSX element
     * @param children Children within the TSX element tag
     */
    JSXrender(tag: any, attrs: any, ...children: any) { 
        children = [].concat.apply([],children);
        if(typeof tag === 'function') {
            let t = new tag(attrs)
            let r = t.render();            
            // tag = t.constructor.name;            
            children.push(r);
        } else {
            tag = document.createElement(tag);                
        }
        let ref = {tag:tag,attrs:attrs,children:children};
        // this.vD.addNode(ref);
        return {tag:tag,attrs:attrs,children:children}
    }

    /**
     * Takes the same parameters as JSX render, but just logs the children instead
     * @param tag 
     * @param attrs 
     * @param children 
     */
    JSXLog(tag, attrs, ...children) {
        // console.log(tag);
        children.forEach(child => {
            console.log("|-",child,typeof child);
        })
    }
}
export default new E;