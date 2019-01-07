import vDOM_Node from "./Node";
class VDOM {
    vDOM_Tree: Array<any> = [];
    root: vDOM_Node;
    levels: number;    
    constructor() {
        
    }
    addNode(n) {
        this.vDOM_Tree.push(n);
        this.root = this.vDOM_Tree[this.vDOM_Tree.length - 1];
    }
}

export default VDOM;