

interface IComponentBase {
    Props;
    // onInit();
    render();
    // onKill();
}

/**
 * Component Base for all DET comps
 */
class ComponentBase implements IComponentBase{
    Props: any;
    constructor(props) {
        this.Props = props;
    }
    render() {
        return;
    }
}

export default ComponentBase