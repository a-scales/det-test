class VDOM {
    vDOM_Tree;
    root: vDOM_Node;
    levels: number;    
}

class vDOM_Node {
    guid: string;
    hash: string;
    id: string;
    classes: Array<string>;
    parent: vDOM_Node;
    children: Array<vDOM_Node>;
    componentReference; //TODO: Create Component Type
    
    constructor() {

    }
    /**
     * @returns {string} ID of the DOM object
     */
    getID(): string { return this.id; }
    /**
     * @returns {Array<string>} Classes of the DOM object
     */
    getClasses(): Array<string> { return this.classes; }
    /**
     * @returns {vDOM_Node} The parent of this vDOM node
     */
    getParent(): vDOM_Node { return this.parent; }
    /**
     * @returns {Array<vDOM_Node} The children of this vDOM node
     */
    getChildren(): Array<vDOM_Node> { return this.children; }

    /**
     * Sets the vDOM node ID
     * @param   {string} id The new id to use
     */
    setID(id: string): void { this.id = id; }
    /**
     * Sets all classes
     * @param   {Array<string>} classes The new classes to overwrite the existing
     */
    setClasses(classes: Array<string>): void { this.classes = classes; }
    /**
     * Sets the parent
     * @param   {vDOM_Node} node The new node to overwrite the parent
     */
    setParent(node: vDOM_Node): void { this.parent = node; }
    /**
     * Sets all children
     * @param   {Array<vDOM_Node>} nodes The new children to overwrite the existing
     */
    setChildren(nodes: Array<vDOM_Node>): void { this.children = nodes; }

    addClass(c: string): void { this.classes.push(c); }    
    addChild(c: vDOM_Node): void { this.children.push(c); }

    removeChild() {}
    removeAllChildren() {}
    removeParent() {}
    removeID() {}
    removeClass() {}
    removeAllClasses() {}

    render(){}
    forceUpdate(){}
    
    equals(){}
    
}