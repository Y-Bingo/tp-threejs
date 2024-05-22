import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    Clock,
    Color,
    DirectionalLight,
    DirectionalLightHelper,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Scene,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log('Hello World!');

// 场景
const scene = new Scene(); // 创建一个场景
scene.background = new Color(0x000000); // 设置场景的背景颜色
const geometry = new BoxGeometry(200, 100, 100); // 创建一个立方体
const material = new MeshLambertMaterial({
	// 创建一个材质
	color: 0x00ff00, // 绿色
	// opacity: 0.5,
	// transparent: true,
});
const mesh = new Mesh(geometry, material); // 创建一个网格
mesh.position.set(0, 0, 0); // 设置网格的位置
scene.add(mesh); // 将网格添加到场景中

// 辅助坐标轴
const axesHelper = new AxesHelper(200); // 创建一个坐标轴
scene.add(axesHelper); // 将坐标轴添加到场景中

// 光源
const ambientLight = new AmbientLight(0xffffff, 0.4); // 创建一个环境光源
scene.add(ambientLight); // 将环境光源添加到场景中

const pointLight = new PointLight(0xffffff, 1.0); // 创建一个点光源
pointLight.decay = 0; // 光线衰减， 0 = 不衰减
pointLight.position.set(200, 200, 200); // 设置光源的位置
// pointLight.lookAt(0, 0, 0); // 设置光源的方向
scene.add(pointLight); // 将光源添加到场景中

const directionalLight = new DirectionalLight(0xffffff, 1.0); // 创建一个平行光源
directionalLight.position.set(100, 100, -100); // 设置平行光源的位置
scene.add(directionalLight); // 将平行光源添加到场景中

const pointHelper = new PointLightHelper(pointLight, 10);
scene.add(pointHelper);

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 10);
scene.add(directionalLightHelper);

const width = 800;
const height = 500;

// 相机
const camera = new PerspectiveCamera(45, width / height, 0.1, 3000); // 透视相机
camera.position.set(400, 400, 400); // 相机位置
camera.lookAt(0, 0, 0); // 相机看向的位置

const renderer = new WebGLRenderer(); // 创建一个渲染器
renderer.setSize(width, height);

const clock = new Clock();  
function render() {
	const spt = clock.getDelta() * 1000; // 每秒的毫秒数
	renderer.render(scene, camera); // 渲染场景
	mesh.rotateY(0.01);
	requestAnimationFrame(render); // 请求再次渲染
}
render();

document.body.appendChild(renderer.domElement); // 将渲染器的画布添加到 body 中

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
