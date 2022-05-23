import * as THREE from "three";

export default function cube(){
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xff9900 } );
    var cube = new THREE.Mesh( geometry, cubeMaterial );

    return cube;
}