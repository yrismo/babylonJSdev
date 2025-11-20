//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import {
    Scene,
    ArcRotateCamera,
    AssetsManager,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Camera,
    Engine,
    StandardMaterial,
    Color3,
    Texture,
  } from "@babylonjs/core";

  function createHemisphericLight(scene: Scene ){
      const light:HemisphericLight = new HemisphericLight("light", new Vector3(1, 10, 0),scene);
      light.intensity = 0.3;
      light.diffuse = new Color3(1, 0.5, 1);
      light.specular = new Color3(0, 1, 0);
      light.groundColor = new Color3(0, 1, 0);
      return light;
  }

  function getMaterial(scene: Scene){
    scene.ambientColor = new Color3(0.5, 1, 1);
  const myMaterial = new StandardMaterial("myMaterial", scene);
  myMaterial.diffuseColor = new Color3(1, 0, 1);
  myMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
  myMaterial.emissiveColor = new Color3(1, 0.4, 0.5);
  myMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
  myMaterial.ambientTexture = new Texture("./../meshes01/assets/textures/grass.jpg", scene);
  return myMaterial
  }


  
  function createGround(scene: Scene){
    let ground = MeshBuilder.CreateGround("ground", { width: 16, height: 16 }, scene);
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.backFaceCulling = false;
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    return ground;
}
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }

  
  function addAssets(scene: Scene) {
    // add assets here
    const assetsManager = new AssetsManager(scene);
    const tree1 = assetsManager.addMeshTask(
      "tree1 task",
      "",
      "./public/assets/nature/gltf/",
      "BirchTree_1.gltf"
    );
    tree1.onSuccess = function (task) {
      const root = task.loadedMeshes[0];
      root.position = new Vector3(3, 0, 2);
      root.scaling = new Vector3(0.5, 0.5, 0.5);
      // Ensure all child meshes are visible
      task.loadedMeshes.forEach((mesh: any) => {
        mesh.isVisible = true;
      });
      //new PhysicsAggregate(root, PhysicsShapeType.MESH, {mass: 0}, scene);
      
      // Clone tree1
      const tree1Clone = root.clone("tree1_clone", null);
      tree1Clone!.position = new Vector3(0, 0, 5);
      //new PhysicsAggregate(tree1Clone!, PhysicsShapeType.MESH, {mass: 0}, scene);
    };
  
    const tree2 = assetsManager.addMeshTask(
      "tree1 task",
      "",
      "./public/assets/nature/gltf/",
      "BirchTree_2.gltf"
    );
    tree2.onSuccess = function (task) {
      task.loadedMeshes[0].position = new Vector3(0, 0, 2);
      task.loadedMeshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
      // Clone tree2
      const tree2Clone = task.loadedMeshes[0].clone("tree2_clone", null);
      tree2Clone!.position = new Vector3(-3, 0, 5);
    };
  
    const tree3 = assetsManager.addMeshTask(
      "tree1 task",
      "",
      "./public/assets/nature/gltf/",
      "BirchTree_3.gltf"
    );
    tree3.onSuccess = function (task) {
      task.loadedMeshes[0].position = new Vector3(-3, 0, 2);
      task.loadedMeshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
      // Clone tree3
      const tree3Clone = task.loadedMeshes[0].clone("tree3_clone", null);
      tree3Clone!.position = new Vector3(3, 0, 5);
    };
  
    assetsManager.onTaskErrorObservable.add(function (task) {
      console.log(
        "task failed",
        task.errorObject.message,
        task.errorObject.exception
      );
    });
    return assetsManager;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      hemi?: HemisphericLight;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    //that.scene.debugLayer.show();
  
    const mat1 = getMaterial(that.scene);
    that.hemi = createHemisphericLight(that.scene);   
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    const assetsManager = addAssets(that.scene);
    return that;
  }
