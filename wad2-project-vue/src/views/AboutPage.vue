<template>
  <div class="p-2"></div>
  <!-- "where anyone is invited anywhere part start" -->
  <div class="container about-fadeup">
    <div class="row">
      <div class="col">
        <div class="about-header text-center p-3">
          <div>
            invite anyone, anywhere.
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="about-header-text mx-auto text-center">
            Ever wanted to go McDonald's at 2am, but none of your friends are awake?
            Or maybe you want to attend a Dua Lipa concert, but have no one to go with? <br><br>
            Well, that's where we come in.
        </div>
      </div>
    </div>
  </div>

  <!-- WORLD 3D MODEL -->
  <div class="container about-fadeup" id="world-model">
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

  <div class="about-subheader text-center reveal">
    what does 'bojio' mean?
  </div>
  <div class="about-header-text mx-auto text-center pb-5 reveal">
    'Bojio' is a Singaporean way to express your fear of missing out - its direct translation is "no invite". Sometimes, there are events or outings (<i>"late-night supper anyone?"</i>) where you want to attend with your friends, but they simply can't accommodate to your schedule. So, your friends end up going without you, and you say 'bojio'! 
  </div>

  <!-- how does it work section start -->
  <div class="about-subheader text-center mt-2 reveal">
    how does our platform work?
  </div>
  <div class="about-header-text mx-auto text-center reveal">
    <i>the three main ways to use our platform</i>
  </div>


  <div class="container">

    <!-- join any group -->
    <div class="row reveal" style="margin-top: 3.5vmin">
      <div class="col-12 col-sm-6 text-center my-auto" id="first-step">
        <div class="about-step-header">Join any group</div>
        <span class="about-step-text mx-auto">
            Browse through groups that are open to all (a.k.a. 'public jios'), and join those that pique your interest.
        </span>
      </div>
      
      <!-- vertical carousel -->
      <div class="col-12 col-sm-6 wrapper carousel my-auto">

          <div class="carousel__item">
            <div class="carousel__item-body">
              <p class="about-carousel-title">89.7 Supper Club Jio</p>
              <p>Monday, 10pm</p>
            </div>
          </div>

          <div class="carousel__item">
            <div class="carousel__item-body">
              <p class="about-carousel-title">Dua Lipa Concert Group</p>
              <p>Next Sunday, 8pm</p>
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
              <p class="title">spouting whale</p>
              <p>Unicode: U+1F433</p>
            </div>
          </div>

          <div class="carousel__item">
            <div class="carousel__item-body">
              <p class="title">spouting whale</p>
              <p>Unicode: U+1F433</p>
            </div>
          </div>

          <div class="carousel__item">
            <div class="carousel__item-body">
              <p class="title">spouting whale</p>
              <p>Unicode: U+1F433</p>
            </div>
          </div>

          <div class="carousel__item">
            <div class="carousel__item-body">
              <p class="title">spouting whale</p>
              <p>Unicode: U+1F433</p>
            </div>
          </div>

      </div>
      
    </div>

    <!-- Step 2 -->
    <div class="row pb-5 reveal" style="margin-top: 3.5vmin">

      <div class="col-12 col-sm-6 my-auto">
        replace with carousel of events?
        <img src="../../img/about-events.png" class="about-img" alt="">
      </div>

      <div class="col-12 col-sm-6 text-center my-auto">
        <div class="about-step-header">Filter by event</div>
        <p class="about-step-text mx-auto text-center">
          Want to attend a specific event with people? Filter the groups based on the event on our homepage and voila! 
        </p>
      </div>

    </div>

    <!-- Step 3 -->
    <div class="row reveal" style="margin-top: 3.5vmin">
      
      <div class="col-12 col-sm-6 text-center my-auto">
        <div class="about-step-header">Start a group</div>
        <p class="about-step-text mx-auto text-center">
          Have an activity of your own in mind? Create a 'jio' and post it to start gathering people for that Mala run!
        </p>
      </div>

      <div class="col-12 col-sm-6">
        <p class="about-img">
          <img src="../../img/about-create.png" class="about-img" alt="">
        </p>
      </div>

    </div>

  </div>
  <!-- how does it work section end -->

  <div class="text-center p-5 reveal">
    not sure why the above div moves down as you scroll down
    <router-link to="/createajio" class="nav-link">
      <button type="button" class="btn mt-4 mb-5" id="banner-btn" onclick="window.location.href='';">      
        <span>Get Started</span>
      </button>
    </router-link> 

  </div>
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

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

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
