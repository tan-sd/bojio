<template>
  <!-- "where anyone is invited anywhere part start" -->
  <div class="container">
    <div class="row">
      <div class="col">
        <div
          class="banner-header-about-1 text-center pt-5"
          style="line-height: 1"
        >
          <div>
            Where anyone is <br />
            invited anywhere
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="banner-text-about mx-auto text-center">
          <div>
            <span style="font-weight: bold">Bojio</span> is a platform where
            individuals can make new friends by hosting or attending events of
            similar interest.
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- WORLD 3D MODEL -->
  <div class="container" id="world-model">
    <Renderer ref="renderer" alpha antialias orbit-ctrl resize="window">
      <Camera :position="{ z: 5 }" />
      <Scene>
        <AmbientLight />
        <PointLight
          color="white"
          :position="{ x: 100, y: 10000, z: 40 }"
          :intensity="0.5"
        />
        <GltfModel
          ref="gltf"
          src="/Model/nanoplanet.gltf"
          @load="onReady"
          @progress="onProgress"
          @error="onError"
        />
      </Scene>
    </Renderer>
  </div>

  <!-- maybe can make shrink when screen size decrease? -->

  <!-- how does it work section start -->
  <div class="banner-header-about-2 text-center pt-5 reveal">
    <div>How does it work?</div>
  </div>

  <div class="container steps-container reveal">
    <!-- Step 1 -->
    <div class="row" style="margin-top: 3.5vmin">
      <div class="col-12 col-sm-6 text-center" id="first-step">
        <div class="steps-header">Join a group</div>
        <p class="steps-paragraph">
          Do what you love, meet others who love it, find your community. The
          rest is history!
        </p>
      </div>
      <div class="col-12 col-sm-6">
        <div class="wrapper">
          <div class="carousel">
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">spouting whale</p>
                <p>Unicode: U+1F433</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">whale</p>
                <p>Unicode: U+1F40B</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">dolphin</p>
                <p>Unicode: U+1F42C</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">fish</p>
                <p>Unicode: U+1F41F</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">tropical fish</p>
                <p>Unicode: U+1F420</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">blowfish</p>
                <p>Unicode: U+1F421</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">shark</p>
                <p>Unicode: U+1F988</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">octopus</p>
                <p>Unicode: U+1F419</p>
              </div>
            </div>
            <div class="carousel__item">
              <div class="carousel__item-body">
                <p class="title">spiral shell</p>
                <p>Unicode: U+1F41A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="row" style="margin-top: 3.5vmin">
      <div class="col text-center">
        <div class="steps-header">Find an event</div>
        <p class="steps-paragraph">
          Events are happening on just about any topic you can think of, from
          online gaming and photography to yoga and hiking.
        </p>
      </div>
      <!-- <div class="col-6"></div> -->
    </div>

    <!-- Step 3 -->
    <div class="row" style="margin-top: 3.5vmin">
      <div class="col text-center">
        <div class="steps-header">Start a group</div>
        <p class="steps-paragraph">
          You don't have to be an expert to gather people together and explore
          shared interests.
        </p>
      </div>
      <!-- <div class="col-6"></div> -->
    </div>
  </div>
  <!-- how does it work section end -->

  <div class="text-center">
    <!-- need to create 'if logged in, redirect to create a jio, else, redirect to login page' -->
    <!-- also need to create restriction if they try to access create a jio directly, they have to login  -->
    <button
      type="button"
      class="btn mt-4 mb-5"
      id="banner-btn"
      onclick="window.location.href='newcreateajio.html';"
    >
      <span>Get Started</span>
    </button>
  </div>
</template>

<<<<<<< Updated upstream
    </template>
    
    <script>
    export default {
      title: 'BOJIO – About',
      mounted() {
        const renderer = this.$refs.renderer;
        const world = this.$refs.gltf.scene;
        // console.log(world)
        renderer.onBeforeRender(() => {
          if (world) world.rotation.y -= 0.007;
        });
        const orbitCtrl = this.$refs.renderer.three.cameraCtrl
        orbitCtrl.enableZoom = false;
      },
    };
=======
<script>
export default {
  mounted() {
    const renderer = this.$refs.renderer;
    const world = this.$refs.gltf.scene;
    // console.log(world)
    renderer.onBeforeRender(() => {
      if (world) world.rotation.y -= 0.007;
    });
    const orbitCtrl = this.$refs.renderer.three.cameraCtrl;
    orbitCtrl.enableZoom = false;
  },
};
>>>>>>> Stashed changes

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
    // else {
    //   reveals[i].classList.remove("active");
    // }
  }
}

window.addEventListener("scroll", reveal);
</script>
