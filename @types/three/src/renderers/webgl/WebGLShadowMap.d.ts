import { Camera } from '../../cameras/Camera';
import { ShadowMapType } from '../../constants';
import { Light } from '../../lights/Light';
import { Scene } from '../../scenes/Scene';
import { WebGLRenderer } from '../WebGLRenderer';
import { WebGLCapabilities } from './WebGLCapabilities';
import { WebGLObjects } from './WebGLObjects';

export class WebGLShadowMap {
    constructor(_renderer: WebGLRenderer, _objects: WebGLObjects, _capabilities: WebGLCapabilities);

    /**
     * @default false
     */
    enabled: boolean;

    /**
     * @default true
     */
    autoUpdate: boolean;

    /**
     * @default false
     */
    needsUpdate: boolean;

    /**
     * @default THREE.PCFShadowMap
     */
    type: ShadowMapType;

    render(shadowsArray: Light[], scene: Scene, camera: Camera): void;

    /**
     * @deprecated Use {@link Material#shadowSide} instead.
     */
    cullFace: any;
}
