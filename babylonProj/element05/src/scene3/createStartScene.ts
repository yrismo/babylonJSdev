//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    PointLight,
    SpotLight,
    DirectionalLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Color3,
    ShadowGenerator,
    Texture,
  } from "@babylonjs/core";

  function createHemisphericLight(scene: Scene ){
      const light:HemisphericLight = new HemisphericLight("light", new Vector3(1, 10, 0),scene);
      light.intensity = 0.3;
      light.diffuse = new Color3(238, 99, 20);
      light.specular = new Color3(240, 100, 20);
      light.groundColor = new Color3(240, 100, 20);
      return light;
  }

  function createPointLight(scene: Scene ){
    const light = new PointLight("light", new Vector3(-1, 1, 0),scene);
    light.position = new Vector3(5, 20, 10);
    light.intensity = 0.3;
    light.diffuse = new Color3(238, 99, 20);
    light.specular = new Color3(240, 100, 20);
    return light;
}

function createDirectionalLight(scene: Scene ){
    const light = new DirectionalLight("light", new Vector3(-0.2, -0.5, -0.2),scene);
    light.position = new Vector3(20, 40, 20);
    light.intensity = 0.7;
    light.diffuse = new Color3(238, 99, 20);
    light.specular = new Color3(240, 100, 20);
    return light;
}

function createSpotLight(scene: Scene ){
    const light = new SpotLight("light", new Vector3(0, 5, -3), 
        new Vector3(0, 0, 1), Math.PI / 3, 20, scene);
    light.intensity = 0.5;
    light.diffuse = new Color3(238, 99, 20);
    light.specular = new Color3(240, 100, 20);
    return light;
}

function createPointShadows(light: PointLight, sphere: Mesh ,box: Mesh){
    const shadower = new ShadowGenerator(1024, light);
    const sm : any = shadower.getShadowMap();
    sm.renderList.push(sphere, box);

    shadower.setDarkness(0.2);
    shadower.useBlurExponentialShadowMap = true;
    shadower.blurScale = 4;
    shadower.blurBoxOffset = 1;
    shadower.useKernelBlur = true;
    shadower.blurKernel = 64;
    shadower.bias = 0;
    return shadower;
}

function createDirectionalShadows(light: DirectionalLight, sphere: Mesh ,box: Mesh){
    const shadower = new ShadowGenerator(1024, light);
    const sm : any = shadower.getShadowMap();
    sm.renderList.push(sphere, box);

    shadower.setDarkness(0.2);
    shadower.useBlurExponentialShadowMap = true;
    shadower.blurScale = 4;
    shadower.blurBoxOffset = 1;
    shadower.useKernelBlur = true;
    shadower.blurKernel = 64;
    shadower.bias = 0;
    return shadower;
}


  function getMaterial(scene: Scene){
    scene.ambientColor = new Color3(0.5, 1, 1);
  const myMaterial = new StandardMaterial("myMaterial", scene);
  myMaterial.diffuseColor = new Color3(1, 0, 1);
  myMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
  myMaterial.emissiveColor = new Color3(1, 0.4, 0.5);
  myMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
  myMaterial.ambientTexture = new Texture("./assets/tin.jpg", scene);
  return myMaterial
  }

  function getMaterial2(scene: Scene){
    scene.ambientColor = new Color3(0.5, 1, 1);
  const myMaterial2 = new StandardMaterial("myMaterial", scene);
  myMaterial2.diffuseColor = new Color3(1, 0, 1);
  myMaterial2.specularColor = new Color3(0.5, 0.6, 0.87);
  myMaterial2.emissiveColor = new Color3(1, 0.4, 0.5);
  myMaterial2.ambientColor = new Color3(0.23, 0.98, 0.53);
  myMaterial2.ambientTexture = new Texture("./assets/beans.jpg", scene);
  return myMaterial2
  }
  
  
   function createSphere(scene: Scene) {
    var sphere = MeshBuilder.CreateSphere(
      "ellipsoid",
      { diameter: 1, diameterY: 1, segments: 16 },
      scene,
    );
    sphere.position.x = 0;
    sphere.position.y = 2;
    return sphere;
  }

  function createBox(scene: Scene) {
    let box = MeshBuilder.CreateBox("box",{size: 2}, scene);
    box.position.x = 0;
    box.position.y = 0;
    return box;
  }

  function createCylinder(scene: Scene, myMaterial1:any){
    const cylinder = MeshBuilder.CreateCylinder("cylinder",{diameter:4, height:5, arc: 1}, scene)
    cylinder.position.x = 0;
    cylinder.position.y = 2;
    cylinder.position.z = 0;
    cylinder.material = myMaterial1;
    return cylinder;
  }

    

    
  
      function createCapsule(scene: Scene){
    const capsule = MeshBuilder.CreateCapsule("capsule",{radius:2, height:4, tessellation: 4}, scene)
    capsule.position.x = 3;
    capsule.position.y = 2;
    capsule.position.z = 3;
    return capsule;
  }

  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }

  
  function createGround(scene: Scene, myMaterial2:any){
    let ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.backFaceCulling = false;
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.material = myMaterial2;
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
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      box?: Mesh;
      light?: Light;
      spot?: SpotLight;
      hemi?: HemisphericLight;
      dlight?: DirectionalLight;
      point?: PointLight;
      sphere?: Mesh;
      cone?: Mesh;
      cylinder?: Mesh;
      triangle?: Mesh;
      capsule?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    //that.scene.debugLayer.show();
  
    const mat1 = getMaterial(that.scene);
    const mat2 = getMaterial2(that.scene);
    that.hemi = createHemisphericLight(that.scene);
    that.point = createPointLight(that.scene);
    that.spot = createSpotLight(that.scene);
    that.box = createBox(that.scene);
    that.light = createLight(that.scene);
    that.dlight = createDirectionalLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.cylinder = createCylinder(that.scene, mat1);
    that.capsule = createCapsule(that.scene);
    that.ground = createGround(that.scene, mat2);
    that.camera = createArcRotateCamera(that.scene);
    createPointShadows(that.point, that.box, that.sphere);
    createDirectionalShadows(that.dlight, that.box, that.sphere);
    return that;
  }
