declare module "wp" {

  export interface WPBlock {

  }

  export interface WPElement {
    createElement(type: string|Function, props?: Object, children?: string|WPElement|WPElement[]): WPElement;
  }

  export interface WPBlocks {
    registerBlockType(name: string, settings: object): WPBlock;
  }

  export interface WPEditor {
    RichText: any;
  }

  export interface WPComponents {
    Button: any;
    Modal: any;
    Autocomplete: any;
    Spinner: any;
    BaseControl: any;
    ServerSideRender: any;
    SelectControl: any;
    Placeholder: any;
  }

  export interface WPCompose {
    withState: any;
  }

  export interface WPI18n {
    __: any;
  }
  
  export interface wp {

    element: WPElement;
    blocks: WPBlocks;
    editor: WPEditor;
    components: WPComponents;
    compose: WPCompose;
    i18n: WPI18n,
    apiFetch: any;
  }

  
}