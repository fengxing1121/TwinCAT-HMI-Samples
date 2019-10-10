// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();

    });
})(TcHmi);

if (WEBGL.isWebGLAvailable() === false) {

    document.body.appendChild(WEBGL.getWebGLErrorMessage());

}

var container, stats;

var camera, cameraTarget, scene, renderer;


function External3dLibinit() {

    container = document.createElement('div');
    //document.body.appendChild(container);
    var dHost = document.getElementById("3dContainer").children[0];
    dHost.appendChild(container);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
    camera.position.set(3, 0.15, 3);

    cameraTarget = new THREE.Vector3(0, -0.25, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x72645b);
    scene.fog = new THREE.Fog(0x72645b, 2, 15);


    // Ground

    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(40, 40),
        new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    scene.add(plane);

    plane.receiveShadow = true;


    // ASCII file

    var loader = new THREE.STLLoader();
    loader.load('./Examples/External3dLib/models/stl/ascii/slotted_disk.stl', function (geometry) {

        var material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, -0.25, 0.6);
        mesh.rotation.set(0, -Math.PI / 2, 0);
        mesh.scale.set(0.5, 0.5, 0.5);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });


    // Binary files

    var material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x111111, shininess: 200 });

    loader.load('./Examples/External3dLib/models/stl/binary/pr2_head_pan.stl', function (geometry) {

        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, -0.37, -0.6);
        mesh.rotation.set(-Math.PI / 2, 0, 0);
        mesh.scale.set(2, 2, 2);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });

    loader.load('./Examples/External3dLib/models/stl/binary/pr2_head_tilt.stl', function (geometry) {

        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0.136, -0.37, -0.6);
        mesh.rotation.set(-Math.PI / 2, 0.3, 0);
        mesh.scale.set(2, 2, 2);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });

    // Colored binary STL
    loader.load('./Examples/External3dLib/models/stl/binary/colored.stl', function (geometry) {

        var meshMaterial = material;
        if (geometry.hasColors) {

            meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });

        }

        var mesh = new THREE.Mesh(geometry, meshMaterial);

        mesh.position.set(0.5, 0.2, 0);
        mesh.rotation.set(-Math.PI / 2, Math.PI / 2, 0);
        mesh.scale.set(0.3, 0.3, 0.3);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });


    // Lights

    scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

    addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function addShadowedLight(x, y, z, color, intensity) {

    var directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);

    directionalLight.castShadow = true;

    var d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.bias = -0.002;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function External3dLibanimate() {

    requestAnimationFrame(External3dLibanimate);

    External3dLibrender();
    stats.update();

}

function External3dLibrender() {

    var timer = Date.now() * 0.0005;

    camera.position.x = Math.cos(timer) * 3;
    camera.position.z = Math.sin(timer) * 3;

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);

}
