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
    }

    renderVDOM(RootDiv: HTMLElement, RootNode: Node) {
        RootNode.childNodes.forEach(child => {        
            console.log(child)    
            // let e = typeof child.componentReference.tag === "object" ? child.componentReference.tag : document.createElement(child.componentReference.tag);]
            if( typeof child.componentReference === "string") {
                RootDiv.innerHTML = child.componentReference;
            } else {
                console.log(child.componentReference);
                RootDiv.appendChild(child.componentReference.tag);  
                this.renderVDOM(child.componentReference.tag, child)
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
                this.buildVDOM(cN);
                root.addChildNode(cN);
                this.nodeArray.push(cN);
                // console.log(child);
            })
        }
        this.rootNode = root;  
        return root;
    }

}

export default VDOM;