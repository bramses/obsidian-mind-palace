// Get the canvas DOM element
var canvas = document.getElementById("renderCanvas");
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});


var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  // keyboard input
  camera.keysLeft = [65, 37];
  camera.keysRight = [68, 39];
  camera.keysUp = [87, 38];
  camera.keysDown = [83, 40];

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 1.1;

  // Our built-in 'ground' shape.
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 120, height: 120 },
    scene
  );

  

  // front wall
  const frontWall = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { width: 120, height: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  frontWall.rotation.y = Math.PI / 2;
  frontWall.position.x = 60;

  var size = frontWall.getBoundingInfo().boundingBox.extendSize;
	console.log(size);

  // back wall
  const backWall = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { width: 120, height: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  backWall.rotation.y = 3 * Math.PI / 2;
  backWall.position.x = -60;

  // left wall
  const leftWall = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { width: 120, height: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  // leftWall.rotation.y = Math.PI / 2;
  leftWall.position.z = 60;

  // right wall
  const rightWall = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { width: 120, height: 60, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  rightWall.position.z = -60;
  rightWall.rotation.y = Math.PI;

  // collision
  //Set gravity for the scene (G force like, on Y-axis)
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

  // Enable Collisions
  scene.collisionsEnabled = true;

  //Then apply collisions and gravity to the active camera
  camera.checkCollisions = true;
  camera.applyGravity = true;

  //Set the ellipsoid around the camera (e.g. your player's size)
  camera.ellipsoid = new BABYLON.Vector3(1, 2.5, 1);
  // camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);

  //finally, say which mesh will be collisionable
  ground.checkCollisions = true;
  leftWall.checkCollisions = true;
  frontWall.checkCollisions = true;
  rightWall.checkCollisions = true;
  backWall.checkCollisions = true;

  var marbleMaterial = new BABYLON.StandardMaterial("torus", scene);
  var marbleTexture = new BABYLON.MarbleProceduralTexture(
    "marble",
    1024,
    scene
  );
  marbleTexture.numberOfTilesHeight = 3;
  marbleTexture.numberOfTilesWidth = 3;
  marbleMaterial.ambientTexture = marbleTexture;
  ground.material = marbleMaterial;

  var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
  myMaterial.diffuseColor = new BABYLON.Color3(188 / 255, 186 / 255, 194 / 255); // #bcbac2
  myMaterial.specularColor = new BABYLON.Color3(
    188 / 255,
    186 / 255,
    194 / 255
  );
  myMaterial.emissiveColor = new BABYLON.Color3(0.25, 0.25, 0.25);
  myMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);
  leftWall.material = myMaterial;


  // sky
  var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);

  const animWheel = new BABYLON.Animation("skyAnimation", "rotation.y", 0.05, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

  const wheelKeys = []; 

  //At the animation key 0, the value of rotation.y is 0
  wheelKeys.push({
      frame: 0,
      value: 0
  });

  //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
  wheelKeys.push({
      frame: 30,
      value: 2 * Math.PI
  });

  //set the keys
  animWheel.setKeys(wheelKeys);

  //Link this animation to a wheel
  skybox.animations = [];
  skybox.animations.push(animWheel);

  scene.beginAnimation(skybox, 0, 30, true);


  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  // GUI
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI"
  );

  var button1 = BABYLON.GUI.Button.CreateSimpleButton("but", "help");
  button1.width = 0.2;
  button1.height = "40px";
  button1.cornerRadius = 20;
  button1.color = "Orange";
  button1.thickness = 4;
  button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  button1.scaleY = 1;
  button1.background = "green";
  button1.onPointerUpObservable.add(function () {
    alert("you can click!!! on the middle and right paintings by looking at it and clicking. listen to the audio guide on left artwork by clicking headphones.");
  });
  advancedTexture.addControl(button1);


  const doorOut = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { height: 15, width: 7.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  doorOut.rotation.y = Math.PI / 2;
  doorOut.position.x = -59.8;
  doorOut.position.y = 7.5
  doorOut.checkCollisions = true;
  var doorMat = new BABYLON.StandardMaterial("", scene);
  doorMat.diffuseTexture = new BABYLON.Texture("textures/door2.png", scene);
  doorMat.diffuseTexture.hasAlpha = true;
  doorMat.emissiveColor = new BABYLON.Color3.White(); // makes frame way less dull
  doorOut.material = doorMat;

  camera.onCollide = function(collidedMesh) {
      if(collidedMesh.uniqueId === doorOut.uniqueId) {
          window.location.replace('https://www.notion.so/welcome-gallery-9817ed8db99f4feb95f5da55c0682bc9')
      }
  }

  // doorOut.actionManager = new BABYLON.ActionManager(scene)
  // doorOut.actionManager.registerAction(
  //   new BABYLON.ExecuteCodeAction({
  //       trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
  //       parameter: {
  //         mesh: camera,
  //         usePreciseIntersection: true
  //       }
  //   }, function () {
  //     console.log('passed')
  //   })
  // )

  // music
  // Load the sound and play it automatically once ready
  

  return scene;
};

// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function () {
  scene.render();
});
// the canvas/window resize event handler
window.addEventListener("resize", function () {
  engine.resize();
});