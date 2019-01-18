import Node from "./Node";
import ComponentBase from "../Components";
class VDOM {
    vDOM_Tree: Array<any> = [];
    nodeArray: Array<Node> = [];
    root: any;
    rootNode: Node;
    levels: number;    
    constructor() {
        
    }
    
    /**
     * Creates the base for the elements
     * @param RootComponent Root FW Component
     * @param RootDiv Root <div> element to bind to
     */
    create(RootComponent: ComponentBase, RootDiv: HTMLElement) {
        let RootNode = new Node(RootComponent);
        let vDOM = this.buildVDOM(RootNode);        
        this.renderVDOM(RootDiv, RootNode);
        return vDOM;
    }
    /**
     * renders a given node by adding it to the DOM
     * @param RootDiv Current root to append elements to
     * @param RootNode Current node for which children will be iterated on
     */
    renderVDOM(RootDiv: HTMLElement, RootNode: Node) {
        console.log(RootDiv, typeof RootDiv === "function");
        RootNode.childNodes.forEach(child => {        
            // console.log(child)            
            // let e = typeof child.componentReference.tag === "object" ? child.componentReference.tag : document.createElement(child.componentReference.tag);]
            if( typeof child.componentReference === "string") {
                RootDiv.innerHTML = child.componentReference;
            } else {
                // console.log(child.componentReference);
                var r;
                if(typeof child.componentReference.tag === "function") {
                    let t = new child.componentReference.tag(child.componentReference.attrs);
                    r = t.render();
                    child.componentOf = t;
                    console.log(r, RootDiv);
                    RootDiv.appendChild(r.tag); 
                } else {
                    RootDiv.appendChild(child.componentReference.tag);  
                }                
                if(r) {
                    this.renderVDOM(r.tag, child);
                } else {
                    this.renderVDOM(child.componentReference.tag, child)
                }
            }
                  
        })        
    }

    /**
     * Adds an element to the vDOM tree
     * @param n Node to add to the tree
     */
    addNode(n): void {
        this.vDOM_Tree.push(n);
        this.root = this.vDOM_Tree[this.vDOM_Tree.length - 1];
    }

    /**
     * Builds the vDOM tree off a root node. 
     * @param root Root node to build the tree from
     * @returns {Node} Root node of the tree
     */
    buildVDOM(root: Node): Node {
        if(root.componentReference.children) {
            root.componentReference.children.forEach( child => {
                let cN = new Node(child);
                // set parents here
                cN.setParent(root);                
                this.buildVDOM(cN);
                root.addChildNode(cN);
                this.nodeArray.push(cN);
                // console.log(child);
            })
        }
        this.rootNode = root;  
        return root;
    }

    // need to implement modification methods here too. 
    // need to pass reference to this object as paramerter to all Nodes too.
    // should be a vDOM field on the Node object, to access it as it exits.
}

export default VDOM;