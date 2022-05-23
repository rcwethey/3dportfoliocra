import { useEffect, useRef} from "react";
import * as THREE from "three";
import { LoopRepeat } from "three";
import { CubeTextureLoader } from "three.js";

function App() {
  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    mountRef.current.appendChild( renderer.domElement );
    
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xff9900 } );
    var cube = new THREE.Mesh( geometry, cubeMaterial );

    var plane = new THREE.PlaneBufferGeometry(10, 10);
    var planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var floor = new THREE.Mesh(plane, planeMaterial);
    //floor.rotateX(45);
    //floor.translateY(-7);
    //floor.translateZ(2);

    const ambientLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    //ambientLight.castShadow = true;
    ambientLight.position.set(-1, 2, 6);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set( 100, 1000, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    //spotLight.shadow.camera.near = 500;
    //spotLight.shadow.camera.far = 4000;
    //spotLight.shadow.camera.fov = 30;
    scene.add(ambientLight);
    scene.add(cube);
    camera.position.z = 5;
    
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      //cube.rotation.z += 0.01;
      renderer.render( scene, camera );
    };

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);
    
    animate();

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);


  return (
    <div ref={mountRef}>
    </div>
  );
}

export default App;
