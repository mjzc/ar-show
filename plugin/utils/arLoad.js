import gLTF from './GLTFLoader'
import {
  OrbitControls
} from './OrbitControls'

export default async function(canvas, THREE, arData) {
  var scene,
    camera,
    renderer,
    loader,
    wid,
    hei,
    animate,
    controls,
    pixelRatio;
  var data = JSON.parse(arData.data)

  animate = function() {
    controls.update();
    renderer.render(scene, camera);
    canvas.requestAnimationFrame(animate);
    wx.hideLoading()
  };

  scene = new THREE.Scene();

  const info = wx.getSystemInfoSync();
  wid = info.screenWidth
  hei = info.screenHeight
  pixelRatio = info.pixelRatio

  camera = new THREE.PerspectiveCamera(45, wid / hei, 1, 1000);
  camera.position.set(0, 0, 20);
  camera.lookAt(new THREE.Vector3(-1, -1, -1));

  controls = new OrbitControls(camera, canvas);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(wid, hei);
  renderer.setPixelRatio(pixelRatio)

  loader = new THREE.ObjectLoader();

  loader.load('https://ar-portal.gree.com/' + data.content.group + '/' + data.content.filename, function(_sce) {
    scene = _sce;
    scene.add(camera);
    animate();
  });

}